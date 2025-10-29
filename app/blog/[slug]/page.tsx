import fs from "node:fs";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { getAllPostSlugs, getPostMeta, resolvePostFile } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

// ✅ Guard against missing params during certain prerender phases
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) {
    return { title: "Post — 3EF Studio", description: "" };
  }
  try {
    const meta = getPostMeta(slug);
    return {
      title: `${meta.title} — 3EF Studio`,
      description: meta.summary ?? "",
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
    <article className="prose">
      <h1>{data.title ?? slug}</h1>
      {data.date && (
        <p className="text-sm text-muted">
          {new Date(data.date as string).toLocaleDateString()}
        </p>
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
