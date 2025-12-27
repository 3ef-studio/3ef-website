// app/consulting/page.tsx
import ClientEvent from "@/components/ClientEvent";
import CtaTrack from "@/components/CtaTrack";
import LeadForm from "@/components/LeadForm";
import {
  ScanSearch,
  LayoutTemplate,
  Wand2,
  Compass,
  Zap,
  Smartphone,
  ShieldCheck,
  LineChart,
} from "lucide-react";

export const metadata = {
  title: "Consulting — Websites, Smart Upgrades, Strategy | 3EF Studio",
  description:
    "Four ways to work with Three Eagles Forge: website audits, website refresh/build, smart upgrades, and strategy/consulting. Turn early drafts into production-ready sites. Start a conversation.",
  alternates: { canonical: "/consulting" },
};

function EngagementProcessDiagram() {
  const steps = [
    {
      title: "1) Start",
      subtitle: "Conversation",
      body: "You share the site + goal. We clarify constraints and success criteria.",
    },
    {
      title: "2) Triage",
      subtitle: "Fast Assessment",
      body: "Quick scan of the biggest issues/opportunities so we don’t over-scope.",
    },
    {
      title: "3) Plan",
      subtitle: "Scope & Options",
      body: "You get a clear recommendation: audit, refresh, upgrades, or strategy.",
    },
    {
      title: "4) Deliver",
      subtitle: "Build / Improve",
      body: "We execute with tight scope, fast feedback loops, and clean handoffs.",
    },
    {
      title: "5) Follow-through",
      subtitle: "Next Steps",
      body: "Optional: maintenance, upgrades, or a roadmap for what’s next.",
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
            <div className="text-sm font-semibold tracking-tight">{step.title}</div>
            <div className="mt-1 text-base font-semibold">{step.subtitle}</div>
            <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>

            {/* Connector arrow (desktop only) */}
            {idx < steps.length - 1 && (
              <div className="pointer-events-none absolute right-[-10px] top-1/2 hidden -translate-y-1/2 md:block">
                <div className="h-0 w-0 border-y-8 border-l-8 border-y-transparent border-l-border" />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        The goal is to keep things right-sized. Clarify first, then act with a tight scope.
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

      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 text-center sm:px-10">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 left-8 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background/70" />
        </div>

        {/* content */}
        <div className="relative space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Consulting for Small Business Websites — Audit, Refresh, Upgrade, or Strategy
          </h1>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Three Eagles Forge helps small businesses improve their web presence with careful
            design, practical automation, and clear next steps. Many projects start as templates
            or early drafts. Sometimes they are AI-assisted. Our job is to turn those drafts into
            sites that are reliable, usable, and ready for real customers.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaTrack
              href="#request"
              src="hero"
              className="inline-block rounded-xl bg-accent px-5 py-3 font-medium text-black shadow-sm transition hover:opacity-90"
            >
              Start a Conversation
            </CtaTrack>

            <CtaTrack
              href="#ways"
              src="hero_secondary"
              className="inline-block rounded-xl border border-border bg-background px-5 py-3 font-medium shadow-sm transition hover:bg-card"
            >
              See How We Work
            </CtaTrack>
          </div>

          <p className="text-xs text-muted-foreground">
            Chicago / Remote • Practical, right-sized help • No hard sell
          </p>
        </div>
      </section>


      {/* ---------------- Ways We Work (+ diagram) ---------------- */}
      <section id="ways" className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Four Ways to Work Together</h2>
          <p className="text-sm text-muted-foreground">
            We’ll start with a short conversation, then choose the simplest path to progress.
            Diagnose, build, upgrade, or guide.
          </p>
          <p className="text-xs text-muted-foreground">
            Each option is designed to be small, focused, and outcome-driven.
          </p>

          {/* Outcomes strip (visual break + scan anchor) */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Pill>
              <Zap className="h-4 w-4" />
              Faster load times
            </Pill>
            <Pill>
              <Smartphone className="h-4 w-4" />
              Better mobile UX
            </Pill>
            <Pill>
              <ShieldCheck className="h-4 w-4" />
              Accessibility basics
            </Pill>
            <Pill>
              <LineChart className="h-4 w-4" />
              Clear conversion flow
            </Pill>
          </div>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {/* 1) Audits */}
          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-xl border border-border bg-background p-2">
                  <ScanSearch className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold">1) Website Audits</h3>
                  <p className="text-sm text-muted-foreground">
                    A clear assessment of what’s working, what’s holding you back, and what to fix first.
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                Diagnose
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                Useful when a site looks “done” on the surface but still has gaps in structure,
                speed, accessibility, or conversion flow.
              </p>
              <p className="text-sm text-muted-foreground">
                This is common with older sites, template sites, and early drafts that were never fully finished.
              </p>
            </div>

            <OutputBlock>
              Prioritized issues, quick wins, and a practical next-step plan.
            </OutputBlock>
          </li>

          {/* 2) Refresh / Build */}
          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-xl border border-border bg-background p-2">
                  <LayoutTemplate className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold">2) Website Refresh / Build</h3>
                  <p className="text-sm text-muted-foreground">
                    A modern, fast website with clean structure and a clear message.
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                Build
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                Best when the current site (or early draft) is hard to extend, inconsistent,
                or not built on a foundation you can maintain.
              </p>
              <p className="text-sm text-muted-foreground">
                The goal is a clean baseline that loads fast, reads clearly, and supports real customer actions.
              </p>
            </div>

            <OutputBlock>
              Improved design, performance, navigation, and a maintainable foundation.
            </OutputBlock>
          </li>

          {/* 3) Smart Upgrades */}
          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-xl border border-border bg-background p-2">
                  <Wand2 className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold">3) Smart Upgrades</h3>
                  <p className="text-sm text-muted-foreground">
                    Targeted improvements that make a site more trustworthy and easier to run without overbuilding.
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                Upgrade
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                This often includes polishing an existing draft into a production-ready experience.
              </p>

              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>UX clarity and navigation</li>
                <li>Mobile responsiveness and accessibility</li>
                <li>Performance and load time improvements</li>
                <li>Forms, analytics, booking, email capture, or simple automations</li>
              </ul>

              <p className="text-sm text-muted-foreground">
                The focus is on the smallest set of changes that measurably improves the experience.
              </p>
            </div>

            <OutputBlock>
              One or two high-impact upgrades integrated into your existing tools.
            </OutputBlock>
          </li>

          {/* 4) Strategy */}
          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-xl border border-border bg-background p-2">
                  <Compass className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold">4) Strategy &amp; Consulting</h3>
                  <p className="text-sm text-muted-foreground">
                    When you need clarity more than code. Options, tradeoffs, and a right-sized plan.
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                Guide
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                Includes guidance on when quick-build tools help, where they fall short, and how to move
                from a draft to a reliable production site.
              </p>
              <p className="text-sm text-muted-foreground">
                You’ll leave with decisions made and next steps that are realistic for your time and budget.
              </p>
            </div>

            <OutputBlock>
              A concise roadmap and decision support.
            </OutputBlock>
          </li>
        </ul>

        {/* Visual summary (non-repetitive) */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">How Engagements Run</h2>
          <p className="text-sm text-muted-foreground">
            This is the process behind the four options above. It’s designed to avoid scope creep
            and keep decisions simple.
          </p>
          <EngagementProcessDiagram />
        </section>

        <div className="rounded-2xl border border-border bg-background p-5">
          <p className="text-sm text-muted-foreground">
            Not sure where to start? Share your site and goals, and I’ll recommend the simplest next step.
          </p>
        </div>
      </section>

      {/* ---------------- How It Works ---------------- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How It Works</h2>
        <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
          <li>Send a brief overview of your site and what you’re trying to achieve.</li>
          <li>We schedule a short call to confirm fit and the simplest next step.</li>
          <li>
            If we move forward, you’ll get a clear scope, timeline, and a plan designed to avoid endless revision loops.
          </li>
        </ol>
      </section>

      {/* ---------------- Request (Form) ---------------- */}
      <section id="request" className="space-y-4">
        <h2 className="text-xl font-semibold">Start a Conversation</h2>
        <p className="text-sm text-muted-foreground">
          Tell me a bit about your business and your current site. I’ll follow up within 1 business day.
        </p>
        <LeadForm source="consulting_page" />
      </section>

      {/* ---------------- About ---------------- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">About Three Eagles Forge</h2>
        <p className="text-muted-foreground">
          Three Eagles Forge is an independent studio focused on practical, well-crafted web work.
          It combines modern development, design sense, and selective automation to help small businesses
          grow without unnecessary complexity.
        </p>
      </section>
    </div>
  );
}
