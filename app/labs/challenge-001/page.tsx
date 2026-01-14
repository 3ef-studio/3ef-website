// app/labs/challenge-001/page.tsx

import ClientEvent from "@/components/ClientEvent";
import { Trophy, Hammer, Timer, Sparkles, Link2 } from "lucide-react";
import Image from "next/image";
export const metadata = {
  title: "Challenge 001 — Vibe Coding Product Sprint | 3EF Studio",
  description:
    "Build a real product in 24 hours. Win cash and earn two weeks of Product Forge support from 3EF Studio.",
  alternates: { canonical: "/labs/challenge-001" },
};

// TODO: replace with real URLs
const STRIPE_PAYMENT_URL = "https://buy.stripe.com/00w4gA6DjchC0uTbcI8ww00";
//const SUBMISSION_FORM_URL = "https://forms.gle/CHALLENGE001_PLACEHOLDER";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
      {children}
    </span>
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

export default function Challenge001Page() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-4 py-16">
      <ClientEvent name="challenge_001_view" />

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 text-center sm:px-10">
        <div className="flex justify-center">
             <div className="rounded-xl border border-border bg-background px-4 py-2">
                <Image
                    src="/images/logo.jpg"
                    alt="3EF Studio logo"
                    width={360}
                    height={360}
                    className="h-40 w-auto opacity-90"
                    priority
                />
            </div>
        </div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 left-8 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background/70" />
        </div>

        <div className="relative space-y-5">

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Challenge 001: Vibe Coding Product Sprint
          </h1>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Build a real, usable product in 24 hours. Submit a live demo and a
            short write-up (including the AI tools you used). Winner earns cash
            plus two weeks of Product Forge support from 3EF Studio.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
                href={STRIPE_PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl bg-accent px-5 py-3 font-medium text-black shadow-sm transition hover:opacity-90"
                >
                Register ($25)
            </a>
 {/* Hero 
            <a
                href={SUBMISSION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl border border-border bg-background px-5 py-3 font-medium shadow-sm transition hover:bg-card"
                >
                Submission Form
            </a>
*/}
          </div>
          <p className="text-xs text-muted-foreground">
            Prompt is revealed at kickoff. Timing and details are shared with
            registered participants by email.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Pill>
              <Timer className="h-4 w-4" />
              24-hour build window
            </Pill>
            <Pill>
              <Link2 className="h-4 w-4" />
              Live demo required
            </Pill>
            <Pill>
              <Sparkles className="h-4 w-4" />
              AI tools encouraged
            </Pill>
            <Pill>
              <Trophy className="h-4 w-4" />
              Cash + Forge support
            </Pill>
          </div>
        </div>
      </section>

      {/* What this is */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What this is</h2>

        <p className="text-sm text-muted-foreground">
          This is a fast, constrained build sprint for vibe coders who can ship
          under pressure. You’ll get a clear prompt at kickoff, build a focused
          MVP in 24 hours, and submit a live, usable product.
        </p>

        <p className="text-xs text-muted-foreground">
          Not a hackathon. Not a pitch contest. Shipping wins.
        </p>
      </section>

      {/* How it works */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">How it works</h2>
          <p className="text-sm text-muted-foreground">
            The flow is intentionally simple so you spend time building, not
            interpreting rules.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-border bg-background p-6 shadow-sm">
            <h3 className="text-base font-semibold">1) Register</h3>
            <p className="text-sm text-muted-foreground">
              Pay the $25 entry fee to join. You’ll receive timing details by
              email.
            </p>
            <OutputBlock>
              You’re in the participant list and will get the prompt at kickoff.
            </OutputBlock>
          </div>

          <div className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-base font-semibold">2) Build (24 hours)</h3>
            <p className="text-sm text-muted-foreground">
              Prompt drops at kickoff. Ship a small web product that is usable
              without explanation.
            </p>
            <OutputBlock>
              A working demo with a clear happy path and intentionally cut scope.
            </OutputBlock>
          </div>

          <div className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-base font-semibold">3) Submit</h3>
            <p className="text-sm text-muted-foreground">
              Provide a live demo and a short write-up. Include the AI tools you
              used and how they influenced your build.
            </p>
            <OutputBlock>
              A submission that can be evaluated quickly and fairly.
            </OutputBlock>
          </div>

          <div className="space-y-3 rounded-2xl border border-border bg-background p-6 shadow-sm">
            <h3 className="text-base font-semibold">4) Judging & Results</h3>
            <p className="text-sm text-muted-foreground">
              Projects are scored using the published rubric. Scores and top
              submissions are shared publicly.
            </p>
            <OutputBlock>
              Winner selected + top 5 highlighted with links and brief notes.
            </OutputBlock>
          </div>
        </div>
      </section>

        {/* Timeline */}
        <section className="space-y-6">
            <h2 className="text-xl font-semibold">Timeline</h2>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Registration
                </p>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li><strong>Opens:</strong> Fri, Jan 16</li>
                    <li><strong>Closes:</strong> Fri, Feb 6 @ 11:59pm CST</li>
                </ul>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Build
                </p>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li><strong>Prompt:</strong> Sat, Feb 7 @ 9:00am CST</li>
                    <li><strong>Window:</strong> 24 hours</li>
                    <li><strong>Submit by:</strong> Sun, Feb 8 @ 9:00am CST</li>
                </ul>
                </div>

                <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Results
                </p>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li><strong>Judging:</strong> Feb 8–10</li>
                    <li><strong>Winner:</strong> Wed, Feb 11</li>
                </ul>
                </div>
            </div>

            <p className="text-xs text-muted-foreground">
                Exact timing reminders will be sent to registered participants by email.
            </p>
            </section>


      {/* What you must submit */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">What you must submit</h2>
          <p className="text-sm text-muted-foreground">
            Keep it simple. The demo matters more than the repo.
          </p>
        </div>

        <div className="rounded-2xl bg-card p-6 shadow-soft">
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Live demo URL</span>{" "}
              (required)
            </li>
            <li>
              <span className="font-medium text-foreground">
                200–400 word write-up
              </span>{" "}
              (required): who it’s for, what it solves, what you did not build,
              what you’d do with two more weeks
            </li>
            <li>
              <span className="font-medium text-foreground">
                AI / vibe-coding tools used
              </span>{" "}
              (required): what you used and how it influenced the build
            </li>
            <li>Public repo (optional)</li>
          </ul>

          <p className="mt-4 text-xs text-muted-foreground">
            Submissions without a live demo will not be scored.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
         {/*       
            <a
                href={SUBMISSION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl border border-border bg-background px-5 py-3 font-medium shadow-sm transition hover:bg-card"
                >
                Submission Form
            </a>
            */}
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Prizes</h2>
          <p className="text-sm text-muted-foreground">
            Cash is a bonus. The primary prize is momentum and refinement.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-border bg-background p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-base font-semibold">
              <Trophy className="h-5 w-5 text-muted-foreground" />
              Cash Prize
            </h3>
            <p className="text-sm text-muted-foreground">
              Winner receives <span className="font-medium">10–25%</span> of the
              total entry fees (percentage depends on participation).
            </p>
            <OutputBlock>
              A clean, simple payout tied to participation.
            </OutputBlock>
          </div>

          <div className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="flex items-center gap-2 text-base font-semibold">
              <Hammer className="h-5 w-5 text-muted-foreground" />
              Product Forge Support (2 weeks)
            </h3>
            <p className="text-sm text-muted-foreground">
              Two weeks of structured support from 3EF Studio with 2–3 calls and
              clear deliverables.
            </p>

            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Positioning document</li>
              <li>Landing page copy</li>
              <li>Launch & distribution plan</li>
              <li>Prioritized backlog</li>
            </ul>

            <p className="mt-2 text-xs text-muted-foreground">
              Focused on direction and momentum — not deep engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Judging */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Judging criteria</h2>
        <p className="text-sm text-muted-foreground">
          Submissions are scored (100 points). Scores will be published.
        </p>

        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <ul className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
            <li>Problem clarity & usefulness — 25%</li>
            <li>Execution & polish — 25%</li>
            <li>Simplicity & focus — 15%</li>
            <li>Product potential — 20%</li>
            <li>Vibe coding effectiveness — 10%</li>
            <li>Write-up quality — 5%</li>
          </ul>
        </div>
      </section>

      {/* Entry details */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Entry details</h2>
        <div className="rounded-2xl bg-card p-6 shadow-soft">
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>$25 entry fee</li>
            <li>Solo builders only (v1)</li>
            <li>Web-based products only</li>
            <li>AI tools allowed and encouraged</li>
            <li>Prompt revealed at kickoff</li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            If minimum participation is not met, entry fees will be fully
            refunded.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/labs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl border border-border bg-background px-5 py-3 font-medium shadow-sm transition hover:bg-card"
            >
              Back to Labs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
