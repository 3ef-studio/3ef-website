// app/api/lead/route.ts
import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { sendLeadConfirm } from "@/lib/email/leadConfirm";
import { z } from "zod";

export const runtime = "nodejs"; // full Node APIs, generous limits

const LeadSchema = z.object({
  name: z.string().trim().max(120).optional(),
  email: z.string().email(),
  message: z.string().trim().max(4000).optional(),
  source: z.string().trim().max(120).optional(),
  // honeypot (should be an empty string if a real human)
  company: z.string().optional(),
});

export async function POST(req: NextRequest) {
  // parse + validate payload
  const body = await req.json().catch(() => null);
  const parsed = LeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid payload" },
      { status: 400 },
    );
  }

  const { name, email, message, source, company } = parsed.data;

  // honeypot trap: if filled, accept quietly but do nothing
  if (company && company.trim().length > 0) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql/* sql */`
      INSERT INTO app.leads (name, email, message, source, referer, user_agent)
      VALUES (
        ${name ?? null},
        ${email},
        ${message ?? null},
        ${source ?? "consulting_page"},
        ${req.headers.get("referer")},
        ${req.headers.get("user-agent")}
      )
    `;

    // success
    sendLeadConfirm({ to: email, name }).catch((e) =>
        console.error("lead_confirm_background_error", e)
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("lead_insert_error", err);
    return NextResponse.json(
      { ok: false, error: "DB error" },
      { status: 500 },
    );
  }
}
