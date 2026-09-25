# Project State

A living snapshot of what this repository actually is right now. Update this file when the site's purpose, canonical surfaces, or major system status changes — the goal is that a future session (human or Claude) can read this one file instead of re-deriving the whole picture from git history and source code.

This is a snapshot, not a roadmap. It does not list planned work.

## Current purpose

3EF (Three Eagles Forge) is a **personal project laboratory and engineering learning portfolio** — not a consulting business or storefront. The site exists to publish things built, problems investigated, technical experiments, architecture/implementation lessons, and project retrospectives. Business viability may be discussed as content where relevant, but lead generation and productized services are not the site's purpose.

This is a change from the site's original framing (Oct 2025 – early 2026), which positioned it as "3EF Studio," a consulting/services business for small-business website audits and upgrades. That framing was deliberately retired; see `docs/history/` for the earlier phase and Mission 1/2 archaeology for how the transition was identified.

The durable strategy behind that purpose — audiences, project-selection philosophy, lifecycle, and learning-objective framework — is now codified in `docs/SITE_STRATEGY.md`. How that strategy translates into site structure — information architecture, project presentation depth, Writing, and the deferred Build Log — is codified in `docs/CONTENT_MODEL.md`. This file does not repeat that content; it only tracks what has actually been *implemented* against it.

## Canonical public surfaces

| Route | Role |
|---|---|
| `/` | Home — current work highlights, latest posts, newsletter signup |
| `/about` | Site/studio framing + "Forge in Motion" activity feed |
| `/blog`, `/blog/[slug]` | Writing — the canonical content/publishing surface. Route stays `/blog`; public nav label is "Writing" (changed in Mission 4A). |
| `/portfolio` | Canonical project showcase (case studies) |
| `/newsletter/domains`, `/domains/[slug]`, `/domains/archive` | DDE weekly newsletter (parked project — see below) |
| `/newsletter/confirm*` | Double opt-in email verification flow |

Everything else that previously existed (`/consulting`, `/products`, `/projects`, `/labs`, `/sandbox/product-test`) was retired in Mission 2 as historical residue from the earlier consulting-business phase or as a superseded/duplicate content model. See `git log` for recovery if ever needed.

## Canonical content model

- **Writing** lives in `content/blog/*.mdx`, rendered through `lib/posts.ts` + `lib/markdown.ts` (gray-matter frontmatter, remark/rehype to HTML). This is the only active content pipeline.
- **Projects** are represented in exactly one place: the hand-authored `lib/portfolio.ts` array, rendered by `/portfolio`. This is canonical.
- There is **no longer a second project/product data model.** `data/products.json`, `data/projects.json`, and their supporting `lib`/`types`/component files were removed in Mission 2 — they duplicated `/portfolio` with different shapes and had drifted out of sync with it.
- The *target* model for how projects should be represented (presentation tiers/depth, e.g. flagship vs. small-tool vs. historical) is now defined in `docs/CONTENT_MODEL.md`. **It has not been implemented** — `lib/portfolio.ts`'s schema, `/portfolio`'s rendering, and its existing entries are unchanged since Mission 2 and do not yet reflect the tiered model. Do not assume the tiering exists in code.

## DDE (Domain Discovery Engine) status: **PARKED / HISTORICAL**

DDE was the most actively developed feature in this repo's recent history (weekly automated runs from Nov 2025 through Feb 2026), but it is **not a current strategic focus**. As of this mission:

- The newsletter routes, subscription flow, and all historical run data under `data/dde/` are preserved as-is.
- No further investment, extension, or "improvement" of the DDE workflow should happen without an explicit decision to un-park it.
- The DDE generation/scoring pipeline itself lives in a separate, external repository; this site only renders and emails artifacts that pipeline produces.
- Mission 4A softened DDE's *promotional* placement outside its own route tree — the `/blog` sidebar card now reads as a parked/archive link rather than a live promo (no styling-as-CTA), and the Header nav label change (see below) removed the "Blog" label DDE content used to sit under. No DDE data, functionality, routes, or historical content were touched.
- The homepage "Current work" section still presents DDE as one of three active tracks. Mission 4A deliberately did **not** touch this — removing or reframing it would require a homepage content/layout decision that was judged to be a redesign call, not a placement fix, and was out of scope. It remains open for a future mission.
- How (or whether) DDE should be presented publicly beyond the above is deferred to a future site positioning/IA mission.

## Active integrations (see `docs/INTEGRATIONS.md` for full detail)

- Neon Postgres (subscriptions, verification tokens)
- Resend (verification + DDE digest emails)
- Plausible Analytics (hardcoded script tag + custom events)

## Known parked / historical functionality

- **DDE newsletter** — parked, see above. Preserved, not extended.
- **"Forge in Motion" commit feed** (`/about`, backed by `/api/forge` and `data/recent_commits.json`) — populated by `scripts/build_recent_commits.sh`, a manually-run local script hardcoded to the author's machine paths (`$HOME/dev/3ef/...`). It cannot run in CI/Vercel and is not automated. Treat this data as manually refreshed and potentially stale; do not automate or reengineer it without an explicit decision. The approved-in-principle Build Log (see `docs/CONTENT_MODEL.md`) may eventually replace this, but Build Log remains **deferred and unimplemented** — no route, schema, or automation exists for it.
- **`data/backlog.json`** — a hand-maintained backlog surfaced on `/about`, functioning as the site's real "what's in progress" list (distinct from, and more current than, the archived `docs/history/TODO_NEXT.md`).

## Known technical gaps

- No automated tests of any kind, and no `typecheck` script (only `pnpm lint` and `pnpm build`, which runs `tsc` implicitly).
- No CI (no `.github/workflows`).
- No database migration files — the three Postgres tables this app has used are documented only via inline SQL (see `docs/INTEGRATIONS.md`).
- No deployment/infra config in-repo (no `vercel.json`); Vercel project settings, env vars, and DNS are managed outside this repository and were not inspected.
- Next.js is on the 16.0.x line (16.0.11). Several Next advisories, including two criticals that don't apply to the current Vercel deployment, are only fixed in 16.2.11+/16.3.3+; that minor upgrade has not been done. See `docs/SECURITY_ADVISORIES.md`.
- `config/context.yml` documents design tokens by hand with no generation link to `tailwind.config.cjs`/`globals.css` — the two must be kept in sync manually.

## Current project phase

**Strategy codified, minimal IA alignment complete (Mission 4A).** Mission 3 produced the site's strategy (purpose, audiences, project-selection philosophy, lifecycle, information architecture, project-depth model); Mission 4A turned that into durable documentation (`docs/SITE_STRATEGY.md`, `docs/CONTENT_MODEL.md`) and made only the smallest low-risk alignment changes: the `/blog` nav label now reads "Writing," a stale empty Footer placeholder from Mission 2 was removed, and the DDE promo card on `/blog` was softened to reflect its parked status. No portfolio redesign, no schema change, no flagship project population (Cosmo, Story Forge), no VeilMark rewrite, no Build Log implementation, and no homepage copy changes have been made — all remain deferred.

## Immediate next major initiative

Project-level archaeology and content preparation for the flagship projects not yet represented on the site — Story Forge and VeilMark are the likely next candidates (see Mission 3/4A reports for reasoning). That work, followed by the actual portfolio content/schema update, dedicated project pages, homepage repositioning copy, Build Log implementation, and an eventual visual refresh, has not started and this document should not be read as pre-deciding any of it.
