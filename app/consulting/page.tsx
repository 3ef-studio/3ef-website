// app/consulting/page.tsx
import ClientEvent from "@/components/ClientEvent";
import CtaTrack from "@/components/CtaTrack";
import LeadForm from "@/components/LeadForm";
import {
  LayoutTemplate,
  Wand2,
  Compass,
  Zap,
  Smartphone,
  ShieldCheck,
  LineChart,
} from "lucide-react";

export const metadata = {
  title: "Website Audits, Upgrades & Automation | 3EF Studio Consulting",
  description:
    "Start with a website audit, then take the smallest next step that actually improves results: conversion fixes, automation, smart upgrades, or clear strategy.",
  alternates: { canonical: "/consulting" },
};

function EngagementProcessDiagram() {
  const steps = [
    {
      title: "1) Start",
      subtitle: "Audit",
      body: "Choose a quick automated audit or a guided Website + Process Audit.",
    },
    {
      title: "2) Triage",
      subtitle: "Prioritize",
      body: "We identify the highest-impact issues and opportunities across web and workflow.",
    },
    {
      title: "3) Plan",
      subtitle: "Right-sized Scope",
      body: "You see options. These may include conversion fixes, automation, or a simple roadmap.",
    },
    {
      title: "4) Deliver",
      subtitle: "Focused Work",
      body: "We execute a tight scope with visible progress and fast feedback loops.",
    },
    {
      title: "5) Evolve",
      subtitle: "Next Phase",
      body: "Optional tune-ups, maintenance, or a longer-term plan as your needs change.",
    },
  ];

  return (
    <div className="rounded-2xl bg-card p-6 shadow-soft">
      <div className="grid gap-4 md:grid-cols-5">
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className="relative rounded-2xl border border-border bg-background p-5"
          >
            <div className="text-sm font-semibold tracking-tight">
              {step.title}
            </div>
            <div className="mt-1 text-base font-semibold">
              {step.subtitle}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>

            {idx < steps.length - 1 && (
              <div className="pointer-events-none absolute right-[-10px] top-1/2 hidden -translate-y-1/2 md:block">
                <div className="h-0 w-0 border-y-8 border-l-8 border-y-transparent border-l-border" />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Clarify first, then act on the smallest set of work with meaningful impact.
      </p>
    </div>
  );
}

function OutputBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Output
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

export default function ConsultingPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-4 py-16">
      <ClientEvent name="consulting_view" />

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 text-center sm:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 left-8 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background/70" />
        </div>

        <div className="relative space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Practical Website Audits and Smart Next Steps
          </h1>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Start with a website audit, then choose the smallest move that actually helps. 
            This may be clearer conversions, smoother customer flows, or light automation that reduces manual work.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaTrack
              href="#audit"
              src="hero_primary"
              className="inline-block rounded-xl bg-accent px-5 py-3 font-medium text-black shadow-sm transition hover:opacity-90"
            >
              Start With a Website Audit
            </CtaTrack>

            <CtaTrack
              href="#ways"
              src="hero_secondary"
              className="inline-block rounded-xl border border-border bg-background px-5 py-3 font-medium shadow-sm transition hover:bg-card"
            >
              See What Comes Next
            </CtaTrack>
          </div>

          <p className="text-xs text-muted-foreground">
            Chicago / Remote. Focused, right-sized work. No long retainers unless they clearly make sense.
          </p>
        </div>
      </section>

      {/* Why Start with an Audit */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Why Start With an Audit?</h2>

        <p className="text-sm text-muted-foreground">
          Many businesses jump straight into redesigns, new tools, or advertising. 
          They often discover later that the real problem was something smaller, quieter, and easier to fix.
        </p>

        <p className="text-sm text-muted-foreground">
          An audit avoids guessing. It shows where visitors get stuck, where workflows break down, 
          and which fixes create results without overspending.
        </p>

        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Helps decide whether you even need a redesign.</li>
          <li>Reveals quick wins that can pay off immediately.</li>
          <li>Prevents spending on tools or agencies that are not necessary.</li>
          <li>Creates a prioritized plan instead of a vague to-do list.</li>
        </ul>

        <p className="text-xs text-muted-foreground">
          The goal is not to sell more work. The goal is to clarify what is worth fixing first.
        </p>
      </section>

      {/* Two Audits */}
      <section id="audit" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Two Ways to Start</h2>
          <p className="text-sm text-muted-foreground">
            Two audit options. One is automated and fast. The other is guided and strategic. 
            Choose the level that matches where you are right now.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Quick Automated Audit */}
          <div className="space-y-3 rounded-2xl border border-border bg-background p-6 shadow-sm">
            <h3 className="text-base font-semibold">Quick Automated Audit</h3>
            <p className="text-sm text-muted-foreground">
              A fast AI-assisted review that highlights obvious website issues and friction points, delivered as a concise PDF.
            </p>

            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Performance basics and mobile pain points.</li>
              <li>Broken flows and navigation friction.</li>
              <li>High-level suggestions on where to focus first.</li>
            </ul>

            <OutputBlock>
              A lightweight summary. Useful if you want a quick read on what is working and what likely is not, without a live discussion.
            </OutputBlock>

            <p className="mt-3 text-xs text-muted-foreground">
              Designed for owners who want information and a sanity check, not a strategy call yet.
            </p>
          </div>

          {/* Guided Audit */}
          <div className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-base font-semibold">Guided Website and Process Audit</h3>
            <p className="text-sm text-muted-foreground">
              A deeper look at how your website and workflows behave for real customers, 
              followed by a live review call where we prioritize what to fix first.
            </p>

            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Conversion paths and calls to action.</li>
              <li>Booking, forms, and follow-up flows.</li>
              <li>Places where light automation can reduce missed steps.</li>
            </ul>

            <OutputBlock>
              A ranked action plan and a walkthrough call focused on tradeoffs and deciding the smallest next step that actually moves the needle.
            </OutputBlock>

            <div className="mt-4">
              <CtaTrack
                href="#request"
                src="audit_section"
                className="inline-block rounded-xl bg-accent px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:opacity-90"
              >
                Request a Guided Audit
              </CtaTrack>
            </div>
          </div>
        </div>
      </section>

      {/* What Comes Next */}
      <section id="ways" className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">What Happens After the Audit</h2>

          <p className="text-sm text-muted-foreground">
            Once we understand where things are getting stuck, we choose the smallest next step with the biggest payoff. 
            This may be targeted fixes, workflow cleanup, or planning instead of building.
          </p>

          <p className="text-xs text-muted-foreground">
            No forced redesigns. No open-ended projects. Each step is scoped intentionally.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Pill>
              <LineChart className="h-4 w-4" />
              More leads from the same traffic
            </Pill>
            <Pill>
              <Smartphone className="h-4 w-4" />
              Clearer mobile experience
            </Pill>
            <Pill>
              <Zap className="h-4 w-4" />
              Less manual busywork
            </Pill>
            <Pill>
              <ShieldCheck className="h-4 w-4" />
              Fewer brittle points
            </Pill>
          </div>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {/* 1) Conversion Fixes */}
          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl border border-border bg-background p-2">
                <LayoutTemplate className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold">1) Conversion Fixes</h3>
                <p className="text-sm text-muted-foreground">
                  Clean up key pages so visitors know what to do and actually do it. 
                  Clear calls to action and simpler booking paths.
                </p>
              </div>
            </div>

            <OutputBlock>
              Faster, clearer paths from landing on the site to taking the next step you care about.
            </OutputBlock>
          </li>

          {/* 2) Automation and Workflows */}
          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl border border-border bg-background p-2">
                <Zap className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold">2) Automation and Workflows</h3>
                <p className="text-sm text-muted-foreground">
                  Reduce repetitive admin and improve follow-ups with practical automation. 
                  The goal is fewer steps, not more tools.
                </p>
              </div>
            </div>

            <OutputBlock>
              A smoother path from inquiry to booked work with fewer manual steps.
            </OutputBlock>
          </li>

          {/* 3) Smart Upgrades */}
          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl border border-border bg-background p-2">
                <Wand2 className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold">3) Smart Upgrades</h3>
                <p className="text-sm text-muted-foreground">
                  Targeted improvements to speed, clarity, structure, and stability. 
                  Your site becomes easier to maintain and extend later.
                </p>
              </div>
            </div>

            <OutputBlock>
              A more stable, maintainable site that is ready for future changes when you are ready.
            </OutputBlock>
          </li>

          {/* 4) Roadmap and Advisory */}
          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl border border-border bg-background p-2">
                <Compass className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold">4) Roadmap and Advisory</h3>
                <p className="text-sm text-muted-foreground">
                  When direction matters more than implementation, we map choices, tradeoffs, 
                  and a realistic plan for the next 6 to 12 months.
                </p>
              </div>
            </div>

            <OutputBlock>
              A prioritized roadmap so you know what to do now and what to ignore until later.
            </OutputBlock>
          </li>
        </ul>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">How Engagements Run</h2>
          <p className="text-sm text-muted-foreground">
            The Website Audit feeds directly into this flow. The process is designed to avoid vague scopes 
            and keep decisions grounded in impact and effort.
          </p>
          <EngagementProcessDiagram />
        </section>
      </section>

      {/* Request */}
      <section id="request" className="space-y-4">
        <h2 className="text-xl font-semibold">
          Request a Guided Audit or Start a Conversation
        </h2>
        <p className="text-sm text-muted-foreground">
          Share a short description of your business and your site. 
          I will reply within one business day with next steps or clarifying questions.
        </p>
        <LeadForm source="consulting_page" />
      </section>

      {/* About */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">About Three Eagles Forge</h2>
        <p className="text-muted-foreground">
          Three Eagles Forge is an independent studio focused on practical, well-crafted web and automation work. 
          The focus is steady, thoughtful improvement, not chasing trends.
        </p>
      </section>
    </div>
  );
}
