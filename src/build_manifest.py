#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RESULTS = ROOT / "results"
MANIFEST = RESULTS / "manifest.json"

def main():
    files = sorted([p.name for p in RESULTS.glob("*_grades.json") if p.is_file()])
    MANIFEST.write_text(json.dumps(files, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(files)} entries to {MANIFEST}")

if __name__ == "__main__":
    main()
