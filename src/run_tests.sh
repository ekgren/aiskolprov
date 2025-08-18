#!/bin/bash

# List of model names
models=(
    "openai/gpt-4o-mini"
    "openai/o3-mini-high"
    "google/gemini-2.0-flash-001"
)

# Loop through each model and run evaluation
for model in "${models[@]}"; do
    echo "Evaluating model: ${model}"
    python evaluate_data.py --model_name "${model}" --eval_subset "all" --output_path "./results"
done
