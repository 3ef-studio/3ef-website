// app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = { title: "Blog — 3EF Studio" };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-semibold text-foreground">Blog</h1>

      <div className="grid gap-10 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        {/* -------- Main posts list -------- */}
        <div className="space-y-4">
          {posts.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No posts yet. Once articles are published, you&apos;ll see them
              here.
            </p>
          )}

          {posts.length > 0 && (
            <ul className="space-y-4">
              {posts.map((p) => (
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
          )}
        </div>

        {/* -------- Sidebar: DDE newsletter CTA -------- */}
        <aside className="space-y-4">
          <div className="rounded-2xl bg-card p-4 shadow-soft">
            <h2 className="text-sm font-semibold text-foreground">
              DDE Weekly Top Domains
            </h2>
            <p className="mt-2 text-xs text-muted-foreground">
              A weekly list of currently available brandable domains discovered
              by the 3EF Domain Discovery Engine. See this week&apos;s Top 5
              and subscribe for the full shortlist.
            </p>
            <Link
              href="/newsletter/domains"
              className="mt-3 inline-block rounded-xl bg-accent px-4 py-2 text-xs font-medium text-black shadow-sm hover:opacity-90 transition"
            >
              View Weekly Top Domains
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
