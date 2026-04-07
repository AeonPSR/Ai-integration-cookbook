# Contributing

## Adding a Recipe

1. Create a new MDX file in `src/content/recipes/`
2. Use the template below
3. Submit via PR with prefix `feat: add recipe — <name>`

### Recipe Template

```mdx
---
title: "Text Summarization"
slug: "text-summarization"
description: "Condense long text into key points using an LLM."
difficulty: "beginner"           # beginner | intermediate | advanced
models: ["gpt-4", "claude-3", "mistral-large"]
tags: ["text", "summarization", "nlp"]
estimatedCostPer1kTokens: 0.03  # USD, based on primary model
---

## What This Does

One-paragraph explanation of the use case and when to use it.

## Code

### Python

```python
# Self-contained, copy-pasteable snippet
```

### Node.js

```javascript
// Self-contained, copy-pasteable snippet
```

### curl

```bash
# Direct API call example
```

## How It Works

Step-by-step explanation of the prompt and parameters.

## Tips

- Practical advice for production use
- Edge cases to watch for
```

### Rules for Recipes

- **Self-contained**: each snippet runs independently, no imports from this project
- **Real API calls**: use official SDKs or REST endpoints, not wrappers
- **Include error handling**: at minimum, catch API errors
- **Show expected output**: include a sample response

## Code Style

- TypeScript for all project code
- Tailwind for styling — no custom CSS unless unavoidable
- Components in PascalCase, utilities in camelCase
- Keep files small — one component per file

## Git Workflow

1. Branch from `main`: `feat/recipe-name` or `fix/issue-description`
2. Commit with conventional prefixes (see README)
3. One logical change per commit
4. PR into `main` — describe what and why

## Local Development

```bash
npm install
npm run dev
```

Runs on [http://localhost:3000](http://localhost:3000).
