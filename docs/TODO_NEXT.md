# Sprint 2 – Content & Newsletter
**Focus:** Publish first real content + enable subscription flow.

### Immediate Tasks
- [ ] Create real Buttondown account (`threeeaglesforge`)
- [ ] Replace placeholder form URL in `NewsletterForm.tsx`
- [ ] Add `/newsletter/success` thank-you page
- [ ] Add 2–3 real posts (VeilMark, csvClean, DDE)
- [ ] Enable Plausible analytics (NEXT_PUBLIC_PLAUSIBLE_DOMAIN)
- [ ] Add `/products` stub page linking to Payhip / Gumroad listings
- [ ] Prepare brand images / OG headers

### Optional Stretch
- [ ] Connect custom domain `3ef.studio`
- [ ] Add Framer Motion fade-in to hero & cards


🧾 Site-wide Consistency Review — TODO

Goal: Audit and align layout, spacing, and component styles across all top-level routes.

Scope checklist
 Layout widths — unify max-width (max-w-4xl vs max-w-6xl) and horizontal padding.
 Section spacing — normalize vertical rhythm (py-12 / space-y-* scale).
 Typography hierarchy — ensure consistent text-3xl / text-xl / text-muted-foreground usage.
 Card style — match corner radius, shadow, and background tokens (bg-card, shadow-soft).
 CTA buttons — consistent radius, color, and hover treatment.
 Metadata titles/descriptions — uniform sentence case and meta length.
 Header/Footer — confirm all nav links share same order and typography.
 Dark/light mode parity — spot-check contrast ratios.
 OG images / SEO tags — ensure all top-level pages export proper metadata.

Output:

1–2 design tokens or utility presets updated in /lib/site.ts or global Tailwind config.
Minor className tweaks on /products, /projects, /consulting, and /blog.
