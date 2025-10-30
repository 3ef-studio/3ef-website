// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

// If you already have a <Prose> component, uncomment this import and wrap the inner content with it.
// import { Prose } from "@/components/Prose";

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
      <section className="mx-auto max-w-3xl px-6 py-16">
        {/* Replace wrapper below with <Prose> if you have that component */}
        <div className="prose prose-invert prose-headings:scroll-mt-20 prose-a:underline-offset-4">
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

          <h2>Contact</h2>
          <p className="mb-0">
            Email:{" "}
            <a href="mailto:hello@3ef.studio">hello@3ef.studio</a>
          </p>
          <p>
            GitHub:{" "}
            <Link
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com (org link)
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
