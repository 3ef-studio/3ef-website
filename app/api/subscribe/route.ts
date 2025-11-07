import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";
import { createAndStoreToken, sendVerificationEmail } from "@/lib/email/verify";

// Optional: run on the Edge (fast, fetch-based driver)
export const runtime = "nodejs";

const EmailSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
  honeypot: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = EmailSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const { email, source, honeypot } = parsed.data;
  if (honeypot) return NextResponse.json({ ok: true, skipped: true }); // simple spam trap

  const sql = neon(process.env.DATABASE_URL!);

  try {
    // 1️⃣ Soft-insert subscription record
    await sql/* sql */`
      INSERT INTO app.subscriptions (email, source, referer, ip, user_agent)
      VALUES (
        ${email},
        ${source ?? null},
        ${req.headers.get("referer")},
        ${req.headers.get("x-forwarded-for") ?? null},
        ${req.headers.get("user-agent")}
      )
      ON CONFLICT (LOWER(email)) DO NOTHING
    `;

    // 2️⃣ Create one-time verification token
    const token = await createAndStoreToken(email, 60);

    // 3️⃣ Send confirmation email via Resend
    await sendVerificationEmail(email, token);

    // 4️⃣ Return success to the client
    return NextResponse.json({ ok: true, message: "Check your email to confirm." });
  } catch (err) {
    console.error("subscribe_insert_error", err);
    return NextResponse.json({ ok: false, error: "DB error" }, { status: 500 });
  }
}
