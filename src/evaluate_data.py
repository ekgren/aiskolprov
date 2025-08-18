#!/usr/bin/env python3
import argparse
import json
import os

from datasets import load_dataset
import openai
from openai import OpenAI
import pandas as pd
from tqdm import tqdm

# --- Functions ---
def evaluate_item(client, item, model_name, model_params):
    system_prompt = item["system_prompt"]
    user_prompt   = item["prompt"]
    answer        = item["answer"]
    question_points = item["question_points"]
    uid = item["uid"]

    temperature = model_params['temperature']
    max_tokens = model_params['max_tokens']
    top_p = model_params['top_p']
    seed = model_params['seed']

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    response = client.chat.completions.create(
        model=model_name,
        messages=messages,
        temperature=temperature,
        max_tokens=max_tokens,
        top_p=top_p,
        seed=seed
    )
    model_output = response.choices[0].message.content.strip()

    # Check if output matches the expected answer
    eval_passed = model_output.strip() == answer.strip()

    token_usage = response.usage if hasattr(response, "usage") else {}
    finish_reason = response.choices[0].finish_reason

    result = {
        "data_source_id": uid,
        "item": item,
        "sample": {
            "trajectory": messages,
            "outputs": [{"role": "assistant", "content": model_output}],
            "finish_reason": finish_reason,
            "sampled_model_name": model_name,
            "sampled_model_params": {"seed": seed, "temperature": temperature, "max_tokens": max_tokens, "top_p": top_p},
            "token_usage": dict(token_usage),
        },
        "grades": {"String check": question_points if eval_passed else 0.0},
        "grader_samples": {},
        "passes": {"String check": eval_passed},
    }
    return result

def evaluate_data(client, data, results, model_name, model_params):
    """
    Evaluates a list of items using the provided OpenAI client.
    """
    results = {} if results is None else results
    with tqdm(data) as pbar:
        for row in pbar:
            uid = row['uid']
            if results.get(uid):
                print(f"Skipping row with uid {uid} as it has already been evaluated.")
                continue
            try:
                result = evaluate_item(client, row, model_name, model_params)
                results[uid] = result
                pbar.set_description(f"Evaluated row with uid {uid}")
            except Exception as e:
                print(f"Error evaluating row: {e}")
    return results

def get_grades(results, model_name):
    """
    Returns a dictionary of grades for each test_id.
    """
    grades = {'sampled_model_name': model_name}
    for key, item in results.items():
        test_id = item['item']['test_id']
        point = item['grades']['String check']
        if test_id not in grades:
            grades[test_id] = {'points': 0, 'total': 0}
        grades[test_id]['points'] += int(point)
        grades[test_id]['total'] += 1
    return grades

def main():
    parser = argparse.ArgumentParser(description="Evaluate dataset using an OpenAI client")
    parser.add_argument("--model_name", type=str, required=True, help="Model name to use (e.g., mistralai/mistral-small-3.1-24b-instruct)")
    parser.add_argument("--eval_subset", type=str, default="all", help="Evaluation subset (default: all)")
    parser.add_argument("--output_path", type=str, required=True, help="Path for saving the results")
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

    # Initialize client
    client = OpenAI(
        api_key=API_KEY,
        base_url="https://openrouter.ai/api/v1"
    )

    results = evaluate_data(client, ds, None, MODEL_NAME, model_params)

    # Build file names
    file_name = EVAL_DATASET.replace("/", "-") + "_" + EVAL_SUBSET + "_" + MODEL_NAME.replace("/", "-") + ".jsonl"
    file_name = file_name.lower()
    grade_file_name = file_name.replace(".jsonl", "_grades.json")

    # Ensure output directory exists
    if not os.path.exists(args.output_path):
        os.makedirs(args.output_path)

    results_file_path = os.path.join(args.output_path, file_name)
    grade_file_path = os.path.join(args.output_path, grade_file_name)

    grades = get_grades(results, MODEL_NAME)
    print(grades)

    # Save results
    with open(results_file_path, "w", encoding="utf-8") as f:
        for key, item in results.items():
            f.write(json.dumps(item) + "\n")

    # Save grades
    with open(grade_file_path, "w", encoding="utf-8") as f:
        f.write(json.dumps(grades) + "\n")

if __name__ == "__main__":
    main()