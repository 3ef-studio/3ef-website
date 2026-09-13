# Definition of Done

A lightweight checklist for any change to this repository. There is no CI here — this checklist is the gate.

## Every change

- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes locally (this also runs the TypeScript check)
- [ ] No secrets, API keys, or real credential values appear in the diff (`.env.example` must contain names/placeholders only)
- [ ] No unrelated files changed, no opportunistic refactors bundled in
- [ ] Manually exercised the changed route(s)/component(s) in `pnpm dev` when the change is user-facing

## If the change touches routes or navigation

- [ ] `app/sitemap.xml/route.ts` still lists exactly the routes intended to be publicly indexed (update deliberately, don't let it drift)
- [ ] No dead links to removed or renamed routes anywhere in `app/` or `components/`
- [ ] `robots.txt` behavior is still intentional

## If the change touches email, database, or newsletter code

- [ ] Subscribe → confirm → welcome-email flow still works end to end (or was not touched)
- [ ] No schema change was made without explicit approval (this repo has no migration files — any schema change must be documented in `docs/INTEGRATIONS.md`)
- [ ] DDE data under `data/dde/` was not altered unless the task explicitly required it

## If the change touches documentation

- [ ] `docs/PROJECT_STATE.md` and/or `docs/INTEGRATIONS.md` updated if the change affects what they describe
- [ ] Historical material in `docs/history/` was not rewritten to look current

## Before reporting complete

- [ ] Summarized what changed, what was deliberately left alone, and what (if anything) still needs human decision
