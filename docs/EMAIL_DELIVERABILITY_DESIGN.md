# Email Deliverability & Consent — Design

_Drafted: 2026-10-25. Design only — no application code, database schema, environment
variables, Resend settings, or DNS records have been changed. Status: **proposed, not
started**. Open decisions are in §8; resolve them before implementing._

> **Parked-system note.** Almost everything here touches the DDE newsletter, which
> `CLAUDE.md` and `docs/PROJECT_STATE.md` mark **parked — preserve, do not extend**. Every
> file involved is on `CLAUDE.md`'s external-side-effect list (MEDIUM risk minimum), and
> Phase 2 adds a column to `app.subscriptions` (HIGH risk). Implementing any phase requires
> an explicit decision to un-park DDE for that scope (§8, D1). Phase 0 is framed as a
> safety fix, not an extension.

---

## 1. Purpose

Make the site's email (a) only reach people who confirmed they want it, (b) easy to opt
out of, and (c) less likely to be filtered as spam — porting the deliverability work done
in Cosmo (commits `6613cf4`, `c437b36`, 2026-10-22) and the parallel 531workshop design
(`3ef-studio/531workshop-site`, `docs/EMAIL_DELIVERABILITY_DESIGN.md`), and adding what a
recurring newsletter needs that those two don't.

### Emails in scope

| Email | Code | Recipients | Trigger |
|---|---|---|---|
| **Subscription confirmation** | `lib/email/verify.ts` `sendVerificationEmail` (raw `fetch` to Resend) | any address submitted to `/api/subscribe` | every non-honeypot submission |
| **Welcome issue** (latest Top 20) | `lib/newsletter/sendWelcomeIssue.ts` (Resend SDK) | the confirming address, if `source = NEWSLETTER_SOURCE` | `GET /newsletter/confirm` succeeds |
| **Issue blast** | `app/api/newsletter/send-latest/route.ts` (Resend SDK) | every `app.subscriptions` row with `source = NEWSLETTER_SOURCE` | manual `POST` with `x-newsletter-token` |

Issue HTML comes from `data/dde/latest/issue.html`, produced by the external DDE pipeline
(read-only here). Its footer currently reads: _"Unsubscribe functionality will be added in
a later phase."_

---

## 2. Findings (as of 2026-10-25)

Ordered by severity.

1. **The blast ignores consent.** `send-latest` selects
   `WHERE source = ${NEWSLETTER_SOURCE}` with no `verified = TRUE` filter, so it mails every
   address ever typed into the DDE form — including unconfirmed ones and addresses entered
   by someone else. This is the behaviour that gets a domain onto blocklists.
2. **No unsubscribe.** No `unsubscribed_at` column, no endpoint, no link, no
   `List-Unsubscribe` header. Fails Gmail/Yahoo sender requirements for bulk/marketing mail
   and CAN-SPAM (which also requires a valid postal address in commercial email).
3. **Send failures are miscounted; sends aren't paced.** The Resend SDK resolves
   `{ data, error }` rather than throwing on API errors, so `Promise.allSettled` counts
   422/429 rejections as `sent`. All sends fire concurrently, which will trip Resend's rate
   limit as the list grows.
4. **No plain-text part** on any email; the confirmation is a bare `<div>` fragment; the
   issue HTML has `<html>` + charset but no doctype, `lang`, or `<title>`.
5. **The confirm link acts on GET.** `GET /newsletter/confirm` consumes the token, sets
   `verified = TRUE`, and sends the welcome issue. Link scanners (Outlook Safe Links,
   gateways) fetch every link in an inbound message, so a third party's scanner can
   "confirm" a subscription its owner never asked for.
6. **Link and sender alignment is unchecked.** `SITE_URL!` is used as-is (unset → the
   literal `undefined/newsletter/confirm…`; malformed → broken link). Confirmation uses
   `EMAIL_FROM`; issues use `NEWSLETTER_FROM_EMAIL` (default
   `3EF Studio <newsletter@3ef.studio>`). Both must be on a Resend-verified domain with
   SPF/DKIM/DMARC passing, and links should be on that same domain.
7. **Smaller items.**
   - `${email}` is interpolated unescaped into the confirmation HTML (zod's `.email()`
     limits but doesn't eliminate markup characters).
   - Re-submitting an address sends a fresh confirmation each time, with no limit (a
     form-bombing vector against third parties).
   - No Reply-To on any email.
   - Two calling conventions for Resend (raw `fetch` vs SDK) — already noted in
     `docs/INTEGRATIONS.md`.
8. **Concurrent confirms both send the welcome issue.** `consumeToken`
   (`lib/email/verify.ts`) runs `SELECT email, expires_at …`, then
   `UPDATE app.subscriptions SET verified = TRUE …`, then
   `DELETE … WHERE token_hash = …` as three separate statements over Neon's HTTP driver —
   no transaction and no conditional claim. Two overlapping requests (double-click, or a
   scanner fetch racing the subscriber's click) both find the token, both return
   `{ ok: true }`, and `app/newsletter/confirm/route.ts` calls
   `sendWelcomeIssueIfNewsletter` twice. The GET→POST change in §5.2 removes the scanner
   trigger but not a double-submitted form.
9. **The `send-latest` secret check is weaker than it needs to be (low).**
   `app/api/newsletter/send-latest/route.ts` compares with `token !== MANUAL_TOKEN` (not
   constant-time), accepts a secret of any length, and returns
   `reason: "missing_header" | "token_mismatch" | "missing_manual_token_env"` in the 401
   body — telling an unauthenticated caller which check failed and whether the server is
   configured. It does already fail closed when the secret is unset.
10. **Observation, not a deliverability bug:** Home-page signups (`source = "Home Page"`)
    receive a confirmation and then nothing, ever. See §8, D5.

_Findings 8 and 9 were added 2026-10-25 from a review of Cosmo's recent engineering
lessons (exactly-one-winner claims with race tests — Cosmo M-24/M-86/M-91; constant-time,
fail-closed, minimum-length Cron secret — Cosmo M-86)._

---

## 3. Cosmo / 531workshop → 3EF mapping

| Pattern | Cosmo | 531workshop design | 3EF |
|---|---|---|---|
| Validated link base URL | `APP_BASE_URL` | `SITE_URL` validated | **Port** (`SITE_URL`) |
| Full HTML document wrapper | Yes | Yes | **Port** (confirmation; issue HTML normalised) |
| Plain-text alternative | Yes | Yes | **Port** (all three emails) |
| Optional Reply-To | `EMAIL_REPLY_TO` | `EMAIL_REPLY_TO` | **Port** |
| GET-shows / POST-acts for emailed links | unsubscribe endpoint | confirm link | **Port** to confirm + unsubscribe |
| One-click `List-Unsubscribe` (RFC 8058) | agent emails only | skipped (no recurring mail) | **Required** — issues are recurring bulk mail |
| Signed or hashed unsubscribe token | signed token (`AUTH_SECRET`) | n/a | **New** (§5.2) |
| Check Resend's returned `error` | `EmailSendFailedError` | D3 (optional) | **Required** for the blast |
| Verified-only recipients | (implicit — app users) | n/a | **Required** — Phase 0 |
| Exactly-one-winner claim before a side effect | row lock / conditional claim (M-24, M-86, M-91) | atomic token claim | **Port** to `consumeToken` (§5.2, finding 8) |
| Constant-time, fail-closed, minimum-length shared secret | Cron secret (M-86) | n/a (no secret endpoints) | **Port** to `send-latest` (§5.2, finding 9) |

---

## 4. Phasing

| Phase | Scope | Risk (CLAUDE.md tier) | Depends on |
|---|---|---|---|
| **0 — Stop non-consensual sends** | `send-latest` filters `verified = TRUE`; optionally disable it entirely until Phase 2 ships (D2) | MEDIUM | D1 (narrow un-park) |
| **1 — Message hygiene** | `lib/email/` helpers, plain text, full documents, validated `SITE_URL`, escaping, Reply-To, confirm on POST, atomic token claim, `send-latest` secret check, Resend error handling | MEDIUM | D1 |
| **2 — Unsubscribe** | `unsubscribed_at` column, token, endpoint, `List-Unsubscribe` headers, footer, postal address | **HIGH** (schema) | D1, D3, D4 |
| **3 — Ops** | DNS / Resend / Vercel env checklist (§7) | HIGH (deployment settings) — owner action | — |

Phase 0 is small enough to ship on its own and should go first. **Do not run
`send-latest` again until Phase 0 is deployed**, and preferably not until Phase 2 is.

---

## 5. Design

### 5.1 Phase 0 — consent filter (`app/api/newsletter/send-latest/route.ts`)

- Recipient query becomes
  `WHERE source = ${NEWSLETTER_SOURCE} AND verified = TRUE` (and, after Phase 2,
  `AND unsubscribed_at IS NULL`).
- The dry-run response reports both `totalSubscribers` (verified) and
  `unverifiedExcluded` counts, so the effect is visible before a real send.
- Alternative / additionally (D2): return `503 { error: "Sending disabled until
  unsubscribe ships" }` unless `NEWSLETTER_SEND_ENABLED === "true"`.

### 5.2 Phase 1 — message hygiene

**New module `lib/email/message.ts`** (sibling of `lib/email/verify.ts`; no new dependency):

- `siteBaseUrl(): string` — `SITE_URL` trimmed → `new URL(v).origin`; unset or malformed
  → falls back to `NEXT_PUBLIC_SITE_URL` the same way, else throws a clear configuration
  error (the confirmation is sent from a route handler, so the subscribe route returns its
  existing 500 rather than mailing a broken link).
- `emailDocument(subject, bodyHtml)` — doctype, `<html lang="en">`, charset, viewport,
  escaped `<title>`, simple inline-styled container. Same shape as Cosmo's.
- `escapeHtml(value)`.
- `htmlToText(html)` — a deliberately small converter for the issue HTML only: drop
  `<head>`/`<style>`, turn `<br>`, `</p>`, `</tr>`, `</h*>`, `<hr>` into newlines,
  `</td>` into ` | `, `<a href="x">t</a>` into `t (x)`, strip remaining tags, decode the
  handful of entities the pipeline emits, collapse blank lines. Good enough for a
  readable text part; not a general converter. (If the DDE pipeline can emit `issue.txt`
  alongside `issue.html`, prefer that and use `htmlToText` only as the fallback — D6.)
- `sendEmail(message)` — single Resend SDK wrapper used by all three call sites: sets
  `from`, `replyTo` (from `EMAIL_REPLY_TO` when set), `headers` (when given), and
  **throws** on a returned `error`. Replaces the raw `fetch` in `verify.ts`, resolving
  the duplicate-convention note in `INTEGRATIONS.md`.

**Confirmation email (`lib/email/verify.ts`)**
- Link from `siteBaseUrl()`; `${email}` escaped; wrapped with `emailDocument`; `text`
  version with the raw URL on its own line; keeps the existing "If you didn't request
  this, you can ignore this email" line. Sent via `sendEmail`.
- No `List-Unsubscribe` (transactional).

**Issue emails (`sendWelcomeIssue.ts`, `send-latest`)**
- The issue HTML is used as-is from `data/dde/latest/issue.html`, with two light,
  code-side normalisations: prepend `<!doctype html>` if missing; add `lang="en"` to
  `<html>` if missing. The pipeline's output file is never edited.
- `text: htmlToText(issueHtml)` (or `issue.txt`, D6).
- Phase 2 adds headers and the footer (§5.3).

**Blast sending (`send-latest`)**
- Replace the unbounded `Promise.allSettled` with sequential batches via
  `resend.batch.send` (up to 100 messages per call) with a short pause between batches,
  or a simple sequential loop at ≤ 2 sends/second if per-recipient headers make batching
  awkward. Count a message as `sent` only when no `error` is returned; log failures with
  the Resend error name, not the address.
- Idempotency key per recipient per issue: `dde-issue:${issueSlug}:${sha256(email)}` so a
  re-run after partial failure doesn't double-send (`issueSlug` from
  `data/dde/latest/issue_meta.json`).

**Confirm on POST (`app/newsletter/confirm/`)**
- `GET /newsletter/confirm?token=…` — read-only lookup (no delete, no update). Missing /
  invalid / expired → today's redirects to `/newsletter/confirm/error?reason=…`. Valid →
  a small page: "Confirm your subscription to 3EF Studio?" with one button in a
  `<form method="post">` carrying the token in a hidden field.
- `POST /newsletter/confirm` — today's GET logic unchanged (`consumeToken`,
  `sendWelcomeIssueIfNewsletter`), then `303` to `/newsletter/confirm/success`.
- Emailed URLs don't change, so outstanding confirmation links keep working.
- `consumeToken` needs a read-only sibling (`findValidToken`) for the GET.

**Atomic token claim (`lib/email/verify.ts` `consumeToken`, finding 8)**
- Claim the token with one statement that only one request can win:
  `DELETE FROM app.email_verification_tokens WHERE token_hash = $1 RETURNING email, expires_at`.
  No row → `not_found` (an already-consumed token looks the same — the first request has
  already done the work). Row returned but expired → `expired` (the row is already gone,
  as today). Otherwise → `UPDATE app.subscriptions SET verified = TRUE …` and return
  `{ ok: true, email }`.
- Only the request that received the row goes on to `sendWelcomeIssueIfNewsletter`. Two
  overlapping `DELETE`s on the same row serialise in Postgres; the second finds nothing to
  delete and returns no row.
- If the process dies between the `DELETE` and the `UPDATE`, the subscriber is left
  unverified with no token and must re-subscribe — the same outcome as an expired link,
  and acceptable. (Wrapping both in Neon's `sql.transaction([...])` would close it, but
  the `UPDATE` depends on the `DELETE`'s result, so it would need a single CTE statement;
  not worth the complexity here.)

**`send-latest` secret check (finding 9)**
- Compare with `crypto.timingSafeEqual` over equal-length buffers (length mismatch →
  unauthorized).
- Treat a configured `NEWSLETTER_MANUAL_TOKEN` shorter than 32 characters as unset —
  refuse to run (fail closed), as Cosmo's Cron route does.
- Return a bare `401 { ok: false, error: "Unauthorized" }`; keep the specific `authReason`
  in the server-side `console.warn` only.

**Confirmation throttling (small)**
- In `/api/subscribe`, if a token for that email was created in the last N minutes
  (e.g. 10), skip sending and return the same success message. Needs the token row's
  creation time — `expires_at - ttl` is sufficient, no schema change.

### 5.3 Phase 2 — unsubscribe

**Schema (HIGH risk, out-of-band — there is no migration framework here):**

```sql
ALTER TABLE app.subscriptions ADD COLUMN unsubscribed_at TIMESTAMPTZ NULL;
```

Additive, nullable, no backfill. Document in `docs/INTEGRATIONS.md`'s table list.

**Token (D3):** recommended — an HMAC-signed token over `{ email (lowercased), purpose:
"newsletter-unsubscribe" }` keyed by a new `NEWSLETTER_UNSUBSCRIBE_SECRET`, using Node
`crypto` (`createHmac('sha256')`, base64url). No expiry: unsubscribe links in old issues
must keep working. Stateless, so no new table; rotating the secret invalidates old links
(acceptable — note it in OPERATIONS). Alternative: a random per-subscriber token stored
in a new column (revocable, but a second schema change).

**Endpoint `app/api/newsletter/unsubscribe/route.ts`** (mirrors Cosmo's
`app/api/email/unsubscribe/route.ts`):

- `POST ?token=…` — verify the token; set `unsubscribed_at = now()` where
  `LOWER(email) = LOWER($1) AND unsubscribed_at IS NULL`; return `200 "Unsubscribed."`
  (for one-click from the mail client), or a confirmation HTML page when the request came
  from the page's own form. Invalid token → 400. Idempotent.
- `GET ?token=…` — changes nothing; shows "Stop the 3EF Domain Discovery emails?" with one
  button that POSTs.

**Headers on every issue email** (welcome + blast), never on the confirmation:

```
List-Unsubscribe: <https://<site>/api/newsletter/unsubscribe?token=…>, <mailto:…?subject=unsubscribe>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

The `mailto:` part is optional (D4) and only worth adding if the address is monitored.

**Footer.** Each issue email gets a footer appended by the site (inserted before
`</body>` in the HTML, appended to the text part): why they're receiving it, a visible
unsubscribe link (same URL as the header), and the sender's postal address
(`NEWSLETTER_POSTAL_ADDRESS`; D4). Replace — by stripping in code, not by editing the
pipeline's file — the pipeline's "Unsubscribe functionality will be added in a later
phase" paragraph, or ask the pipeline to drop it (D6).

**Recipient queries** — `send-latest` and `sendWelcomeIssueIfNewsletter` both add
`unsubscribed_at IS NULL`. Re-subscribing via the form clears `unsubscribed_at` only
after a fresh double opt-in (`consumeToken` sets `verified = TRUE, unsubscribed_at =
NULL`), never on the bare form submission.

### 5.4 What is deliberately not changing

- The DDE pipeline, its output files under `data/dde/`, and the issue content.
- No newsletter provider migration (Buttondown is named in history docs only — out of
  scope).
- No list-management UI, no preference centre, no analytics/tracking in emails.
- The Home-page signup behaviour (D5) beyond what's listed.

---

## 6. Environment variables

| Variable | Change |
|---|---|
| `SITE_URL` | Now validated (origin only); falls back to `NEXT_PUBLIC_SITE_URL`. Must be on the sending domain. |
| `EMAIL_FROM`, `NEWSLETTER_FROM_EMAIL` | Unchanged; both must be on the Resend-verified domain (§7). Consider collapsing to one (D7). |
| `EMAIL_REPLY_TO` | **New, optional.** Monitored inbox; Reply-To on all three emails. |
| `NEWSLETTER_UNSUBSCRIBE_SECRET` | **New, Phase 2.** ≥ 32 random bytes. Required for issue sends; `send-latest` refuses to run without it. |
| `NEWSLETTER_POSTAL_ADDRESS` | **New, Phase 2** (D4). Required for issue sends. |
| `NEWSLETTER_SEND_ENABLED` | **New, optional, Phase 0** (D2). |
| `NEWSLETTER_MANUAL_TOKEN` | Unchanged name; must now be ≥ 32 characters or `send-latest` refuses to run (Phase 1). Rotate it if the current value is shorter. |

---

## 7. Operations checklist (owner action; Vercel/DNS are HIGH-risk per CLAUDE.md)

1. `3ef.studio` verified in Resend; DKIM and SPF/return-path records show as verified.
2. DMARC record on `3ef.studio`: start `v=DMARC1; p=none; rua=mailto:…`, review reports,
   then tighten to `p=quarantine`.
3. `EMAIL_FROM` and `NEWSLETTER_FROM_EMAIL` both use `@3ef.studio` (or a subdomain covered
   by the same verification).
4. `SITE_URL` in Vercel production = `https://3ef.studio` (or the canonical `www` origin).
5. New Phase 2 env vars set before the first post-Phase-2 send.
6. After each phase deploys: one real end-to-end signup to a Gmail address; check "Show
   original" for SPF/DKIM/DMARC `PASS`, a text part, and (Phase 2) Gmail's own
   "Unsubscribe" control appearing next to the sender.
7. Before the first blast after Phase 0: run `?dry=1` and check `unverifiedExcluded`.

---

## 8. Open decisions

- **D1 — Un-park DDE for this scope?** Required for any phase. Suggested wording: "DDE
  remains parked for new features; consent, unsubscribe, and deliverability fixes are
  approved as safety work."
- **D2 — Phase 0: filter only, or also gate `send-latest` behind
  `NEWSLETTER_SEND_ENABLED` until Phase 2 ships?** Recommended: both.
- **D3 — Unsubscribe token: stateless HMAC (recommended) or stored per-subscriber token?**
- **D4 — Postal address and `mailto:` unsubscribe.** CAN-SPAM wants a valid physical
  postal address (a PO box or registered mail-receiving address is acceptable). Which
  address, and is there a monitored mailbox for `mailto:` unsubscribes?
- **D5 — Home-page signups.** They confirm and then receive nothing. Options: retire that
  form, relabel what it signs up for, or treat it as the same list. Out of scope for
  deliverability, but worth deciding before anyone is mailed under that source.
- **D6 — Ask the external DDE pipeline to emit `issue.txt` and drop its placeholder
  unsubscribe sentence?** Cleaner than code-side text conversion and footer stripping,
  but touches the other repository.
- **D7 — Collapse `EMAIL_FROM` / `NEWSLETTER_FROM_EMAIL` into one sender?** Fewer
  addresses to verify and warm up; separate addresses let transactional and newsletter
  reputation diverge. Either is fine; pick one deliberately.

---

## 9. Validation plan

There is no test suite or CI in this repository (`CLAUDE.md`). Options, in order of
preference (D8, implicit): add Vitest for the pure helpers only (`siteBaseUrl`,
`emailDocument`, `escapeHtml`, `htmlToText`, unsubscribe token sign/verify, footer
insertion) — or validate manually as below. Either way:

- `pnpm lint` and `pnpm build`.
- Phase 0: `POST /api/newsletter/send-latest?dry=1` against production with the manual
  token (read-only) and confirm `totalSubscribers` now counts verified rows only.
- Phase 1: end-to-end signup on a preview deployment to a real inbox: confirmation has a
  text part; opening the link shows the confirm page and does **not** verify (check the
  row); pressing the button verifies and sends the welcome issue (text part present).
  Confirm that a malformed `SITE_URL` falls back correctly.
- Phase 1, atomic claim: submit the confirm form twice in quick succession (or fire two
  parallel POSTs with the same token via `curl … & curl …`) and confirm exactly one
  welcome issue arrives; repeat once against the old `consumeToken` to see two.
- Phase 1, secret check: `send-latest?dry=1` with no header, a wrong header, and a
  wrong-length header all return the same bare 401; with `NEWSLETTER_MANUAL_TOKEN` set
  to a short value, even the correct header is refused.
- Phase 2: one-click unsubscribe from Gmail's control sets `unsubscribed_at`; `GET` on the
  unsubscribe URL changes nothing; a forged token returns 400; a `dry=1` blast excludes
  the unsubscribed address.
- Preview deployments share production `DATABASE_URL` unless configured otherwise —
  confirm which database a preview uses before testing, and use your own addresses only.

---

## 10. Files expected to change

- Phase 0: `app/api/newsletter/send-latest/route.ts`
- Phase 1: `lib/email/message.ts` (new), `lib/email/verify.ts`,
  `lib/newsletter/sendWelcomeIssue.ts`, `app/api/newsletter/send-latest/route.ts`,
  `app/api/subscribe/route.ts`, `app/newsletter/confirm/route.ts` (+ a confirm page)
- Phase 2: `app/api/newsletter/unsubscribe/route.ts` (new), `lib/email/unsubscribe.ts`
  (new), the two issue senders, `lib/email/verify.ts` (`consumeToken` clears
  `unsubscribed_at`)
- Docs: `docs/INTEGRATIONS.md` (env vars, table columns, Resend section),
  `docs/PROJECT_STATE.md` (DDE status note per D1), `README.md` if env setup is listed
  there, and this document's status line.
