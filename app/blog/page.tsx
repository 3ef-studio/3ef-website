import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = { title: "Blog — 3EF Studio" };

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug} className="rounded-2xl bg-card p-4">
            <div className="text-sm text-muted">{new Date(p.date).toLocaleDateString()}</div>
            <Link href={`/blog/${p.slug}`} className="text-xl font-medium hover:opacity-90">
              {p.title}
            </Link>
            {p.summary && <p className="mt-1 text-muted">{p.summary}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
