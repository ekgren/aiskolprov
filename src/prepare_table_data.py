import json
import os
import re

def main():
    # Define paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    results_dir = os.path.join(base_dir, 'results')
    data_dir = os.path.join(base_dir, 'data')
    manifest_path = os.path.join(results_dir, 'manifest.json')
    metadata_path = os.path.join(results_dir, 'manifest_metada.json')
    output_path = os.path.join(data_dir, 'model_table.json')

    # Ensure data directory exists
    os.makedirs(data_dir, exist_ok=True)

    # Load manifest and metadata
    try:
        with open(manifest_path, 'r') as f:
            manifest = json.load(f)
        
        with open(metadata_path, 'r') as f:
            metadata_file = json.load(f)
            # Handle potentially different structure if metadata is wrapped
            model_metadata = metadata_file.get('model_metadata', metadata_file)

    except FileNotFoundError as e:
        print(f"Error: Could not find required file. {e}")
        return
    except json.JSONDecodeError as e:
        print(f"Error: Could not decode JSON. {e}")
        return

    processed_data = []

    # Regex to extract model name from filename
    # Pattern: ekgren-swedish_skolprov_all_{MODEL_NAME}_grades.json
    filename_pattern = re.compile(r'ekgren-swedish_skolprov_all_(.+)_grades\.json')

    print(f"Processing {len(manifest)} files...")

    for filename in manifest:
        match = filename_pattern.search(filename)
        if not match:
            print(f"Warning: Could not extract model name from {filename}")
            continue

        model_name = match.group(1)
        file_path = os.path.join(results_dir, filename)

        try:
            with open(file_path, 'r') as f:
                result_data = json.load(f)
        except FileNotFoundError:
            print(f"Warning: File {filename} listed in manifest but not found.")
            continue
        except json.JSONDecodeError:
            print(f"Warning: File {filename} contains invalid JSON.")
            continue

        # Get metadata for this model
        # Try exact match first
        meta = model_metadata.get(model_name)
        
        if not meta:
            # Fallback/Retry logic or just default values?
            # For now, let's warn and use defaults or placeholders
            print(f"Warning: No metadata found for model {model_name}")
            meta = {"open_weights": "-", "thinking": "-"}

        # Enforce consistency in boolean strings vs icons if needed, 
        # but the request implies we append the metadata.
        # The frontend expects icons? The current frontend code has a map.
        # But the NEW requirement says "no data preparation should be done in the html file".
        # So we should convert the metadata values (True/False or "True"/"False") to display values (icons) here?
        # The previous metadata file had "True"/"False" string values. 
        # The previous index.html used a map CONFIG.openWeightsMap: {'model-name': 'Icon'}.
        # Wait, the user edited manifest_metada.json to have "True"/"False" strings.
        # And the previous JS code: `getOpenWeightsIcon` checked `CONFIG.openWeightsMap`.
        # 
        # Let's handle the conversion HERE so the frontend is dumb.
        # "True" -> "🟢", "False" -> "🔴"
        
        open_weights_val = meta.get("open_weights", "False")
        thinking_val = meta.get("thinking", "False")
        
        # Helper to convert to icon
        def to_icon(val):
            v_str = str(val).lower()
            if v_str == "true": return "🟢"
            if v_str == "false": return "🔴"
            return val # Return as is if unknown

        # Add fields to result_data
        result_data['open_weights'] = to_icon(open_weights_val)
        
        # For 'thinking', the frontend logic previously was:
        # "The thinking column is a bit of a wildcard... We assign a random icon"
        # BUT now we have actual metadata. So we should use it.
        # The frontend logic for thinking was: testResults[key] = { display: ..., isThinking: true }
        # We need to decide how to represent 'thinking' in the flattened structure.
        # The current data structure has keys for tests like "2024-10-20": {points:..., total:...}.
        # We can add 'thinking' as a similar object or just a top-level property?
        # The DataProcessor in JS treated 'thinking' as a key in `testKeys`.
        # So let's make it look like a test result so the renderer picks it up easily.
        # OR we just pass it as a top-level property and let the frontend handle the column.
        # However, the JS `DataProcessor` iterates keys. 
        # Let's add it as a key "thinking" with a special structure or just the icon value?
        # In the JS: `if (key === 'thinking') ...`
        
        # Let's make "thinking" a top-level property for now, similar to 'open_weights'.
        # The 'process' method in JS explicitly adds 'thinking' to `allTestKeys`.
        # So if we put it in the object, the JS will find it.
        # We just need to make sure the JS knows how to render it. 
        # We will refactor JS to be dumb, so we can shape the data however we want.
        # Let's produce the VIEW MODEL directly? 
        # "no data preparation should be done in the html file" suggests we should output the final structure ready for rendering.
        # But `prepare_table_data` implies preparing the *raw* data for the table?
        # The request says: "prepares them for the table ... data/model_table.{desired_fileformat}".
        # Let's produce a list of objects that have all the columns calculated.
        # i.e. Model Name, Average, Open Weights, Test 1, Test 2...
        
        # Let's just create a rich object.
        processed_item = result_data.copy()
        processed_item['open_weights'] = to_icon(open_weights_val)
        processed_item['thinking'] = to_icon(thinking_val) # Or maybe just boolean? Let's stick to icons as per style.
        
        # We also need to extract/calculate the average if possible? 
        # Or should we leave math to the frontend? 
        # "no data preparation" is a strong hint. 
        # Calculating averages IS data preparation.
        # So let's calculate the average score here too.
        
        # Calculate stats for the item
        total_ratio_sum = 0
        ratio_count = 0
        
        # Identify test keys (exclude metadata)
        # We need to know what keys are tests.
        # Heuristic: keys that are objects with 'points' and 'total'.
        
        for key, val in result_data.items():
            if isinstance(val, dict) and 'points' in val and 'total' in val:
                try:
                    p = float(val['points'])
                    t = float(val['total'])
                    if t > 0:
                        ratio = p / t
                        total_ratio_sum += ratio
                        ratio_count += 1
                        # Update the item with the calculated ratio for easier usage if needed, 
                        # or just keep the raw points/total.
                        # For a "dumb" frontend, maybe we just give the formatted string "Points/Total"?
                        # But sorting might need the ratio.
                        # Let's keep points/total but create a "average" field.
                except (ValueError, TypeError):
                    pass
        
        avg = 0.0
        if ratio_count > 0:
            avg = total_ratio_sum / ratio_count
        
        processed_item['average_score'] = round(avg, 2) # Store as number for sorting
        
        processed_data.append(processed_item)

    # Save to file
    with open(output_path, 'w') as f:
        json.dump(processed_data, f, indent=2, ensure_ascii=False)

    print(f"Successfully processed {len(processed_data)} items.")
    print(f"Data saved to {output_path}")

if __name__ == "__main__":
    main()
