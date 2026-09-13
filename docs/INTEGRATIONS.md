# Integrations

Living status of every external service this site talks to (or has, at some point, been documented as intending to talk to). Update this file whenever an integration's status changes — this is the single source of truth for "what's real" so that stale plans in old sprint notes or `.env.example` don't get mistaken for current behavior.

## Active

| Integration | Purpose | Where it lives | Notes |
|---|---|---|---|
| **Neon Postgres** | Stores newsletter subscriptions and email-verification tokens | `@neondatabase/serverless`, used in `app/api/subscribe/route.ts`, `lib/email/verify.ts`, `lib/newsletter/sendWelcomeIssue.ts`, `app/api/newsletter/send-latest/route.ts` | Config via `DATABASE_URL`. No migration files exist — schema lives only as inline SQL in these files (see table list below). |
| **Resend** | Sends verification emails and the DDE newsletter digest | `lib/email/verify.ts` (raw `fetch` to Resend's HTTP API), `lib/newsletter/sendWelcomeIssue.ts` and `app/api/newsletter/send-latest/route.ts` (Resend SDK) | Config via `RESEND_API_KEY`, `EMAIL_FROM`. Two different calling conventions (SDK vs. raw fetch) are used for the same provider — harmless duplication, not yet unified. |
| **Plausible Analytics** | Site analytics + custom event tracking (newsletter signups) | Script tag hardcoded in `app/layout.tsx` (site ID baked into the script URL); event calls in `lib/analytics.ts`, `components/NewsletterForm.tsx`, `components/DDENewsletterForm.tsx` | **Not environment-driven** — the Plausible site/script ID is hardcoded directly in `layout.tsx`, not read from an env var. |
| **DDE pipeline output** (external repo) | Supplies the weekly domain-ranking data rendered on `/newsletter/domains` | `data/dde/latest/*`, `data/dde/runs/*`, read by `lib/newsletter/dde.ts` | The generation/scoring pipeline itself lives in a separate repository; this site only renders and emails artifacts it produces. Status of the DDE project overall is **PARKED** — see `/docs/PROJECT_STATE.md`. Historical run data must not be altered. |

## Replaced

| Integration | Was for | Replaced by | Evidence |
|---|---|---|---|
| **Buttondown** | Newsletter provider | Custom Neon + Resend double opt-in flow (`/api/subscribe`, `/newsletter/confirm`) | Named as the chosen provider in `docs/history/SPRINT_NOTES.md` and `docs/history/TODO_NEXT.md`; zero references anywhere in current code. |

## Aspirational / Never Implemented

These were named in early planning docs (`.env.example`, sprint notes) but no code was ever written for them. If a future mission wants to actually build one, treat it as new work, not a resumption of something in progress.

| Integration | Was for |
|---|---|
| **Stripe** | Billing / paid checkout |
| **Supabase** | Auth / database (superseded by the Neon decision before any code was written) |
| **NextAuth** | Authentication (no auth system exists anywhere in this app) |

## Removed (Mission 2 cleanup)

| Integration / surface | Was for | Removed because |
|---|---|---|
| **Payhip links** (`data/products.json`) | External checkout for `csvMend` and a launch guide | Lived only inside the orphaned `/products` route, which was removed as a superseded content model (see `/docs/PROJECT_STATE.md`). No checkout code lived in this repo — these were plain outbound links. |
| **Lead-capture flow** (`/api/lead`, `lib/email/leadConfirm.ts`, `components/LeadForm.tsx`) | Consulting inquiry form on `/consulting` | `/consulting` was retired — see `/docs/PROJECT_STATE.md`. Recoverable from git history if a contact/lead flow is wanted again later. |

## Database tables in use (Neon)

No migration files exist; this is reconstructed from inline SQL. If you add a table, document it here.

- `app.subscriptions` — `email`, `source`, `referer`, `ip`, `user_agent`, `verified` (bool). Unique-ish on `LOWER(email)`.
- `app.email_verification_tokens` — `email`, `token_hash`, `expires_at`.

(`app.leads` existed to support the removed `/consulting` lead form and is no longer written to by any code path. The table itself was not touched in Neon — see the note in `/docs/PROJECT_STATE.md` about database changes being out of scope for this cleanup.)
