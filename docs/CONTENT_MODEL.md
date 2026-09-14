# Content Model

This document owns **how public content should be organized** — information architecture, project presentation depth, and the Writing/Build Log distinction. For *why* the site exists and how projects are chosen, see `docs/SITE_STRATEGY.md`. For current implementation status (what's actually built vs. this target model), see `docs/PROJECT_STATE.md`.

## Top-level information architecture

Intended top-level public model:

- **Home**
- **Projects**
- **Writing**
- **Build Log** *(deferred — see below)*
- **About**

| Section | Purpose | Content type | Update frequency |
|---|---|---|---|
| Home | Front door — states the purpose, surfaces current/flagship highlights, routes elsewhere | Sparse, curated | Rare |
| Projects | The durable, current state of the body of work | Structured (status, problem, stack, learnings) | Event-driven — when a project's status or learnings change |
| Writing | Reflection and deep dives | Long-form, dated, immutable once published | Irregular, no cadence |
| Build Log | Terse chronological record of activity | Short, dated entries | Opportunistic |
| About | Why the lab exists and how the work is approached | Static prose | Rare |

### Distinguishing the four content sections

- **Projects** = what the project *is* / its current durable state (evergreen, edited in place)
- **Writing** = what has been learned or understood deeply enough to explain (dated, immutable, may reference a project)
- **Build Log** = what happened, briefly and chronologically (terse; may later be referenced by a Writing piece or a Projects update, but is neither)
- **About** = why the lab exists and how the work is approached generally — never project-specific

If a piece of content doesn't clearly land in exactly one of these, that's a signal it's being force-fit.

The `/blog` route may remain `/blog` at the URL level; the public-facing nav label is **Writing**.

## Project depth/tier model

The canonical project data source remains a single structure (currently `lib/portfolio.ts`) — this model does not introduce a second content source. It describes the *range* of presentation depth that source should be able to express, not a schema change (schema changes are a separate, explicitly-approved implementation step).

| Tier | Examples | Depth |
|---|---|---|
| **Flagship** | Cosmo, Story Forge, VeilMark (pending its own archaeology) | Full: problem, status, architecture, notable decisions, learnings, related writing/log entries, screenshots/diagrams |
| **Substantial experiment** | devkit / WUA / agentic work | Moderate |
| **Client / case study** | 531 Workshop | Moderate, emphasizing delivery/outcomes over novelty |
| **Small tool / experiment** | csvmend, pc-diagnostic, Prospect Finder | Compact |
| **Historical / parked** | DDE | Short retrospective framing, explicit parked status |

Tier indicates warranted presentation depth, not project quality or importance. A small parked tool is not a lesser project — it's a project that warrants a shorter writeup.

Dedicated per-project pages are not implemented yet. This model is written so that adding them later (for flagship projects especially) does not require redesigning the underlying data source again.

## Writing strategy

Public label: **Writing**.

Writing is selective and may include:
- technical deep dives
- architecture case studies
- retrospectives
- experiment write-ups
- AI-assisted development lessons
- meaningful negative results

No publishing cadence is required or implied. Substantive engineering work may generate a Writing piece when there is something genuinely worth capturing — this is a byproduct of doing the work, not an obligation attached to it.

## Build Log — deferred, not implemented

The Build Log concept is approved in principle: a lightweight, chronological surface for terse updates that don't warrant a full Writing piece (a milestone, a decision, a project start/stop, a short learning from a small investigation).

**Status: DEFERRED / NOT IMPLEMENTED.** No route, content model, automation, or publishing pipeline exists for it. Deliberately so — it's easy to overbuild this before there's real material and a settled cadence for it. When it is implemented, it must not become an automatic byproduct of every internal mission or session — see the workflow note below.

## Relationship between internal engineering work and public content (conceptual)

Internal engineering artifacts (READMEs, architecture notes, ADRs, `PROJECT_STATE.md`, mission/session reports) are the byproduct of doing the work. Public content is a deliberate, occasional, human-reviewed extraction from that byproduct — not an automatic pipeline.

Conceptually:

```
project work
  → internal documentation
  → (human judgment: is anything here worth surfacing? — usually not)
  → occasionally: a Projects entry update, a Build Log entry, or a Writing piece
```

No internal report is ever published as-is, and no mission or session is expected to produce public content by default. This document does not specify implementation details for that workflow (drafting tools, triggers, storage) beyond this conceptual shape — those are decisions for whenever Build Log or a similar mechanism is actually implemented.
