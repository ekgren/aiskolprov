#!/bin/bash

# List of model names
models=(
    "deepseek/deepseek-chat-v3.1"
    "deepseek/deepseek-r1-0528"
    "google/gemini-2.5-flash"
    "x-ai/grok-3-mini"
    "google/gemma-3n-e4b-it"
    "microsoft/phi-4-reasoning-plus"
    "meta-llama/llama-4-maverick"
    "meta-llama/llama-3.3-70b-instruct"
    "moonshotai/kimi-k2"
    "openai/gpt-oss-20b"
    "openai/gpt-oss-120b"
    "qwen/qwen3-235b-a22b-thinking-2507"
    "z-ai/glm-4.5"
    "z-ai/glm-4-32b"
    "baidu/ernie-4.5-21b-a3b"
    "tencent/hunyuan-a13b-instruct"
    "google/gemini-2.5-flash-lite"
    "openai/gpt-5-nano"
    "openai/gpt-5-mini"
    "mistralai/mistral-medium-3.1"
)

# Loop through each model and run evaluation
for model in "${models[@]}"; do
    echo "Evaluating model: ${model}"
    # python src/evaluate_data.py --model_name "${model}" --eval_subset "all" --output_path "results" --limit 2 --limit_dataset 5 --timeout 30 --max_retries 1
    python src/evaluate_data.py --model_name "${model}" --eval_subset "all" --output_path "results" --timeout 30 --max_retries 1
done
