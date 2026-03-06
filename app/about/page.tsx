import type { Metadata } from "next";
import Image from "next/image";
import ForgeActivity from "@/components/ForgeActivity";

export const metadata: Metadata = {
  title: "About | Three Eagles Forge",
  description:
    "Three Eagles Forge is a personal project lab focused on software experiments, applied AI, and practical digital ideas explored through building.",
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
            A Personal Project Lab for Practical Software, AI, and Digital Experiments
          </h1>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Three Eagles Forge (3EF) is a personal lab for exploring software ideas,
            AI-assisted workflows, lightweight tools, and digital experiments. It is a
            place to build, test, document, and refine practical ideas through hands-on
            iteration.
          </p>

          <p className="text-xs text-muted-foreground">
            Chicago / Remote · Personal projects · Built through curiosity, iteration, and
            experimentation
          </p>
        </div>
      </section>

      {/* What This Site Covers */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">What 3EF Focuses On</h2>

        <p className="text-sm text-muted-foreground">
          3EF is centered on experimentation. Some projects explore website quality,
          usability, and workflow friction. Others focus on internal tools, product
          concepts, AI-assisted systems, and small software builds designed to test an
          idea quickly and learn from the results.
        </p>

        <ul className="grid gap-6 md:grid-cols-2">
          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <h3 className="text-base font-semibold">Software Experiments</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Small builds and prototypes used to explore ideas, validate concepts, and
              understand what is worth developing further.
            </p>
          </li>

          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <h3 className="text-base font-semibold">Applied AI Exploration</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Practical experiments with AI tools, workflows, and agent-like systems aimed
              at improving analysis, productivity, and decision support.
            </p>
          </li>

          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <h3 className="text-base font-semibold">Website and UX Analysis</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Ongoing exploration of how websites perform in real use, where friction
              appears, and what kinds of changes create meaningful improvement.
            </p>
          </li>

          <li className="rounded-2xl bg-card p-6 shadow-soft">
            <h3 className="text-base font-semibold">Notes From Building</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Reflections, patterns, and lessons pulled from experiments, prototypes, and
              iterative project work.
            </p>
          </li>
        </ul>
      </section>

      {/* How It Operates */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How the Lab Operates</h2>

        <p className="text-sm text-muted-foreground">
          3EF is built around the same working principles that make technical exploration
          useful: start small, test quickly, learn from real output, and refine based on
          evidence instead of assumptions.
        </p>

        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Explore ideas through building, not just planning</li>
          <li>Prefer practical experiments over abstract theory</li>
          <li>Iterate in small, reversible steps</li>
          <li>Document tradeoffs, observations, and lessons learned</li>
        </ul>
      </section>

      {/* Logo + Identity */}
      <section className="grid gap-8 items-center md:grid-cols-[1fr_240px]">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">About the Name</h2>
          <p className="text-sm text-muted-foreground">
            Three Eagles Forge reflects the way ideas take shape here: through pressure,
            constraint, experimentation, and repeated refinement. The forge is less about
            polished presentation and more about the process of turning rough concepts into
            something tested, usable, and real.
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative h-40 w-40 overflow-hidden rounded-3xl border border-white/10 bg-card/80 shadow-lg shadow-black/40">
            <Image
              src="/images/logo.jpg"
              alt="Three Eagles Forge logo"
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