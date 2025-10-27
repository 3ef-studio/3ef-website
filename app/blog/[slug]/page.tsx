import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostMeta } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const meta = getPostMeta(params.slug);
  return { title: `${meta.title} — 3EF Studio`, description: meta.summary ?? "" };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const file = path.join(process.cwd(), "content", "blog", `${params.slug}.mdx`);
  if (!fs.existsSync(file)) return notFound();

  const raw = fs.readFileSync(file, "utf8");
  const { content, data } = matter(raw);
  const html = await markdownToHtml(content);

  return (
    <article className="prose">
      <h1>{data.title}</h1>
      <p className="text-sm text-muted">{new Date(data.date).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
