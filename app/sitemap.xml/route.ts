import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/site";

export async function GET() {
  const posts = getAllPosts();
  const urls = [
    { loc: SITE.url, changefreq: "weekly", priority: "1.0" },
    { loc: `${SITE.url}/blog`, changefreq: "weekly", priority: "0.8" },
    { loc: `${SITE.url}/about`, changefreq: "yearly", priority: "0.5" },
    ...posts.map(p => ({
      loc: `${SITE.url}/blog/${p.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: new Date(p.date).toISOString(),
    })),
  ];

  const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `
  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

