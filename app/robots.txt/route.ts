import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${SITE.url}/sitemap.xml`,
  ].join("\n");

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
