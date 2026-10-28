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

// Always returned on "nothing to see here" paths (honeypot trip, cooldown
// hit) as well as real success, so the response body never distinguishes
// a detected bot/duplicate from a genuine first-time subscription.
const GENERIC_SUCCESS = { ok: true, message: "Check your email to confirm." };

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = EmailSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const { email, source, honeypot } = parsed.data;
  // Honeypot — a real visitor never populates this hidden field (see
  // NewsletterForm.tsx / DDENewsletterForm.tsx). Respond exactly as a
  // normal successful submission would, but skip all real work.
  if (honeypot) return NextResponse.json(GENERIC_SUCCESS);

  const sql = neon(process.env.DATABASE_URL!);

  try {
    // Per-recipient cooldown: createAndStoreToken() always replaces any
    // prior token for this email, so without this check a repeated
    // submission would send a fresh verification email every time,
    // regardless of whether the address ever confirms — a way to spam a
    // third party's inbox or burn Resend quota. Skip re-sending while a
    // still-valid token is already outstanding for this address.
    const existingToken = await sql`
      SELECT 1 FROM app.email_verification_tokens
      WHERE email = ${email} AND expires_at > now()
      LIMIT 1
    `;
    if (existingToken.length > 0) {
      return NextResponse.json(GENERIC_SUCCESS);
    }

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
    return NextResponse.json(GENERIC_SUCCESS);
  } catch (err) {
    console.error("subscribe_insert_error", err);
    return NextResponse.json({ ok: false, error: "DB error" }, { status: 500 });
  }
}
