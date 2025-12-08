import { NextRequest, NextResponse } from "next/server";
import { consumeToken } from "@/lib/email/verify";
import { sendWelcomeIssueIfNewsletter } from "@/lib/newsletter/sendWelcomeIssue";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(
      new URL("/newsletter/confirm/error?reason=missing", req.url),
    );
  }

  const result = await consumeToken(token);
  if (!result.ok) {
    const reason = result.reason === "expired" ? "expired" : "invalid";
    return NextResponse.redirect(
      new URL(`/newsletter/confirm/error?reason=${reason}`, req.url),
    );
  }

  // At this point, consumeToken has:
  // - verified the token
  // - marked the subscription as verified in app.subscriptions
  // - returned the associated email
  const email = result.email;

  // NEW: send latest Top 20 issue ONLY for newsletter subscriptions
  // (this helper is a no-op for non-newsletter sources)
  await sendWelcomeIssueIfNewsletter(email);

  return NextResponse.redirect(
    new URL("/newsletter/confirm/success", req.url),
  );
}
