import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  status?: "published" | "draft";
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPostSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

/** Try .mdx first, then .md; return absolute path or null */
export function resolvePostFile(slug: string): string | null {
  const mdx = path.join(BLOG_DIR, `${slug}.mdx`);
  if (fs.existsSync(mdx)) return mdx;
  const md = path.join(BLOG_DIR, `${slug}.md`);
  if (fs.existsSync(md)) return md;
  return null;
}

export function getPostMeta(slug: string): PostMeta {
  const file = resolvePostFile(slug);
  if (!file) {
    // throw to let callers decide how to handle (notFound, default metadata, etc.)
    throw new Error(`Post file not found for slug "${slug}"`);
  }
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
    .map((s) => {
      try {
        return getPostMeta(s);
      } catch {
        return null;
      }
    })
    .filter((x): x is PostMeta => Boolean(x))
    .filter((p) => p.status !== "draft")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Convenience for Home */
export function getLatestPosts(count = 3) {
  return getAllPosts().slice(0, count);
}
