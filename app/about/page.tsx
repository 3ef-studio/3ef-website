// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CtaTrack from "@/components/CtaTrack";

export const metadata: Metadata = {
  title: "About — 3EF Studio",
  description:
    "Three Eagles Forge Studio builds practical AI tools, APIs, and guides—shipping fast, learning in public.",
  openGraph: {
    title: "About — 3EF Studio",
    description:
      "Three Eagles Forge Studio builds practical AI tools, APIs, and guides—shipping fast, learning in public.",
    url: "/about",
    siteName: "3EF Studio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — 3EF Studio",
    description:
      "Three Eagles Forge Studio builds practical AI tools, APIs, and guides—shipping fast, learning in public.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)] items-start">
          {/* Text column */}
          <div className="prose prose-invert prose-headings:scroll-mt-20 prose-a:underline-offset-4 max-w-none">
            <h1 className="mb-2">About Three Eagles Forge Studio</h1>
            <p className="text-muted-foreground">
              We build AI tools and digital products that turn ideas into momentum.{" "}
              Our ethos is simple: ship small, learn fast, and compound progress in
              public.
            </p>

            <h2>Mission</h2>
            <p>
              3EF exists to help makers and teams move faster—from proof-of-concept
              to production. We focus on practical utilities, APIs, and guides that
              reduce friction and create visible wins.
            </p>

            <h2>What We’re Building</h2>
            <ul>
              <li>
                <strong>VeilMark</strong> — AI authorship detection for images & text.
              </li>
              <li>
                <strong>DDE</strong> — Domain Discovery Engine for brandable names.
              </li>
              <li>
                <strong>Utilities</strong> — Lightweight tools like CSV cleaners and
                workflow scripts.
              </li>
            </ul>
            <section className="rounded-2xl border border-border bg-card/60 p-6 space-y-3">
              <h2 className="text-xl font-semibold">See the work in context</h2>
              <p className="text-sm text-muted-foreground">
                If you’d like a closer look at what I’m actually building, you can
                explore a working portfolio of projects and experiments:
              </p>
              <div>
                <CtaTrack
                  href="/portfolio"
                  src="about_page"
                  className="inline-block rounded-xl bg-accent px-5 py-3 font-medium !text-black shadow-sm transition hover:opacity-90"
                  >
                  View the portfolio
                </CtaTrack>
              </div>
            </section>
            <h2>Contact</h2>
            <p className="mb-0">
              Email:{" "}
              <a href="mailto:hello@3ef.studio">hello@3ef.studio</a>
            </p>
            <p>
              GitHub:{" "}
              <Link
                href="https://github.com/3ef-studio"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com (org link)
              </Link>
            </p>
          </div>

          {/* Logo column */}
          <div className="flex justify-center md:justify-end">
            <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-3xl border border-white/10 bg-card/80 shadow-lg shadow-black/40 overflow-hidden flex items-center justify-center">
              <Image
                src="/images/logo.jpg"
                alt="Three Eagles Forge Studio logo"
                fill
                className="object-contain p-6"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
