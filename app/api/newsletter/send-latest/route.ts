import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import fs from "node:fs/promises";
import path from "node:path";
import { Resend } from "resend";

export const runtime = "nodejs";

const sql = neon(process.env.DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY!);

// Must match whatever your newsletter signup form passes as `source`
const NEWSLETTER_SOURCE =
  process.env.NEWSLETTER_SOURCE ?? "dde-newsletter";

// Shared secret for manual trigger (set in Vercel env)
const MANUAL_TOKEN = process.env.NEWSLETTER_MANUAL_TOKEN;

const FROM_EMAIL =
  process.env.NEWSLETTER_FROM_EMAIL ?? "3EF Studio <newsletter@3ef.studio>";
const SUBJECT =
  process.env.NEWSLETTER_LATEST_SUBJECT ??
  "3EF Domain Discovery — Latest Top 20";

async function readLatestIssueHtml(): Promise<string | null> {
  try {
    const issuePath = path.join(
      process.cwd(),
      "data",
      "dde",
      "latest",
      "issue.html",
    );
    const html = await fs.readFile(issuePath, "utf8");
    return html;
  } catch (err) {
    console.error("[send-latest] Failed to read latest issue HTML:", err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  // 1️⃣ Auth via shared secret header
  const token = req.headers.get("x-newsletter-token");
  if (!MANUAL_TOKEN || !token || token !== MANUAL_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  // 2️⃣ Load latest issue HTML
  const issueHtml = await readLatestIssueHtml();
  if (!issueHtml) {
    return NextResponse.json(
      {
        ok: false,
        error: "Latest issue HTML not found. Ensure data/dde/latest/issue.html exists.",
      },
      { status: 500 },
    );
  }

  // 3️⃣ Fetch newsletter subscribers
  let rows: { email: string }[];

  try {
    const result = await sql/* sql */`
      SELECT email
      FROM app.subscriptions
      WHERE source = ${NEWSLETTER_SOURCE}
    `;

    rows = result as { email: string }[];
  } catch (err) {
    console.error("[send-latest] Failed to query subscriptions:", err);
    return NextResponse.json(
      { ok: false, error: "DB error" },
      { status: 500 },
    );
  }

  if (!rows.length) {
    return NextResponse.json({
      ok: true,
      sent: 0,
      failed: 0,
      message: "No newsletter subscribers found.",
    });
  }


  // 4️⃣ Send the issue to all subscribers
  let sent = 0;
  let failed = 0;

  const results = await Promise.allSettled(
    rows.map((row) =>
      resend.emails.send({
        from: FROM_EMAIL,
        to: row.email,
        subject: SUBJECT,
        html: issueHtml,
      }),
    ),
  );

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      sent += 1;
    } else {
      failed += 1;
      console.error("[send-latest] Failed to send to one subscriber:", result.reason);
    }
  });

  return NextResponse.json({
    ok: true,
    sent,
    failed,
  });
}
