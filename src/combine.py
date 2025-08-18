import pandas as pd
import json
import glob
import os

json_folder = "results"
output_csv = "results/combined.csv"

data_rows = []

for file in glob.glob(os.path.join(json_folder, "*.json")):
    with open(file, 'r') as f:
        content = json.load(f)
        flat_row = {'sampled_model_name': content['sampled_model_name']}
        
        for key, value in content.items():
            if key != 'sampled_model_name':
                flat_row[f"{key}_points"] = value['points']
                flat_row[f"{key}_total"] = value['total']
        
        data_rows.append(flat_row)

df = pd.DataFrame(data_rows)
df.to_csv(output_csv, index=False)