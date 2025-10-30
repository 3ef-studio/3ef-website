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

      {/* Newsletter target for #newsletter */}
      <section id="newsletter" className="mx-auto max-w-3xl rounded-2xl bg-card p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-text">Get Updates</h2>
        <p className="mt-2 text-muted-foreground">
          Join the list for new tools, write-ups, and release notes.
        </p>
        <div className="mt-5">
          <NewsletterForm />
        </div>
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
    </main>
  );
}
