# Site Strategy

This document owns the **why** — 3EF's purpose, audiences, and the operating philosophy behind which projects get built and how far they go. It is durable and should change rarely, only when the underlying philosophy actually changes (not every time a project or page changes — that's `docs/PROJECT_STATE.md`).

For how public content is organized (navigation, project depth, Writing, Build Log), see `docs/CONTENT_MODEL.md`. For current implementation status, see `docs/PROJECT_STATE.md`.

## Purpose

3EF exists first as a durable record of personal engineering work and learning — it should remain valuable even at zero traffic. Publicly, it communicates clearly to technically curious builders and practitioners, without requiring them to already know the author's history.

3EF is:
- a personal engineering/project laboratory
- a record of usable things built around real problems
- a place to capture meaningful technical/product learning
- a place for selective project retrospectives and technical writing

3EF is not:
- a consulting/services business
- a storefront
- a startup studio
- an AI-news/content machine
- a resume-first portfolio
- a publishing operation with a required cadence

Business outcomes are optional upside, never the reason a project exists.

## Primary audiences (ranked)

1. **The author, as a durable record.** The site must hold up with zero visitors. This is the test every other decision is measured against.
2. **Technically curious builders and practitioners.** The only external audience the site is designed *for*.
3. **Peers, collaborators, and professional network.** Served as a byproduct of serving #2 well — not designed for directly.

Not designed for: casual/general visitors, potential clients or leads, an "AI news" audience.

## Project-selection philosophy

A project should not start merely because the technology is interesting.

### Required entry gates

A project must have:
1. A real, personally understood problem.
2. A reachable usable MVP without large upfront cost.
3. At least one concrete learning objective that is new to the author.
4. A cheap exit — it must be possible to stop without meaningful financial, infrastructure, or reputational lock-in.

### Continuation gate

At each meaningful phase boundary, further investment must satisfy at least one:
1. It solves a demonstrated user/problem need.
2. It answers a worthwhile technical or product question that is still unresolved.

If neither applies, the project should normally be parked — parking is a normal outcome, not a failure.

### Comparative considerations

When choosing between several valid candidate projects, useful (non-mandatory) considerations include:
- learning novelty relative to prior projects
- access to real feedback
- measurability of success
- maintenance burden
- third-party dependency burden
- whether failure would still produce useful evidence
- privacy/ethical risk where relevant

Technical impressiveness by itself is not a selection criterion.

## Project lifecycle

- **SPARK** — idea only, no repository required.
- **SPIKE** — time-boxed feasibility/learning investigation.
- **ACTIVE** — passed the entry gates and is pursuing, or has reached, a usable MVP.
- **PARKED** — deliberately paused. Not a failure state.
- **ARCHIVED** — no longer expected to resume; preserved for historical value.

There is no separate terminal "COMPLETE" state. Completion applies to phases or milestones, not necessarily to the project as a whole — most projects here are expected to move toward PARKED rather than a finish line, and that is a legitimate, common outcome.

## Learning-objective framework

Internally, substantial projects should be able to answer:
- **Problem** — what real problem triggered this?
- **Learning objectives** — what did I want to understand that I didn't already know?
- **Hypotheses** — what did I believe might work?
- **MVP** — what was the smallest genuinely usable artifact?
- **Experiments** — what did I actually test?
- **Results** — what happened?
- **Learnings** — what understanding changed?
- **Next decision** — continue, park, expand, or stop?

This is an internal thinking/documentation aid (project READMEs, ADRs, retrospectives) — not a rigid public template. Public project pages stay narrative and selective; they may draw on this structure without exposing it as a form.
