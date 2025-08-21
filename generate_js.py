import json
import glob

files = glob.glob("results/*_grades.json")

with open("script.js.template") as f:
    template = f.read()

js_code = template.replace("__FILES__", json.dumps(files))

with open("script.js", "w") as f:
    f.write(js_code)

print("Successfully generated script.js")
