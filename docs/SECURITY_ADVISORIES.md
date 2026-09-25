# Dependency Security Advisories

A living record of known dependency/framework advisories against this repo, whether each one actually applies to how the site is built and deployed, and what was done about it. Re-run `pnpm audit` and update this file when dependencies change.

**Last reviewed:** 2026-09-25 (`pnpm audit` against the GitHub Advisory Database).

## Deployment facts the assessment relies on

These were checked in code; hosting facts are taken from `README.md` / `docs/PROJECT_STATE.md` (Vercel settings live outside the repo and were not inspected).

- Hosted on **Vercel** (Linux, managed routing, Vercel's own image optimization service, host header pinned by the platform). Not Windows, not self-hosted, no custom server.
- **App Router only.** No `middleware.ts` / `proxy.ts`, no `rewrites`/`redirects`, no `i18n`, empty `next.config.ts`.
- **No Server Actions / Server Functions** (`"use server"` appears nowhere), no `use cache`, no Cache Components / PPR.
- `next/image` is used with **local, author-controlled images only** (jpg/png under `public/`); no `remotePatterns`, no AVIF sources, default formats.
- `next/script` is used for Plausible with `afterInteractive` (not `beforeInteractive`); no CSP nonces.
- Server-side `fetch` (Resend in `lib/email/verify.ts`, Neon HTTP driver) is uncached (Next 16 default `no-store`; nothing opts into caching).
- Blog markdown/frontmatter (`gray-matter` → `js-yaml`, `unified`/`mdast-util-to-hast`) is parsed at build time from repo content, not user input.

## Remediated (2026-09-25)

Patch-level / in-range updates only — no major or minor framework upgrades.

| Change | Advisories closed |
|---|---|
| `next` 16.0.7 → **16.0.11** (latest 16.0.x) | GHSA-mwv6-3258-q52c (RSC DoS, high), GHSA-h25m-26qc-wcjf (RSC deserialization DoS, high), GHSA-w37m-7fhw-fmv9 (Server Actions source exposure, moderate) — the React2Shell follow-up fixes; applicable to any App Router app |
| `postcss` (devDep) 8.5.6 → 8.5.28 | Clears the devDependency instance of GHSA-6g55-p6wh-862q, GHSA-r28c-9q8g-f849, GHSA-qx2v-qp2m-jg93, GHSA-fxqj-rqcc-2cmp (build-time only; site CSS is trusted). The copy pinned inside `next` remains — see below |
| In-range lockfile refresh of transitive deps: `mdast-util-to-hast` 13.2.1, `js-yaml` 3.15.2 / 4.3.2, `brace-expansion`, `minimatch`, `picomatch`, `glob`, `flatted`, `ajv`, `nanoid`, `browserslist`, `@babel/core`, `baseline-browser-mapping`, `@humanfs/node`, `postcss-selector-parser` | 46 advisories (ReDoS/DoS/prototype-pollution classes). All in build tooling (eslint, tailwind, babel) or build-time content parsing of trusted repo files — low real-world applicability, fixed because the update was free |

Audit went from 88 findings (2 critical / 48 high) to 39, all of which are listed below.

## Remaining findings

### `next` — 32 advisories requiring a minor upgrade (≥ 16.2.11, or ≥ 16.3.3 for the two criticals)

No 16.0.x release contains these fixes. Upgrading to 16.3.x is a **minor framework upgrade** and is HIGH risk under `CLAUDE.md`, so it was not done here; it should be its own approved task (bump `next` + `eslint-config-next` together, full build + manual route check).

**Plausibly applicable — main reason to schedule the upgrade:**

| Advisory | Severity | Why it may apply |
|---|---|---|
| GHSA-q4gf-8mx6-v5v3 (CVE-2026-23869), GHSA-8h8q-6873-q5fj (CVE-2026-23870) — RSC DoS | high | Upstream React Server Components deserialization CPU exhaustion affecting App Router apps generally. This site defines no Server Functions, which likely reduces exposure, but the RSC request path is still present; impact is availability only. Fixed in 16.2.3 / 16.2.5. |
| GHSA-wfc6-r584-vfw7, GHSA-vfv6-92ff-j949 — RSC cache poisoning | moderate / low | Depends on shared-cache partitioning. Vercel's CDN is expected to handle RSC `Vary` correctly; not verified. |

**Not materially applicable to the current code/deployment** (would become relevant if the listed feature is adopted or hosting changes):

| Advisory | Severity | Precondition not met |
|---|---|---|
| GHSA-2xp9-vwfh-vxw4 — RCE in Image Optimization (AVIF via libheif) | **critical** | Vercel serves `/_next/image` itself; no AVIF sources; no remote images. **Becomes urgent if self-hosted.** |
| GHSA-p293-qw3h-jr36 — RCE on Windows-hosted servers | **critical** | Not hosted on Windows |
| GHSA-267c-6grr-h53f, GHSA-26hh-7cqf-hhc6, GHSA-492v-c6pp-mqqv, GHSA-36qx-fr4f-26g5, GHSA-6gpp-xcg3-4w24, GHSA-3g8h-86w9-wvmq — middleware/proxy bypass & redirect poisoning | high / low | No middleware/proxy; no i18n; no auth enforced via middleware |
| GHSA-m99w-x7hq-7vfj, GHSA-89xv-2m56-2m9x, GHSA-4c39-4ccg-62r3, GHSA-955p-x3mx-jcvp, GHSA-mq59-m269-xvcx — Server Actions DoS/SSRF/payload/enumeration/CSRF | high / moderate | No Server Actions; host pinned by Vercel |
| GHSA-c4j6-fc7j-m34r — WebSocket upgrade SSRF | high | Self-hosted only; Vercel not affected |
| GHSA-p9j2-gv94-2wf4, GHSA-ggv3-7p47-pfv8 — rewrite SSRF / request smuggling | high / moderate | No rewrites/redirects |
| GHSA-mg66-mrh9-m8jx, GHSA-h27x-g6w4-24gq, GHSA-5f7q-jpqc-wp7h — PPR/Cache Components DoS | high / moderate | PPR / Cache Components not enabled |
| GHSA-h64f-5h5j-jqjh, GHSA-q8wf-6r8g-63ch, GHSA-9g9p-9gw9-jx7f, GHSA-3x4c-7xq6-9pq8 — Image Optimizer DoS / disk growth | moderate | Self-hosted default loader only; Vercel uses its own optimizer; no `remotePatterns` |
| GHSA-ffhc-5mcf-pf4q — XSS with CSP nonces | moderate | No CSP nonces |
| GHSA-gx5p-jg67-6x7h — XSS in `beforeInteractive` scripts | moderate | Only `afterInteractive` with static content |
| GHSA-68g3-v927-f742, GHSA-4633-3j49-mh5q — fetch response cache confusion | moderate | Server `fetch` is not cached |
| GHSA-jcc7-9wpm-mj36 — dev HMR websocket CSRF | low | `next dev` only; don't expose dev server to untrusted networks |

### Transitive dependencies that can't be fixed without upgrading a parent package

| Package | Via | Advisories | Assessment |
|---|---|---|---|
| `postcss` 8.4.31 | exact pin inside `next` | GHSA-6g55-p6wh-862q, GHSA-r28c-9q8g-f849, GHSA-qx2v-qp2m-jg93, GHSA-fxqj-rqcc-2cmp | Build-time processing of the site's own CSS only; not reachable with untrusted input. Not applicable. |
| `sharp` 0.34.5 | optional dep of `next` (0.35.x out of range) | GHSA-f88m-g3jw-g9cj, GHSA-rgj7-g3m4-5g8c (libvips/libheif) | Only exercised by Next's self-hosted image optimizer, with trusted local images. Not applicable on Vercel; same caveat as the AVIF critical. |
| `uuid` 10.0.0 | `resend` → `svix` (fix is uuid 11, a major) | GHSA-w5hq-g745-h8pq | Only `v3`/`v5`/`v6` with caller-supplied buffers are affected; the app doesn't call uuid, and Resend's webhook helper (svix) isn't used. Not applicable. Resolves when `resend` updates svix. |

## Recommended follow-up

1. **Next.js 16.0 → 16.3.x upgrade** (separate, explicitly approved HIGH-risk task). Closes all remaining `next` advisories, including the two criticals and the RSC DoS pair, and pulls in a newer `sharp`.
2. If hosting ever moves off Vercel, treat that upgrade as urgent: the image-optimizer RCE/DoS and several self-hosted-only advisories would then apply.
