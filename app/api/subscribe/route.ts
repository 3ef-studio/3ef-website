import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

// Optional: run on the Edge (fast, fetch-based driver)
export const runtime = "edge";

const EmailSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = EmailSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const { email, source } = parsed.data;

  // Build a Neon client from env
  const sql = neon(process.env.DATABASE_URL!);

  try {
    // Insert into the app.subscriptions table you created earlier
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
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Helpful logging in Vercel
    console.error("subscribe_insert_error", err);
    return NextResponse.json({ ok: false, error: "DB error" }, { status: 500 });
  }
}
