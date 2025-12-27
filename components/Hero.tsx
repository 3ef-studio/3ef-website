// /components/Hero.tsx
"use client";

import type { JSX } from "react";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero(): JSX.Element {
  const reduceMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      data-testid="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero.jpg"
          alt="Sparks flying from a forge, representing ideas being shaped into real tools."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/30 md:from-black/60 md:via-black/45"
        />
        {/* Subtle vignette to keep edges calm */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_25%_20%,rgba(94,234,212,0.10),transparent_55%),radial-gradient(900px_circle_at_80%_35%,rgba(96,165,250,0.10),transparent_55%)]"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? false : "show"}
        variants={variants}
        transition={reduceMotion ? undefined : { duration: 0.5, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-5xl px-6 py-24 sm:py-28 md:py-32"
      >
        <div className="max-w-3xl">
          {/* Optional readability panel (lightweight, not overpowering) */}
          <div className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-sm sm:p-10 md:p-12">
            <h1
              id="hero-title"
              className="text-text text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              Forging Ideas Into Reality
            </h1>

            <p className="mt-4 text-muted-foreground sm:text-lg">
              Three Eagles Forge is an independent studio building practical software,
              tools, and websites. Explore the work, or start with a focused consulting engagement.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-2xl bg-accent px-5 py-3 text-sm font-medium text-black shadow-sm transition
                           hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label="View the portfolio"
              >
                View Portfolio
              </Link>

              <Link
                href="/consulting"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-text shadow-sm transition
                           hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label="Explore consulting services"
              >
                Consulting
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-transparent px-5 py-3 text-sm font-medium text-muted-foreground transition
                           hover:text-text hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label="Read the blog"
              >
                Read the Blog
              </Link>

              {/* Small secondary link (keeps newsletter accessible without crowding) */}
              <Link
                href="/#newsletter"
                className="sm:ml-1 text-xs text-muted-foreground transition hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-xl px-2 py-1"
                aria-label="Get updates via the 3EF Studio newsletter"
              >
                Get updates →
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Product builds • Agentic experiments • Right-sized consulting
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
