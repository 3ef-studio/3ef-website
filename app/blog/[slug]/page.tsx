// app/blog/[slug]/page.tsx
import fs from "node:fs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import {
  getAllPostSlugs,
  getPostMeta,
  resolvePostFile,
} from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) return { title: "Post — 3EF Studio", description: "" };

  try {
    const meta = getPostMeta(slug);
    return {
      title: `${meta.title} — 3EF Studio`,
      description: meta.summary ?? "",
      openGraph: {
        title: meta.title,
        description: meta.summary ?? "",
        url: `/blog/${slug}`,
        ...(meta.image ? { images: [{ url: meta.image }] } : {}),
      },
    };
  } catch {
    return { title: "Post — 3EF Studio", description: "" };
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) return notFound();

  const file = resolvePostFile(slug);
  if (!file) return notFound();

  const raw = fs.readFileSync(file, "utf8");
  const { content, data } = matter(raw);
  const html = await markdownToHtml(content);

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 space-y-12">
      {/* Header */}
      <header className="space-y-3 max-w-2xl">
        <Link
          href="/blog"
          className="text-xs text-muted-foreground hover:text-accent transition"
        >
          ← Back to writing
        </Link>

        <h1 className="text-3xl font-semibold">
          {(data.title as string) ?? slug}
        </h1>

        {data.date && (
          <p className="text-sm text-muted-foreground">
            {new Date(data.date as string).toLocaleDateString()}
          </p>
        )}

        {data.summary && (
          <p className="text-muted-foreground">
            {data.summary as string}
          </p>
        )}
      </header>

      {/* Content */}
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] items-start">
        <div className="prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>

        {(data.image as string | undefined) && (
          <aside className="sticky top-24 self-start rounded-2xl overflow-hidden border border-white/5 bg-card">
            <Image
              src={data.image as string}
              alt={
                (data.imageAlt as string) ??
                (data.title as string) ??
                slug
              }
              width={1400}
              height={936}
              className="w-full h-auto object-cover aspect-[3/4]"
              sizes="(min-width: 768px) 420px, 100vw"
            />
          </aside>
        )}
      </div>

      {/* Continue exploring */}
      <section className="rounded-2xl border border-border bg-background p-6 space-y-4">
        <h2 className="text-lg font-semibold">Continue exploring</h2>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Link
            href="/blog"
            className="text-sm font-medium text-accent hover:brightness-110 transition"
          >
            More writing →
          </Link>
          <Link
            href="/portfolio"
            className="text-sm text-muted-foreground hover:text-accent transition"
          >
            View projects →
          </Link>
          <Link
            href="/consulting"
            className="text-sm text-muted-foreground hover:text-accent transition"
          >
            Website audits & consulting →
          </Link>
        </div>
      </section>
    </article>
  );
}
