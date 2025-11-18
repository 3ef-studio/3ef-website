// app/portfolio/page.tsx
import React from "react";
import { portfolioSections } from "@/lib/portfolio";

export const metadata = {
  title: "Portfolio — Three Eagles Forge Studio",
  description:
    "A working portfolio of Three Eagles Forge Studio projects: VeilMark, Domain Discovery Engine, csvClean, and agentic experiments.",
};

export default function PortfolioPage() {
  return (
    <main className="py-10">
      <div className="container mx-auto max-w-5xl space-y-10 px-4">
        {/* Hero / Intro */}
        <section className="rounded-2xl bg-card shadow-soft p-6 space-y-4">
          <h1 className="text-3xl font-semibold">Portfolio</h1>
          <p className="text-muted-foreground">
            A working portfolio of experiments and products from Three Eagles
            Forge Studio. This page is designed for engineers, founders, and
            hiring managers who want to see how ideas move from concept to
            shipped artifacts.
          </p>
          <p className="text-muted-foreground">
            Each project below links back to real work in progress: running
            services, experiments, and learning loops rather than polished
            case-study theater.
          </p>
        </section>

        {/* On This Page / Jump Navigation */}
        <nav
          aria-label="On this page"
          className="rounded-2xl bg-muted/40 border border-border p-4"
        >
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide text-muted-foreground">
            On this page
          </h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {portfolioSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sections */}
        <div className="space-y-12">
          {portfolioSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 space-y-4 rounded-2xl bg-card shadow-soft p-6"
            >
              {/* Section header */}
              <header className="space-y-2">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                {section.tagline && (
                  <p className="text-sm text-muted-foreground">
                    {section.tagline}
                  </p>
                )}
              </header>

              {/* Body layout */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Text column */}
                <div className="space-y-4 lg:col-span-2">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {section.summary}
                  </p>

                  {/* Tech stack */}
                  {section.techStack.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Tech stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {section.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-muted/60 px-3 py-1 text-xs text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  {section.details.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        What I built
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {section.details.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Learning focus */}
                  {section.learningFocus && section.learningFocus.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Learning focus
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {section.learningFocus.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Strategy notes */}
                  {section.strategyNotes &&
                    section.strategyNotes.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Strategy & positioning
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          {section.strategyNotes.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Next steps */}
                  {section.nextSteps && section.nextSteps.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Next steps
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {section.nextSteps.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Visual / screenshot column */}
                <div className="lg:col-span-1">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-dashed border-border bg-muted/40 p-4 text-xs text-muted-foreground">
                    <div className="space-y-2">
                      <p className="font-medium">Visuals coming soon</p>
                      <p>
                        This slot will hold screenshots, diagrams, or flows for{" "}
                        <span className="font-medium">{section.title}</span>.
                      </p>
                    </div>
                    {/* Optional hint based on images config */}
                    {section.images && section.images.length > 0 && (
                      <p className="mt-4 text-[0.7rem] opacity-75">
                        Image placeholders defined in config (
                        {section.images.length} planned). Actual assets will be
                        wired up in a later sprint.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Placeholder for future writing highlights / meta section */}
        <section className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          <h2 className="text-base font-semibold mb-2">
            Writing & deeper dives (coming soon)
          </h2>
          <p>
            This section will eventually link to blog posts and longer-form
            write-ups that dig into the architecture, tradeoffs, and lessons
            learned from each project.
          </p>
        </section>
      </div>
    </main>
  );
}
