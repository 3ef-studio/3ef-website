// components/Header.tsx (add/adjust these bits)
import NavLink from "@/components/NavLink";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="font-semibold">Three Eagles Forge Studio</div>
        <nav aria-label="Primary" className="hidden sm:flex gap-1">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>
        {/* Optional: mobile menu button */}
        <div className="sm:hidden">
          {/* Add your menu button + sheet/drawer here if not already present */}
        </div>
      </div>
    </header>
  );
}
