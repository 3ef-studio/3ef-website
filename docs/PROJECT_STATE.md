# Project State

A living snapshot of what this repository actually is right now. Update this file when the site's purpose, canonical surfaces, or major system status changes — the goal is that a future session (human or Claude) can read this one file instead of re-deriving the whole picture from git history and source code.

This is a snapshot, not a roadmap. It does not list planned work.

## Current purpose

3EF (Three Eagles Forge) is a **personal project laboratory and engineering learning portfolio** — not a consulting business or storefront. The site exists to publish things built, problems investigated, technical experiments, architecture/implementation lessons, and project retrospectives. Business viability may be discussed as content where relevant, but lead generation and productized services are not the site's purpose.

This is a change from the site's original framing (Oct 2025 – early 2026), which positioned it as "3EF Studio," a consulting/services business for small-business website audits and upgrades. That framing was deliberately retired; see `docs/history/` for the earlier phase and Mission 1/2 archaeology for how the transition was identified.

## Canonical public surfaces

| Route | Role |
|---|---|
| `/` | Home — current work highlights, latest posts, newsletter signup |
| `/about` | Site/studio framing + "Forge in Motion" activity feed |
| `/blog`, `/blog/[slug]` | Writing — the canonical content/publishing surface |
| `/portfolio` | Canonical project showcase (case studies) |
| `/newsletter/domains`, `/domains/[slug]`, `/domains/archive` | DDE weekly newsletter (parked project — see below) |
| `/newsletter/confirm*` | Double opt-in email verification flow |

Everything else that previously existed (`/consulting`, `/products`, `/projects`, `/labs`, `/sandbox/product-test`) was retired in Mission 2 as historical residue from the earlier consulting-business phase or as a superseded/duplicate content model. See `git log` for recovery if ever needed.

## Canonical content model

- **Writing** lives in `content/blog/*.mdx`, rendered through `lib/posts.ts` + `lib/markdown.ts` (gray-matter frontmatter, remark/rehype to HTML). This is the only active content pipeline.
- **Projects** are represented in exactly one place: the hand-authored `lib/portfolio.ts` array, rendered by `/portfolio`. This is canonical.
- There is **no longer a second project/product data model.** `data/products.json`, `data/projects.json`, and their supporting `lib`/`types`/component files were removed in Mission 2 — they duplicated `/portfolio` with different shapes and had drifted out of sync with it.
- How projects *should* be represented going forward (tags, retrospective structure, a possible Build/Mission Log) is an open question for a future positioning/IA mission — not decided yet.

## DDE (Domain Discovery Engine) status: **PARKED / HISTORICAL**

DDE was the most actively developed feature in this repo's recent history (weekly automated runs from Nov 2025 through Feb 2026), but it is **not a current strategic focus**. As of this mission:

- The newsletter routes, subscription flow, and all historical run data under `data/dde/` are preserved as-is.
- No further investment, extension, or "improvement" of the DDE workflow should happen without an explicit decision to un-park it.
- The DDE generation/scoring pipeline itself lives in a separate, external repository; this site only renders and emails artifacts that pipeline produces.
- How (or whether) DDE should be presented publicly going forward is deferred to a future site positioning/IA mission.

## Active integrations (see `docs/INTEGRATIONS.md` for full detail)

- Neon Postgres (subscriptions, verification tokens)
- Resend (verification + DDE digest emails)
- Plausible Analytics (hardcoded script tag + custom events)

## Known parked / historical functionality

- **DDE newsletter** — parked, see above. Preserved, not extended.
- **"Forge in Motion" commit feed** (`/about`, backed by `/api/forge` and `data/recent_commits.json`) — populated by `scripts/build_recent_commits.sh`, a manually-run local script hardcoded to the author's machine paths (`$HOME/dev/3ef/...`). It cannot run in CI/Vercel and is not automated. Treat this data as manually refreshed and potentially stale; do not automate or reengineer it without an explicit decision — a future Build Log / Mission Log concept may replace this entirely.
- **`data/backlog.json`** — a hand-maintained backlog surfaced on `/about`, functioning as the site's real "what's in progress" list (distinct from, and more current than, the archived `docs/history/TODO_NEXT.md`).

## Known technical gaps

- No automated tests of any kind, and no `typecheck` script (only `pnpm lint` and `pnpm build`, which runs `tsc` implicitly).
- No CI (no `.github/workflows`).
- No database migration files — the three Postgres tables this app has used are documented only via inline SQL (see `docs/INTEGRATIONS.md`).
- No deployment/infra config in-repo (no `vercel.json`); Vercel project settings, env vars, and DNS are managed outside this repository and were not inspected.
- `config/context.yml` documents design tokens by hand with no generation link to `tailwind.config.cjs`/`globals.css` — the two must be kept in sync manually.

## Current project phase

**Post-cleanup / documentation refresh (Mission 2 complete).** The retired consulting-business surfaces and duplicate content models have been removed; living documentation (`README.md`, `.env.example`, `CLAUDE.md`, this file, `INTEGRATIONS.md`, `DEFINITION_OF_DONE.md`) now reflects the actual current repository. No redesign, repositioning copy, new content model, or DDE changes have been made.

## Immediate next major initiative

A future mission is expected to reconsider, deliberately and holistically: site positioning and homepage copy, information architecture, the project/portfolio content model, the Writing section, and a possible Build Log / Mission Log concept, plus an eventual visual refresh. That work has not started and this document should not be read as pre-deciding any of it.
