// components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import type { JSX } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import NavLink from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header(): JSX.Element {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/consulting", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/portfolio", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur bg-background/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2"
      >
        Skip to content
      </a>

      {/* Removed fixed h-14, use padding instead so logo can grow */}
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Brand + Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {/* Bigger base size + stronger scale */}
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 transform transition-transform duration-300 group-hover:scale-150 group-focus-within:scale-150">
            <Image
              src="/images/logo.jpg"
              alt="Three Eagles Forge Studio logo"
              fill
              priority
              className="object-contain rounded-md"
            />
          </div>
          <span className="font-semibold text-sm sm:text-base">
            Three Eagles Forge Studio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden sm:flex gap-1">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger + drawer */}
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open navigation menu"
                aria-expanded={open}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2 focus:ring-offset-background"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[85vw] sm:w-80">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-4 flex flex-col">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="-mx-3 rounded-xl px-3 py-2 text-base text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2 focus:ring-offset-background"
                  >
                    {l.label}
                  </Link>
                ))}

                {/* Optional mobile CTAs */}
                <div className="mt-4 grid grid-cols-1 gap-2">
                  <Button asChild variant="secondary" onClick={() => setOpen(false)}>
                    <Link href="/consulting">Advisory</Link>
                  </Button>
                  <Button asChild onClick={() => setOpen(false)}>
                    <Link href="/blog">Latest</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
