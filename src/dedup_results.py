
import json
import glob
import os

def dedup_file(filepath):
    """
    Deduplicates a JSONL file based on the 'data_source_id' field.
    Keeps the first occurrence of each 'data_source_id'.
    """
    print(f"Processing {filepath}...")
    seen_ids = set()
    unique_lines = []
    original_count = 0
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                original_count += 1
                line = line.strip()
                if not line:
                    continue
                try:
                    data = json.loads(line)
                    # Use 'data_source_id' as the unique key
                    # Adjust this key if the unique identifier field is different
                    record_id = data.get('data_source_id')
                    
                    if record_id:
                        if record_id not in seen_ids:
                            seen_ids.add(record_id)
                            unique_lines.append(line)
                    else:
                        # If no ID, keep it? Or warn? 
                        # Assuming for now we keep lines without ID to be safe, 
                        # or maybe they shouldn't exist. 
                        # Based on typical JSONL logs, safer to keep if unexpected structure,
                        # but for strict deduping, we might want to flag it.
                        # Let's keep it but treat as unique entry effectively (or skip dedup logic)
                        # Actually, if it's missing the ID, we can't dedup it by ID.
                        unique_lines.append(line)
                        
                except json.JSONDecodeError:
                    print(f"Warning: Could not decode line in {filepath}")
                    unique_lines.append(line) # Keep malformed lines? Or drop? Usually keep to preserve file integrity.

        new_count = len(unique_lines)
        if original_count != new_count:
            print(f"  - Found {original_count - new_count} duplicates. Rewriting file...")
            with open(filepath, 'w', encoding='utf-8') as f:
                for line in unique_lines:
                    f.write(line + '\n')
            print(f"  - Wrote {new_count} unique lines.")
        else:
            print(f"  - No duplicates found.")

    except Exception as e:
        print(f"Error processing {filepath}: {e}")

import argparse

def main():
    parser = argparse.ArgumentParser(description="Deduplicate JSONL files.")
    parser.add_argument("--pattern", type=str, default="results/*.jsonl", help="Glob pattern for files to process.")
    args = parser.parse_args()

    # Find all .jsonl files in the results directory
    files = glob.glob(args.pattern)
    
    if not files:
        print(f"No files found matching: {args.pattern}")
        return

    print(f"Found {len(files)} files matching '{args.pattern}'.")
    for filepath in files:
        dedup_file(filepath)

if __name__ == "__main__":
    main()
