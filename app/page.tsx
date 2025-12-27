// /app/page.tsx
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

import { getLatestPosts } from "@/lib/posts";
import Hero from "@/components/Hero";

export default function HomePage() {
  const latest = getLatestPosts(3);

  return (
    <main className="space-y-12">
      <Hero />
      <section className="mx-auto max-w-5xl px-6">
        <p className="text-sm text-muted-foreground">
          An independent studio focused on building practical systems that ship and get used.
        </p>
      </section>
      {/* Current work */}
      <section className="mx-auto max-w-5xl px-6">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-text">Current work</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A few active tracks inside the studio. Each one is practical, shippable, and tied
              to real-world outcomes.
            </p>
          </div>

          <Link href="/portfolio" className="text-sm text-muted hover:opacity-80">
            View portfolio →
          </Link>
        </div>

        <ul className="grid gap-4 md:grid-cols-3">
          {/* WUA */}
          <li className="rounded-2xl bg-card p-5 shadow-soft">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Primary focus
            </div>

            <h3 className="mt-2 text-lg font-semibold text-text">
              Website Upgrade Audit (WUA)
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              An agentic website audit system for small businesses. Generates structured findings,
              evidence, and a clear upgrade plan.
            </p>

            <p className="mt-3 text-sm text-muted-foreground">
              Built to produce clear, defensible findings and a practical upgrade path.
            </p>

            <div className="mt-5 flex items-center justify-between">
              <Link
                href="/consulting"
                className="text-sm font-medium text-accent hover:opacity-90"
              >
                See consulting →
              </Link>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                Agentic audits
              </span>
            </div>
          </li>

          {/* VeilMark */}
          <li className="rounded-2xl bg-card p-5 shadow-soft">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Product
            </div>

            <h3 className="mt-2 text-lg font-semibold text-text">VeilMark</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              AI authorship detection for images and text. Built as a practical tool with a clean
              pipeline and deployable components.
            </p>

            <div className="mt-5 flex items-center justify-between">
              <Link
                href="/portfolio#veilmark"
                className="text-sm font-medium text-accent hover:opacity-90"
              >
                View project →
              </Link>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                Detection
              </span>
            </div>
          </li>

          {/* DDE */}
          <li className="rounded-2xl bg-card p-5 shadow-soft">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              System
            </div>

            <h3 className="mt-2 text-lg font-semibold text-text">
              Domain Discovery Engine (DDE)
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Agentic pipeline for discovering, scoring, and packaging brandable domains.
              Designed to produce repeatable outputs (including a newsletter workflow).
            </p>

            <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/portfolio"
                className="text-sm font-medium text-accent hover:opacity-90"
              >
                Explore DDE →
              </Link>

              <Link
                href="/newsletter/domains"
                className="text-sm font-medium text-muted-foreground hover:text-accent transition"
              >
                Domain newsletter →
              </Link>
            </div>

            <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
              Evaluation
            </span>
          </div>

          </li>
        </ul>
      </section>

      {/* Latest posts */}
      <section className="mx-auto max-w-5xl px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-text">Latest posts</h2>
          <Link href="/blog" className="text-sm text-muted hover:opacity-80">
            View all →
          </Link>
        </div>

        <ul className="grid gap-4 md:grid-cols-3">
          {latest.map((p) => (
            <li key={p.slug} className="rounded-2xl bg-card p-4">
              <div className="text-xs text-muted-foreground">
                {new Date(p.date).toLocaleDateString()}
              </div>
              <Link
                href={`/blog/${p.slug}`}
                className="mt-1 block text-lg font-medium text-text hover:opacity-90"
              >
                {p.title}
              </Link>
              {p.summary && (
                <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Newsletter target for #newsletter */}
      <section
        id="newsletter"
        className="mx-auto max-w-3xl rounded-2xl bg-card p-6 shadow-soft"
      >
        <h2 className="text-2xl font-semibold text-text">Get Updates</h2>
        <p className="mt-2 text-muted-foreground">
          Join the list for new tools, write-ups, and release notes.
        </p>
        <div className="mt-5">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
