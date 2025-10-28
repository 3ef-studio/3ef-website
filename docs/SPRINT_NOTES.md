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
