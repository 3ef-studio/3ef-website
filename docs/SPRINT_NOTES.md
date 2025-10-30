# Sprint 1 – Planning → Setup → Deploy
**Dates:** 2025-10-27 → 2025-10-28  
**Goal:** Establish core 3EF website stack and deploy first live version.

---

## ✅ Key Decisions
| Area | Decision | Notes |
|------|-----------|-------|
| Newsletter | **Buttondown** | Free → 100 subs, upgrade later. |
| Analytics | **Plausible** | Phase 2 integration. |
| Domain | **3ef.studio** | Keep short; purchase later. |
| Hosting | **Vercel (Next 16)** | Zero-config, fast CI/CD. |
| Styling | **Tailwind v3 + shadcn/ui + Lucide** | Dark-first tokens; extend later. |
| Content | **Local Markdown (.mdx/.md)** | Simpler than `next-mdx-remote`; supports build-time rendering. |

---

## 🏗️ Work Completed
- Repo scaffolded → `3ef-website`  
- Tailwind tokens + dark theme verified  
- shadcn/ui installed (Button, Card, Input, Badge, etc.)  
- Header / Footer / Hero / Newsletter form added  
- Blog pipeline (Markdown → HTML)  
- SEO routes → `sitemap.xml`, `robots.txt`, `feed.xml`  
- Deployed to Vercel (`https://3ef-website.vercel.app`)

---

## 🧩 Lessons / Notes
- Next 16 dynamic routes require `await params` in `generateMetadata` and page components.  
- Case-sensitive filenames matter on Vercel.  
- Stick to Tailwind v3 until v4 stabilizes across frameworks. 
- Struggled getting tailwind installed properrly - extended effort to 2+ hours instead of 90 min 

---

## 🔖 Version
**Sprint 1 Tag:** `v0.1.0-site-mvp`  
Next Sprint → Content & Newsletter integration.

**Sprint 0.2**  Brand Context & Tokens ✅ (Complete)

Goal: Establish the 3EF Studio brand system and dark-first visual baseline.
Duration: 3 micro sprints (0.2a → 0.2c)
Outcome: All brand tokens wired end-to-end; live dark-theme verified on Vercel.

Key Deliverables

/config/context.yml → source of truth for brand tokens (colors, fonts, flags).
tailwind.config.cjs → HSL variable mapping + typography invert overrides.
app/globals.css → dark-first HSL palette, shadcn-compatible tokens, card & button helpers.
layout.tsx → uses bg-background text-foreground with Geist fonts.
Updated blog/page.tsx → text-foreground / text-muted-foreground.
Updated Footer.tsx → legible text-muted-foreground.
Environment-safe SITE.url fix for metadata (Vercel deploy).

Verification
- All pages render in dark theme with correct foreground contrast.
- Buttons show teal primary color and readable text.
- Blog / Footer text legible (text-foreground, text-muted-foreground).
- Vercel build passes (/_not-found URL error resolved).

Commits

feat(theme): complete Sprint 0.2 brand tokens + dark palette alignment
fix(meta): ensure absolute site URL with protocol for metadataBase
