import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { getLatestPosts } from "@/lib/posts";

export default function HomePage() {
  const latest = getLatestPosts(3);

  return (
    <div className="py-10 space-y-10">
      {/* Hero */}
      <section className="rounded-2xl bg-card shadow-soft p-6">
        <h1 className="text-3xl font-semibold">Three Eagles Forge Studio</h1>
        <p className="text-muted-foreground mt-2">
          Indie AI tools, domain experiments, and build-in-public notes.
        </p>
        <div className="mt-5">
          <NewsletterForm />
        </div>
      </section>
      {/* Latest posts */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Latest posts</h2>
          <Link href="/blog" className="text-sm text-muted hover:opacity-80">View all →</Link>
        </div>

        <ul className="grid gap-4 md:grid-cols-3">
          {latest.map((p) => (
            <li key={p.slug} className="rounded-2xl bg-card p-4">
              <div className="text-xs text-muted-foreground">
                {new Date(p.date).toLocaleDateString()}
              </div>
              <Link href={`/blog/${p.slug}`} className="block mt-1 text-lg font-medium hover:opacity-90">
                {p.title}
              </Link>
              {p.summary && <p className="text-muted-foreground mt-1 text-sm">{p.summary}</p>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
