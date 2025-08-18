#!/bin/bash

# List of model names
models=(
    "google/gemini-2.5-flash-lite"
)

# Loop through each model and run evaluation
for model in "${models[@]}"; do
    echo "Evaluating model: ${model}"
    # python src/evaluate_data.py --model_name "${model}" --eval_subset "all" --output_path "results" --limit 2 --limit_dataset 5 --timeout 30 --max_retries 1
    python src/evaluate_data.py --model_name "${model}" --eval_subset "all" --output_path "results" --timeout 30 --max_retries 1
done
