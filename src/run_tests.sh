#!/bin/bash

# List of model names
models=(
    "mistralai/ministral-14b-2512"
    "mistralai/ministral-8b-2512"
    "mistralai/ministral-3b-2512"
    "mistralai/mistral-large-2512"
    "deepseek/deepseek-v3.2-speciale"
    "deepseek/deepseek-v3.2"
    "x-ai/grok-4.1-fast"
    "google/gemini-3-pro-preview"
    "openai/gpt-5.1"
    "moonshotai/kimi-k2-thinking"
    # "openrouter/sonoma-dusk-alpha"
    # "openrouter/sonoma-sky-alpha"
    # "qwen/qwen3-max"
    # "moonshotai/kimi-k2-0905"
    # "bytedance/seed-oss-36b-instruct"
    # "openai/gpt-5"
    # "meta-llama/llama-3.1-405b-instruct"
    # "anthropic/claude-sonnet-4"
    # "anthropic/claude-3.5-haiku"
    # "google/gemini-2.5-pro"
    # "deepseek/deepseek-chat-v3.1"
    # "deepseek/deepseek-r1-0528"
    # "google/gemini-2.5-flash"
    # "x-ai/grok-3-mini"
    # "google/gemma-3n-e4b-it"
    # "microsoft/phi-4-reasoning-plus"
    # "meta-llama/llama-4-maverick"
    # "meta-llama/llama-3.3-70b-instruct"
    # "moonshotai/kimi-k2"
    # "openai/gpt-oss-20b"
    # "openai/gpt-oss-120b"
    # "qwen/qwen3-235b-a22b-thinking-2507"
    # "z-ai/glm-4.5"
    # "z-ai/glm-4-32b"
    # "baidu/ernie-4.5-21b-a3b"
    # "tencent/hunyuan-a13b-instruct"
    # "google/gemini-2.5-flash-lite"
    # "openai/gpt-5-nano"
    # "openai/gpt-5-mini"
    # "mistralai/mistral-medium-3.1"
)

# Loop through each model and run evaluation
for model in "${models[@]}"; do
    echo "Evaluating model: ${model}"
    # python src/evaluate_data.py --model_name "${model}" --eval_subset "all" --output_path "results" --limit 2 --limit_dataset 5 --timeout 30 --max_retries 1
    python src/evaluate_data.py --model_name "${model}" --eval_subset "all" --output_path "results" --timeout 30 --max_retries 1
done
