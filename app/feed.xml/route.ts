import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/site";

export async function GET() {
  const items = getAllPosts().map(p => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${SITE.url}/blog/${p.slug}</link>
      <guid>${SITE.url}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${p.summary ? `<description><![CDATA[${p.summary}]]></description>` : ""}
    </item>
  `).join("");

  const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title><![CDATA[${SITE.name}]]></title>
  <link>${SITE.url}</link>
  <description><![CDATA[${SITE.description}]]></description>
  <language>en</language>
  ${items}
</channel>
</rss>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
