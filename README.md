# AI skolprov

On this page, you can see how some of the most advanced AI models (specifically language models or LLMs) perform on the Swedish Scholastic Aptitude Test. Development is progressing rapidly, and it can be challenging to assess how well these new tools can solve various tasks. Having the models take tests like the Scholastic Aptitude Test provides a concrete way to measure their capabilities. It is a tool that developers, researchers, and companies can use to evaluate what the models can be used for.

To view the site and test results go to [https://ekgren.github.io/aiskolprov/](https://ekgren.github.io/aiskolprov/)

## Developing locally

If you open `index.html` directly from the filesystem, the browser may block loading `results/grades.csv`. Start a simple local web server and then open the served URL:

```bash
# From the repo root
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Adding new results

The page now prefers loading `results/*_grades.json` via a manifest file.

1. Drop new `*_grades.json` files into `results/`.
2. Regenerate the manifest:

```bash
python3 src/build_manifest.py
```

Commit both the new files and `results/manifest.json`. The page will discover them automatically.

If the manifest is missing, the page falls back to `results/grades.csv`.