import { NextRequest, NextResponse } from "next/server";
import { consumeToken } from "@/lib/email/verify";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/newsletter/confirm/error?reason=missing", req.url));

  const result = await consumeToken(token);
  if (!result.ok) {
    const reason = result.reason === "expired" ? "expired" : "invalid";
    return NextResponse.redirect(new URL(`/newsletter/confirm/error?reason=${reason}`, req.url));
  }
  return NextResponse.redirect(new URL("/newsletter/confirm/success", req.url));
}
