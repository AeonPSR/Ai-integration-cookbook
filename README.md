# AI Integration Cookbook

A static website with interactive, copy-paste code recipes for common AI/LLM use cases.  
Built for dev teams that need to ship AI features — fast, without in-house AI expertise.

## What This Is

A collection of **self-contained, copy-pasteable recipes** for real AI use cases:
- Text summarization, classification, entity extraction, image description, and more
- Working code in **Python**, **Node.js**, and **curl**
- Live "Try it" sandboxes to test prompts with real LLM APIs
- Side-by-side model comparison (GPT-4, Claude, Mistral)
- Token counter and cost estimator per model

## Tech Stack

| Layer       | Technology           |
|-------------|----------------------|
| Framework   | Next.js 14 (App Router) |
| Styling     | Tailwind CSS         |
| Language    | TypeScript           |
| Content     | MDX (recipe files)   |
| Deployment  | Static export        |

## Project Structure

```
src/
├── app/                    # Next.js pages (App Router)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage — recipe grid + search
│   ├── globals.css         # Tailwind base styles
│   ├── recipes/[slug]/     # Individual recipe pages
│   ├── compare/            # Multi-model comparison view
│   └── submit/             # Recipe submission form
├── components/             # Reusable UI components
│   ├── ui/                 # Generic UI primitives
│   ├── CodeBlock.tsx       # Syntax-highlighted, copyable code
│   ├── CostEstimator.tsx   # Token count + cost widget
│   ├── LiveSandbox.tsx     # "Try it" interactive panel
│   ├── ModelComparison.tsx # Side-by-side model output
│   ├── RecipeCard.tsx      # Recipe preview card
│   └── SearchFilter.tsx    # Search + filter controls
├── lib/                    # Utilities and API clients
│   ├── api/                # LLM provider API wrappers
│   ├── models.ts           # Model definitions (name, pricing, limits)
│   └── tokens.ts           # Token counting helpers
├── content/
│   └── recipes/            # Recipe MDX files (one per recipe)
└── types/
    └── index.ts            # Shared TypeScript types
```

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build static site
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

## API Keys

Live sandboxes need LLM API keys. Create `.env.local`:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
MISTRAL_API_KEY=...
```

**Never commit `.env.local`.** It's in `.gitignore`.

## Adding a Recipe

See [CONTRIBUTING.md](CONTRIBUTING.md) for the recipe template and submission process.

## Git Conventions

| Prefix     | Use for                        |
|------------|--------------------------------|
| `feat:`    | New recipe or feature          |
| `fix:`     | Bug fix                        |
| `docs:`    | Documentation only             |
| `style:`   | Formatting, no logic change    |
| `refactor:`| Code restructure, no new feature |
| `chore:`   | Tooling, deps, config          |

Keep commits atomic — one logical change per commit.

## License

MIT
