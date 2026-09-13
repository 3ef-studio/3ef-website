# CLAUDE.md — 3EF Website Operating Guide

This file orients any Claude Code session working in this repository. Keep it concise; it points to living docs rather than duplicating them.

## What this is

3EF (Three Eagles Forge) is a **personal project laboratory and engineering learning portfolio** — not a consulting business, not a storefront. See `docs/PROJECT_STATE.md` for the full current-state snapshot before assuming anything about positioning or active features; it is kept up to date and supersedes any impression from older commit messages or docs in `docs/history/`.

## Stack & commands

Next.js 16 (App Router) / React 19 / TypeScript / Tailwind 3 + shadcn-style UI primitives. Package manager is **pnpm** (pinned in `package.json`).

- `pnpm dev` — local dev server
- `pnpm build` — production build (this also runs the TypeScript check; there is no separate `typecheck` script)
- `pnpm lint` — ESLint
- There is **no test suite and no CI** in this repository. Don't assume either exists.

## Canonical content locations

- **Writing/blog:** `content/blog/*.mdx` (Markdown with frontmatter, not JSX-in-MDX), rendered via `lib/posts.ts` + `lib/markdown.ts`.
- **Project showcase:** `lib/portfolio.ts` — a single hand-authored TypeScript array, rendered by `/portfolio`. This is the **only** canonical project data model.
- **Design tokens:** `config/context.yml` documents brand colors/fonts/radii by hand; it is **not read by any code** (no YAML parser dependency) and must be kept in sync manually with `tailwind.config.cjs`/`app/globals.css`.
- **Backlog:** `data/backlog.json`, surfaced on `/about` via `/api/forge`. This is the real, currently-updated backlog — `docs/history/TODO_NEXT.md` is not.

Do not create a second project/product data model alongside `lib/portfolio.ts` (one existed before — `data/products.json` / `data/projects.json` — and was removed in Mission 2 for having drifted out of sync). If a task seems to call for one, stop and ask.

## Active vs. parked systems

- **Active:** blog, `/portfolio`, DDE newsletter subscribe/confirm flow, Plausible analytics.
- **Parked (preserve, do not extend):** the DDE (Domain Discovery Engine) newsletter and all its historical run data under `data/dde/`. Treat it as read-only external pipeline output. Do not "improve" or refactor DDE-related code without an explicit request — see `docs/PROJECT_STATE.md`.
- **Removed (Mission 2):** `/consulting`, `/api/lead`, `/products`, `/projects`, `/labs`, `/sandbox/product-test`, and their exclusive supporting code. Recoverable from git history; do not resurrect without explicit instruction.

Full detail on every integration's status lives in `docs/INTEGRATIONS.md` — check it before describing anything as "active" or "configured."

## External-side-effect guardrails

These paths cause real-world effects (emails to real people, database writes) — treat any change here as at least MEDIUM risk, regardless of how small the diff looks:

- `app/api/subscribe/route.ts`, `app/api/newsletter/send-latest/route.ts`, `app/newsletter/confirm/route.ts`
- `lib/email/verify.ts`, `lib/newsletter/sendWelcomeIssue.ts`, `lib/newsletter/dde.ts`
- Anything touching the `app.subscriptions` / `app.email_verification_tokens` Postgres tables or `DATABASE_URL`

## Risk tiers & approval workflow

1. Understand the task and check `docs/PROJECT_STATE.md` / `docs/INTEGRATIONS.md` for current reality before proposing anything.
2. Inspect the actual relevant code — don't assume from docs or naming alone.
3. Propose an approach and the specific files you'll touch.
4. For MEDIUM/HIGH risk work, get explicit approval before implementing.
5. Implement only the approved scope — no opportunistic refactors or unrelated cleanup.
6. Validate (see Definition of Done).
7. Update any living documentation the change affects.
8. Summarize what changed and stop.

| Tier | Examples | Rule |
|---|---|---|
| **LOW** | Blog post content, copy edits on `/about`/`/portfolio`, isolated styling, documentation | Proceed, summarize after |
| **MEDIUM** | New routes, component restructuring, subscribe/newsletter form behavior, nav/sitemap changes | Propose first, get explicit go-ahead |
| **HIGH** | Anything touching Postgres schema/data, `DATABASE_URL`/Neon config, Resend sending logic, deployment/Vercel settings, new external integrations, dependency upgrades (Next 16 / React 19 are both new; upgrades may be breaking) | Explicit approval required, treat as high blast-radius even for small diffs |

## Documentation expectations

Living docs to keep current when a change touches them: `README.md`, `docs/PROJECT_STATE.md`, `docs/INTEGRATIONS.md`. `docs/history/` is historical and should not be edited except to add further historical material — never treat it as current guidance.

## Stop conditions

Stop and summarize (don't keep going) when: the approved scope is complete, you hit a decision that changes site positioning/IA/visual design (that belongs to a dedicated future mission, not an incidental change), or you'd need to touch database schema, Neon, Resend behavior, Plausible, or Vercel/deployment settings without having been explicitly asked to.
