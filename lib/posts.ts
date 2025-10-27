import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;      // ISO string
  summary?: string;
  tags?: string[];
  status?: "published" | "draft";
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getLatestPosts(count = 3) {
  return getAllPosts().slice(0, count);
}

export function getAllPostSlugs() {
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPostMeta(slug: string): PostMeta {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    summary: data.summary ?? "",
    tags: data.tags ?? [],
    status: data.status ?? "published",
  };
}

export function getAllPosts(): PostMeta[] {
  return getAllPostSlugs()
    .map(getPostMeta)
    .filter((p) => p.status !== "draft")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
