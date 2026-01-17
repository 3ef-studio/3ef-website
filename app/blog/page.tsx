// app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = { title: "Blog — 3EF Studio" };

export default function BlogPage() {
  const posts = getAllPosts();

  // Manually curate 2–3 strong evergreen posts by slug
  const recommendedSlugs = [
    "what-3ef-is",
    "why-small-biz-sites-underperform",
  ];

  const recommended = posts.filter((p) =>
    recommendedSlugs.includes(p.slug)
  );

  const remaining = posts.filter(
    (p) => !recommendedSlugs.includes(p.slug)
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-foreground">Writing</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Notes from the forge on agentic systems, website audits, and building
          practical tools that ship and get used.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        {/* -------- Main content -------- */}
        <div className="space-y-10">
          {/* Recommended */}
          {recommended.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Start here
              </h2>

              <ul className="space-y-4">
                {recommended.map((p) => (
                  <li key={p.slug} className="rounded-2xl bg-card p-4 shadow-soft">
                    <div className="text-xs text-muted-foreground">
                      {new Date(p.date).toLocaleDateString()}
                    </div>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-xl font-medium text-foreground hover:opacity-90"
                    >
                      {p.title}
                    </Link>
                    {p.summary && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {p.summary}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Latest */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Latest posts
            </h2>

            {remaining.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No additional posts yet.
              </p>
            )}

            {remaining.length > 0 && (
              <ul className="space-y-4">
                {remaining.map((p) => (
                  <li
                    key={p.slug}
                    className="rounded-2xl bg-card p-4 shadow-soft"
                  >
                    <div className="text-xs text-muted-foreground">
                      {new Date(p.date).toLocaleDateString()}
                    </div>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-lg font-medium text-foreground hover:opacity-90"
                    >
                      {p.title}
                    </Link>
                    {p.summary && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {p.summary}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* -------- Sidebar -------- */}
        <aside className="space-y-4">
          <div className="rounded-2xl bg-card p-4 shadow-soft">
            <h2 className="text-sm font-semibold text-foreground">
              DDE Weekly Top Domains
            </h2>
            <p className="mt-2 text-xs text-muted-foreground">
              A weekly list of currently available brandable domains discovered
              by the Domain Discovery Engine.
            </p>
            <Link
              href="/newsletter/domains"
              className="mt-3 inline-block rounded-xl bg-accent px-4 py-2 text-xs font-medium text-black shadow-sm hover:opacity-90 transition"
            >
              View Weekly Top Domains
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-background p-4">
            <p className="text-xs text-muted-foreground">
              Looking for help with a website or audit?
            </p>
            <Link
              href="/consulting"
              className="mt-2 inline-block text-sm font-medium text-accent hover:brightness-110 transition"
            >
              See consulting →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
