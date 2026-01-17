import type { Metadata } from "next";
import Image from "next/image";
import ForgeActivity from "@/components/ForgeActivity";

export const metadata: Metadata = {
  title: "About | Three Eagles Forge Studio",
  description:
    "Three Eagles Forge Studio is an independent studio focused on practical website audits, strategy, and applied AI—designed to clarify what to fix next and why.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-4 py-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 text-center sm:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 left-8 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background/70" />
        </div>

        <div className="relative space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            An IT Studio Focused on Small Businesses and Practical Website Improvements
          </h1>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Three Eagles Forge Studio (3EF) is an independent builder studio focused on
            helping small businesses understand what is actually worth fixing—on their
            website, in their workflows, and across their digital systems.
          </p>

          <p className="text-xs text-muted-foreground">
            Chicago / Remote · Focused work · No long-term retainers unless they clearly make sense
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">What 3EF Focuses On</h2>

        <p className="text-sm text-muted-foreground">
          3EF focuses on understanding where small business websites quietly underperform and what to fix first. The work typically begins with a structured audit and may lead to targeted improvements or advisory work when it clearly makes sense.
        </p>

        <ul className="grid gap-6 md:grid-cols-2">
          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <h3 className="text-base font-semibold">Website Audits</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Clear, structured audits that surface usability, performance, conversion, and workflow issues.
            </p>
          </li>

          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <h3 className="text-base font-semibold">Prioritization & Direction</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Helping owners decide what to fix now, what can wait, and what is not worth investing in.
            </p>
          </li>

          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <h3 className="text-base font-semibold">Targeted Follow‑On Work</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Focused improvements such as conversion fixes, light automation, or right‑sized rebuilds.
            </p>
          </li>

          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <h3 className="text-base font-semibold">Internal Tools & Applied AI</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Purpose‑built tools and AI systems that support analysis, experimentation, and delivery.
            </p>
          </li>
        </ul>
      </section>

      {/* How We Work */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How the Studio Operates</h2>

        <p className="text-sm text-muted-foreground">
          The studio operates with the same principles used in client work: small scopes,
          fast feedback, and visible progress. Every engagement starts with understanding
          before execution.
        </p>

        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Audit before building or redesigning</li>
          <li>Prioritize impact over surface-level polish</li>
          <li>Ship in small, reversible steps</li>
          <li>Document tradeoffs and decisions</li>
        </ul>
      </section>

      {/* Logo + Identity */}
      <section className="grid gap-8 md:grid-cols-[1fr_240px] items-center">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">About the Name</h2>
          <p className="text-sm text-muted-foreground">
            Three Eagles Forge reflects how the work is approached: ideas are shaped in
            the forge through constraint and iteration, then released only when they are
            ready to stand on their own.
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative h-40 w-40 rounded-3xl border border-white/10 bg-card/80 shadow-lg shadow-black/40 overflow-hidden">
            <Image
              src="/images/logo.jpg"
              alt="Three Eagles Forge Studio logo"
              fill
              className="object-contain p-6"
              priority
            />
          </div>
        </div>
      </section>

      <ForgeActivity />
    </div>
  );
}
