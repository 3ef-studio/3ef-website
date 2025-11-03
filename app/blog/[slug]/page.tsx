import fs from "node:fs";
import Image from "next/image";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { getAllPostSlugs, getPostMeta, resolvePostFile } from "@/lib/posts";
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
    <article className="py-6">
      {/* Header */}
      <header className="space-y-2 mb-6">
        <h1 className="text-3xl font-semibold">{(data.title as string) ?? slug}</h1>
        {data.date && (
          <p className="text-sm text-white/60">
            {new Date(data.date as string).toLocaleDateString()}
          </p>
        )}
        {data.summary && (
          <p className="text-muted-foreground max-w-2xl">{data.summary as string}</p>
        )}
        {Array.isArray(data.tags) && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {(data.tags as string[]).map((t) => (
              <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-white/5 text-white/80">
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Two-column: article + right-side image */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] items-start">
        <div className="prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>

        {(data.image as string | undefined) && (
          <aside className="sticky top-20 self-start rounded-2xl overflow-hidden border border-white/5 bg-card">
            <Image
              src={data.image as string}
              alt={(data.imageAlt as string) ?? (data.title as string) ?? slug}
              width={1400}
              height={936}
              className="w-full h-auto object-cover aspect-[3/4]"
              sizes="(min-width: 768px) 420px, 100vw"
              priority={false}
            />
          </aside>
        )}
      </div>
    </article>
  );
}
