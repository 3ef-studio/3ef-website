# 3EF Website

The public website for **Three Eagles Forge (3EF)** — a personal project laboratory and engineering learning portfolio. It publishes writing, project case studies, and a parked domain-discovery newsletter experiment.

See [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md) for a current-state snapshot (purpose, canonical surfaces, integration status, known gaps) and [`docs/INTEGRATIONS.md`](docs/INTEGRATIONS.md) for what's actually wired up vs. historical/aspirational. If you're an AI agent working in this repo, read [`CLAUDE.md`](CLAUDE.md) first.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 3 + shadcn-style UI primitives · Neon (Postgres) · Resend · Plausible

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env` and fill in real values — see that file for what each variable does. At minimum you'll need a Neon `DATABASE_URL` and a `RESEND_API_KEY` for the newsletter subscribe/confirm flow to work locally.

## Scripts

```bash
pnpm dev     # local dev server
pnpm build   # production build (also runs the TypeScript check)
pnpm start   # run a production build
pnpm lint    # ESLint
```

There is no test suite and no `typecheck` script — `pnpm build` is the correctness gate.

## Structure

- `app/` — routes (App Router)
- `content/blog/*.mdx` — blog posts (Markdown with frontmatter)
- `lib/portfolio.ts` — canonical project/case-study data (rendered by `/portfolio`)
- `data/dde/` — historical output from the (parked) Domain Discovery Engine newsletter pipeline
- `docs/` — living documentation; `docs/history/` holds superseded, historical-only material

## Documentation

| File | Purpose |
|---|---|
| `docs/PROJECT_STATE.md` | Current-state snapshot — read this first |
| `docs/INTEGRATIONS.md` | Status of every external integration |
| `docs/SECURITY_ADVISORIES.md` | Known dependency advisories, applicability, and what's still open |
| `docs/development/DEFINITION_OF_DONE.md` | Validation checklist for changes |
| `docs/history/` | Superseded sprint notes / TODOs from the site's earlier consulting-business phase |

## Deploy

Deployed on Vercel. Deployment/DNS/project settings are managed outside this repository.
