#!/usr/bin/env python3
import argparse
import json
import os

from datasets import load_dataset
from openai import OpenAI
from tqdm import tqdm

def accumulate_grade(grades_acc, test_id: str, point: float) -> None:
    """Accumulate points and count per test_id into the mutable accumulator dict."""
    slot = grades_acc.setdefault(test_id, {"points": 0, "total": 0})
    # Points in data are numeric (float or int). We store as int for output consistency.
    slot["points"] += int(point)
    slot["total"] += 1


def format_grades_output(grades_acc, model_name: str) -> dict:
    """Return the JSON-serializable grades payload including model name."""
    out = {"sampled_model_name": model_name}
    out.update(grades_acc)
    return out


def load_existing_progress(results_file_path: str):
    """Load existing JSONL results, returning (seen_uids, grades_accumulator).

    - seen_uids: set of uid strings already written
    - grades_accumulator: dict mapping test_id -> {points, total}
    """
    seen = set()
    grades_acc = {}
    if not os.path.exists(results_file_path):
        return seen, grades_acc

    with open(results_file_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                item = json.loads(line)
                uid = item.get("data_source_id")
                if uid is not None:
                    seen.add(uid)
                test_id = item.get("item", {}).get("test_id")
                point = item.get("grades", {}).get("String check")
                if test_id is not None and point is not None:
                    accumulate_grade(grades_acc, test_id, point)
            except Exception:
                # Skip malformed lines but continue processing
                continue
    return seen, grades_acc


def write_final_grades(results_file_path: str, grade_file_path: str, model_name: str) -> None:
    """Compute grades by reading the JSONL results file and write to grade file."""
    _, grades_acc = load_existing_progress(results_file_path)
    grades_payload = format_grades_output(grades_acc, model_name)
    with open(grade_file_path, "w", encoding="utf-8") as gf:
        json.dump(grades_payload, gf, ensure_ascii=False)
        gf.write("\n")

def main():
    parser = argparse.ArgumentParser(description="Evaluate dataset using an OpenAI client")
    parser.add_argument("--model_name", type=str, required=True, help="Model name to use (e.g., mistralai/mistral-small-3.1-24b-instruct)")
    parser.add_argument("--eval_subset", type=str, default="all", help="Evaluation subset (default: all)")
    parser.add_argument("--output_path", type=str, required=True, help="Path for saving the results")
    parser.add_argument("--limit", type=int, default=0, help="Max number of NEW datapoints to process (0 = no limit)")
    parser.add_argument("--limit_dataset", type=int, default=0, help="Only iterate over the first N datapoints of the dataset (0 = all)")
    parser.add_argument("--timeout", type=float, default=60.0, help="Per-request timeout in seconds")
    parser.add_argument("--max_retries", type=int, default=2, help="Max retries for API requests")
    args = parser.parse_args()

    # Read API key from environment variable
    API_KEY = os.environ.get('OPEN_ROUTER_API_KEY')
    if API_KEY is None:
        print("Error: OPEN_ROUTER_API_KEY environment variable not set.")
        exit(1)

    EVAL_DATASET = "Ekgren/swedish_skolprov"
    EVAL_SUBSET = args.eval_subset
    MODEL_NAME = args.model_name
    model_params = {'temperature': 1, 'max_tokens': 2048, 'top_p': 1, 'seed': 42}

    # Load dataset
    ds = load_dataset(EVAL_DATASET, EVAL_SUBSET)
    ds = ds['train']
    if args.limit_dataset:
        # Restrict dataset to first N items for quick tests
        try:
            ds = ds.select(range(min(args.limit_dataset, len(ds))))
        except Exception:
            pass

    # Initialize client
    client = OpenAI(
        api_key=API_KEY,
        base_url="https://openrouter.ai/api/v1",
        max_retries=args.max_retries,
    )

    # Build file names
    file_name = EVAL_DATASET.replace("/", "-") + "_" + EVAL_SUBSET + "_" + MODEL_NAME.replace("/", "-") + ".jsonl"
    file_name = file_name.lower()
    if not os.path.exists(args.output_path): # Ensure output directory exists
        os.makedirs(args.output_path)
    results_file_path = os.path.join(args.output_path, file_name)

    print(f"Evaluating dataset {EVAL_DATASET} subset {EVAL_SUBSET} with model {MODEL_NAME}")
    print(f"Results will be saved to {results_file_path}")
    
    grade_file_name = file_name.replace(".jsonl", "_grades.json")
    grade_file_path = os.path.join(args.output_path, grade_file_name)

    # Load existing progress so we can resume and update grades incrementally
    seen_uids, grades_acc = load_existing_progress(results_file_path)
    if seen_uids:
        print(f"Found {len(seen_uids)} previously saved datapoints. Will skip them and continue appending.")

    # Open results file in append mode once; write each datapoint as it's processed
    with open(results_file_path, "a", encoding="utf-8") as results_f:
        processed_new = 0
        with tqdm(ds, unit="item") as pbar:
            try:
                for datapoint in pbar:
                    uid = datapoint["uid"]

                    if uid in seen_uids:
                        pbar.set_description(f"Skip uid {uid}")
                        continue

                    try:
                        # Talk to the api
                        messages = [
                            {"role": "system", "content": datapoint["system_prompt"]},
                            {"role": "user", "content": datapoint["prompt"]},
                        ]
                        response = client.chat.completions.create(
                            model=MODEL_NAME,
                            messages=messages,
                            temperature=model_params["temperature"],
                            max_tokens=model_params["max_tokens"],
                            top_p=model_params["top_p"],
                            seed=model_params["seed"],
                            timeout=args.timeout,
                        )

                        # Format the output
                        model_output = response.choices[0].message.content.strip()
                        eval_passed = model_output == datapoint["answer"].strip()

                        # Extract JSON-serializable token usage
                        token_usage = {}
                        try:
                            # Prefer full response dump as plain dict
                            token_usage = (response.model_dump() or {}).get("usage", {})
                        except Exception:
                            try:
                                if hasattr(response, "usage") and hasattr(response.usage, "model_dump"):
                                    token_usage = response.usage.model_dump()
                                elif hasattr(response, "usage"):
                                    token_usage = json.loads(json.dumps(response.usage, default=lambda o: getattr(o, "__dict__", str(o))))
                            except Exception:
                                token_usage = {}

                        item = {
                            "data_source_id": uid,
                            "item": datapoint,
                            "sample": {
                                "trajectory": messages,
                                "outputs": [{"role": "assistant", "content": model_output}],
                                "finish_reason": response.choices[0].finish_reason,
                                "sampled_model_name": MODEL_NAME,
                                "sampled_model_params": model_params,
                                "token_usage": token_usage,
                            },
                            "grades": {"String check": datapoint["question_points"] if eval_passed else 0.0},
                            "grader_samples": {},
                            "passes": {"String check": eval_passed},
                        }

                        # Append to JSONL immediately
                        results_f.write(json.dumps(item, ensure_ascii=False) + "\n")
                        results_f.flush()
                        try:
                            os.fsync(results_f.fileno())  # Best-effort durability
                        except Exception:
                            pass

                        # Update in-memory tracking and grades, then write grades file
                        seen_uids.add(uid)
                        test_id = datapoint.get("test_id")
                        if test_id is not None:
                            accumulate_grade(grades_acc, test_id, item["grades"]["String check"])

                        grades_payload = format_grades_output(grades_acc, MODEL_NAME)
                        with open(grade_file_path, "w", encoding="utf-8") as gf:
                            json.dump(grades_payload, gf, ensure_ascii=False)
                            gf.write("\n")

                        processed_new += 1
                        pbar.set_description(f"Saved uid {uid}")
                        if args.limit and processed_new >= args.limit:
                            break
                    except KeyboardInterrupt:
                        print("\nInterrupted by user. Exiting early...")
                        break
                    except Exception as e:
                        print(f"Error evaluating uid {uid}: {e}")
            except KeyboardInterrupt:
                print("\nInterrupted by user. Exiting early...")

    # After processing, recompute and write final grades snapshot from disk
    write_final_grades(results_file_path, grade_file_path, MODEL_NAME)
    print(f"Final grades written to {grade_file_path}")
if __name__ == "__main__":
    main()