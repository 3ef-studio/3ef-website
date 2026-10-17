# Design: Homepage "Latest on X" Pane

**Status:** Proposed — designed, not implemented. Nothing described here exists in code yet.
**Risk tier (per `CLAUDE.md`):** MEDIUM — homepage layout change. Requires explicit go-ahead before implementation.
**Last updated:** 2026-10-17

## Goal

Show the most recent post from the 3EF X account (`@3EF_Studio`) on the homepage, including its image when the post has one.

## Decision: manual JSON, not the X API

Three approaches were considered:

| Option | Summary | Outcome |
|---|---|---|
| **X API v2 (server-side fetch)** | Server component fetches latest post, cached via ISR | **Rejected** — see cost notes below |
| **Official X embed (`widgets.js`)** | X's embed script renders the post | **Rejected** — still needs the post ID, loads X's third-party tracking JS/cookies (at odds with the lightweight Plausible-only analytics setup), adds layout shift, and X embeds have been unreliable since 2023 |
| **Hand-maintained JSON** | Author updates a small JSON file after posting; site renders it at build time | **Chosen** |

### Why not the API (cost notes, as researched Oct 2026)

- X has no free read tier. It is pay-per-use: prepaid credits in the X Developer Console, deducted per resource returned. Legacy Basic/Pro subscriptions exist only for prior subscribers.
- Reads are ~$0.005 per post returned (one rate card lists ~$0.001 for reading your own posts). The user-timeline endpoint returns a minimum of 5 posts, so one refresh ≈ $0.025.
- Worst-case monthly cost by refresh interval: hourly ≈ $18, every 6h ≈ $3, daily ≈ $0.75. Real cost is lower on a low-traffic site because ISR only refetches when a visitor arrives after the cache expires.
- Beyond cost: requires an X developer account, a `X_BEARER_TOKEN` secret in Vercel, a new external integration (HIGH risk tier), and exposure to frequent X pricing changes. Not judged worth it for a single homepage card.
- Figures came from third-party pricing guides, not X's official docs — re-verify if this decision is ever revisited.

## Update workflow (after posting on X)

1. Post on X as normal.
2. Copy the post link (Share → Copy link) and the post text.
3. **If the post has an image:** open the image on X, save it, and add it to the repo as `public/x/<post-id>.jpg` (the post ID is the trailing number in the link). Via the GitHub web UI: navigate to `public/x/` → Add file → Upload files. Delete the previous post's image in the same commit.
4. Update `data/x-latest.json` (see schema below).
5. Commit to `main`. Vercel redeploys; the pane updates within a couple of minutes.

If an update is skipped, the pane simply keeps showing the previous post with its date — nothing breaks. The update can also be delegated to a Claude Code session ("update the X pane with this post: <link> <text>", plus the image).

## Data file: `data/x-latest.json`

```json
{
  "url": "https://x.com/3EF_Studio/status/1846123456789012345",
  "text": "Shipped the first pass of the WUA findings report today.\n\nWrite-up on the blog soon.",
  "postedAt": "2026-10-17T14:32:00Z",
  "image": {
    "src": "/x/1846123456789012345.jpg",
    "alt": "Screenshot of the WUA findings report showing three upgrade recommendations"
  },
  "show": true
}
```

| Field | Required | Notes |
|---|---|---|
| `url` | yes | Must be an `x.com`/`twitter.com` status URL. The post ID is derived from it. |
| `text` | yes | Copied verbatim. `\n` line breaks preserved; URLs in the text are linkified. Rendered as plain text — never as raw HTML. |
| `postedAt` | yes | ISO date or datetime. Displayed as e.g. "Oct 17, 2026". |
| `image` | no | Omit entirely for text-only posts. |
| `image.src` | if `image` | Path under `public/`, must start with `/x/`. |
| `image.alt` | if `image` | Required for accessibility. Reuse the post's alt text from X if present; otherwise write one descriptive line. |
| `show` | no | Defaults to `true`. `false` hides the pane entirely. |

Deliberately **not** included:
- **Handle / profile URL** — sourced from site config (alongside the existing `@3EF_Studio` reference in `app/layout.tsx`), not retyped per post.
- **Likes / reposts / view counts** — would be stale the moment they were typed.

### Build-time validation

`lib/x.ts` validates the file with `zod` (already a dependency) and checks that `image.src` exists on disk under `public/`. A malformed file or missing image **fails the build**, so Vercel keeps serving the last good deployment rather than a broken pane.

## Image handling

**Chosen: commit the image to the repo (`public/x/`).**

- Durable — survives X changing CDN URLs or the post being deleted.
- No `next.config.ts` change (no remote image domains).
- `next/image` handles resizing/format conversion, so saving the full-size image from X is fine.

**Alternative (not chosen for v1):** set `image.src` to the `pbs.twimg.com` image URL instead of downloading. Removes the download/upload step but requires adding `pbs.twimg.com` to `images.remotePatterns` and depends on X keeping the image available. Easy to add later if the manual image step proves tedious.

## Layout

New homepage section placed **between "Latest posts" and "Get Updates"** in `app/page.tsx`, using the existing card style (`rounded-2xl bg-card shadow-soft`) and the `mx-auto max-w-5xl px-6` section container.

Desktop, with image:

```
 Latest on X                                        Follow @3EF_Studio →
┌──────────────────────────────────────────────────────────────────────┐
│ [logo] 3EF Studio  @3EF_Studio · Oct 17, 2026  │ ┌──────────────────┐ │
│                                                │ │                  │ │
│ Shipped the first pass of the WUA findings     │ │      image       │ │
│ report today.                                  │ │      (16:9)      │ │
│                                                │ │                  │ │
│ Write-up on the blog soon.                     │ └──────────────────┘ │
│                                                │                      │
│ View on X →                                    │                      │
└──────────────────────────────────────────────────────────────────────┘
        text column, about 3/5                     image column, about 2/5
```

Mobile, or a post without an image:

```
┌──────────────────────────────┐
│ ┌──────────────────────────┐ │   ← image on top (only if there is one)
│ │       image (16:9)       │ │
│ └──────────────────────────┘ │
│ [logo] 3EF Studio · Oct 17   │
│ Shipped the first pass of…   │
│ View on X →                  │
└──────────────────────────────┘
```

Behavior:

- Image sits in a fixed **16:9 frame with `object-cover`** (same cropping X uses in-timeline). No layout shift and no need to record image dimensions in the JSON.
- Image and "View on X →" both open the post in a new tab (`target="_blank" rel="noopener noreferrer"`).
- Text clamps at ~6 lines on desktop / ~8 on mobile.
- Avatar is the existing logo from `public/logo/` — looks like a post without loading anything from X.
- `show: false` → section not rendered at all.
- Homepage stays fully static; no runtime fetches.

## Files (when implemented)

| File | Change |
|---|---|
| `data/x-latest.json` | New — the post data |
| `public/x/` | New — holds the current post's image |
| `lib/x.ts` | New — load + `zod` validation + image-exists check |
| `components/LatestXPost.tsx` | New — renders the card (server component) |
| `app/page.tsx` | Add the section |
| `README.md`, `docs/PROJECT_STATE.md` | Document the pane and update workflow |
| `docs/INTEGRATIONS.md` | One line: X pane is manually maintained, not an integration |

No new dependencies, environment variables, or external calls.

## Out of scope for v1

- **Multi-image posts** (X allows up to 4) — show the first image only, with a small "+N on X" badge.
- **Video/GIF posts** — save a still frame as the image; a play-icon overlay could be added later.
- **Engagement metrics** — intentionally excluded.

## Optional future enhancement

A local helper script (e.g. `pnpm x:update <url>`) could use X's free, keyless oEmbed endpoint (`publish.twitter.com/oembed`) to fill in `text` and `postedAt` from just the link. It must run locally, never at build time, since X could change or restrict that endpoint at any time. Only worth adding if copying text by hand becomes tedious.

## Open decisions (resolve before building)

1. **Placement** — between "Latest posts" and "Get Updates" (recommended) or elsewhere?
2. **Image crop** — fixed 16:9 `object-cover` (recommended) vs. natural aspect ratio (requires `width`/`height` in the JSON)?
3. **Old images** — delete the previous image with each update (recommended) or keep a history in `public/x/`?
4. **Positioning** — confirm a social-feed element on the homepage fits the "personal project laboratory" framing in `docs/SITE_STRATEGY.md`.
