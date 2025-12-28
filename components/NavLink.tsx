// components/NavLink.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import type { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary";
};

export default function NavLink({
  href,
  children,
  className,
  variant = "default",
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "px-3 py-2 rounded-xl transition-colors",
        // Active state (unchanged)
        isActive
          ? "bg-card text-white"
          : "text-muted-foreground hover:text-white hover:bg-card/60",

        // Primary nav emphasis (outline, not fill)
        variant === "primary" &&
          !isActive &&
          "border border-accent/40 text-foreground hover:border-accent hover:bg-card/40",

        className
      )}
    >
      {children}
    </Link>
  );
}
