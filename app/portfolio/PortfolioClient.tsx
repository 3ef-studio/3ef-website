// app/portfolio/PortfolioClient.tsx
"use client";

import React from "react";
import Image from "next/image";
import type { PortfolioSection } from "@/lib/portfolio";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type PortfolioClientProps = {
  sections: PortfolioSection[];
};

export default function PortfolioClient({ sections }: PortfolioClientProps) {
  const [selectedImage, setSelectedImage] = React.useState<{
    src: string;
    alt: string;
    caption?: string;
  } | null>(null);

  return (
    <main className="py-10">
      <div className="container mx-auto max-w-5xl space-y-10 px-4">
        {/* Hero / Intro */}
        <section className="rounded-2xl bg-card shadow-soft p-6 space-y-4">
          <h1 className="text-3xl font-semibold">Projects</h1>
          <p className="text-muted-foreground">
            A working portfolio of experiments and projects from Three Eagles
            Forge Studio. This page is designed for engineers, founders, and
            hiring managers who want to see how ideas move from concept to
            shipped artifacts.
          </p>
          <p className="text-muted-foreground">
            Each card below represents a real system in various stages of
            maturity—from R&amp;D cycles to production-ready tools—with enough
            detail to understand the architecture, tradeoffs, and learning
            behind it.
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
            {sections.map((section) => (
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

        {/* Portfolio Cards */}
        <div className="space-y-8">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24"
            >
              <Card className="overflow-hidden border-border/70">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-2xl">{section.title}</CardTitle>
                  {section.tagline && (
                    <CardDescription className="text-sm">
                      {section.tagline}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left: summary, stack, accordions */}
                    <div className="space-y-6 lg:col-span-2">
                      {/* Summary + Tech Stack */}
                      <div className="space-y-4">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {section.summary}
                        </p>

                        {section.techStack?.length > 0 && (
                          <div className="space-y-2">
                            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              Tech stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {section.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="inline-flex items-center rounded-full bg-muted/80 px-3 py-1 text-xs text-muted-foreground"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Collapsible details */}
                      <Accordion
                        type="single"
                        collapsible
                        className="space-y-2"
                      >
                        {/* What I built */}
                        {section.details?.length > 0 && (
                          <AccordionItem value="what-i-built">
                            <AccordionTrigger className="text-sm font-medium">
                              What I built
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                {section.details.map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        )}

                        {/* Learning focus */}
                        {section.learningFocus &&
                          section.learningFocus.length > 0 && (
                            <AccordionItem value="learning-focus">
                              <AccordionTrigger className="text-sm font-medium">
                                Learning focus
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                  {section.learningFocus.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          )}

                        {/* Strategy notes */}
                        {section.strategyNotes &&
                          section.strategyNotes.length > 0 && (
                            <AccordionItem value="strategy">
                              <AccordionTrigger className="text-sm font-medium">
                                Strategy &amp; positioning
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                  {section.strategyNotes.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          )}

                        {/* Next steps */}
                        {section.nextSteps &&
                          section.nextSteps.length > 0 && (
                            <AccordionItem value="next-steps">
                              <AccordionTrigger className="text-sm font-medium">
                                Next steps
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                  {section.nextSteps.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          )}
                      </Accordion>
                    </div>

                    {/* Right: image stack + captions */}
                    <div className="lg:col-span-1 space-y-4">
                      {section.images && section.images.length > 0 ? (
                        section.images.map((img, idx) => (
                          <div key={idx} className="space-y-2">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedImage({
                                  src: img.src,
                                  alt: img.alt,
                                  caption: img.caption,
                                })
                              }
                              className="group block w-full text-left"
                            >
                              <div className="relative w-full overflow-hidden rounded-xl border border-border bg-muted">
                                <div className="relative aspect-video w-full">
                                  <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-contain transition-transform group-hover:scale-[1.02]"
                                    sizes="(min-width: 1024px) 320px, 100vw"
                                  />
                                </div>
                              </div>
                              <p className="mt-1 text-[0.7rem] text-muted-foreground/70">
                                Click to enlarge
                              </p>
                            </button>
                            {img.caption && (
                              <p className="text-[0.7rem] text-muted-foreground/80">
                                {img.caption}
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="flex h-40 w-full items-center justify-center text-xs text-muted-foreground">
                          Visuals coming soon
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          ))}
        </div>

        {/* Writing & deeper dives */}
        <section className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          <h2 className="text-base font-semibold mb-2">
            Writing &amp; deeper dives (coming soon)
          </h2>
          <p className="mb-2">
            Over time, this section will link to longer-form posts that unpack
            the architecture, tradeoffs, and results behind each project—case
            studies for VeilMark, DDE, csvClean, and the agentic experiments.
          </p>
          <p>
            For now, the cards above are the best place to explore how I
            approach building indie-scale tools: concrete systems, constrained
            resources, and deliberate learning loops.
          </p>
        </section>
      </div>

      {/* Lightbox / Image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-4xl space-y-3 rounded-2xl bg-background p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                {selectedImage.caption || selectedImage.alt}
              </p>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted"
              >
                Close
              </button>
            </div>
            <div className="relative w-full h-[70vh] overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
