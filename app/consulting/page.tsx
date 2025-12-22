// app/consulting/page.tsx
import ClientEvent from "@/components/ClientEvent";
import CtaTrack from "@/components/CtaTrack";
import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Consulting — Websites, Smart Upgrades, Strategy | 3EF Studio",
  description:
    "Four ways to work with Three Eagles Forge: website audits, website refresh/build, smart (AI-enabled) upgrades, and strategy/consulting. Start a conversation.",
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
        The goal is to keep things right-sized: clarify first, then act with a tight scope.
      </p>
    </div>
  );
}

// ...keep imports + metadata + FlowDiagram as-is...

export default function ConsultingPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-4 py-16">
      <ClientEvent name="consulting_view" />

      {/* ---------------- Hero ---------------- */}
      <section className="space-y-5 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Consulting for Small Business Websites — Audit, Refresh, Upgrade, or
          Strategy
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Three Eagles Forge helps small businesses improve their web presence
          with careful design, practical automation, and clear next steps. One
          page, one conversation to start.
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
      </section>

      {/* ---------------- Ways We Work (+ diagram) ---------------- */}
      <section id="ways" className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Four Ways to Work Together</h2>
          <p className="text-sm text-muted-foreground">
            We’ll start with a short conversation, then choose the simplest path
            to progress—diagnose, build, upgrade, or guide.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold">1) Website Audits</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A clear assessment of what’s working, what’s holding you back,
                  and what to fix first.
                </p>
              </div>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                Diagnose
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Output: prioritized issues, quick wins, and a practical next-step plan.
            </p>
          </li>

          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold">2) Website Refresh / Build</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A modern, fast website with clean structure and a clear message.
                </p>
              </div>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                Build
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Output: improved design, performance, navigation, and a maintainable foundation.
            </p>
          </li>

          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold">3) Smart Upgrades</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Targeted automation where it genuinely reduces busywork or improves follow-through.
                </p>
              </div>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                Upgrade
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Output: one or two high-impact workflows integrated into your existing tools.
            </p>
          </li>

          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold">4) Strategy &amp; Consulting</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  When you need clarity more than code: options, tradeoffs, and a right-sized plan.
                </p>
              </div>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                Guide
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Output: a concise roadmap and decision support.
            </p>
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
            Not sure where to start? Share your site and goals, and I’ll recommend
            the simplest next step.
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
            If we move forward, you’ll get a clear scope, timeline, and a plan
            designed to avoid endless revision loops.
          </li>
        </ol>
      </section>

      {/* ---------------- Request (Form) ---------------- */}
      <section id="request" className="space-y-4">
        <h2 className="text-xl font-semibold">Start a Conversation</h2>
        <p className="text-sm text-muted-foreground">
          Tell me a bit about your business and your current site. I’ll follow
          up within 1 business day.
        </p>
        <LeadForm source="consulting_page" />
      </section>

      {/* ---------------- About ---------------- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">About Three Eagles Forge</h2>
        <p className="text-muted-foreground">
          Three Eagles Forge is an independent studio focused on practical,
          well-crafted web work—combining modern development, design sense, and
          selective automation to help small businesses grow without unnecessary
          complexity.
        </p>
      </section>
    </div>
  );
}
