import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-bg/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">3EF Studio</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/blog" className="hover:opacity-80">Blog</Link>
          <Link href="/about" className="hover:opacity-80">About</Link>
          <Button className="rounded-xl bg-accent text-bg hover:opacity-90">Subscribe</Button>
        </nav>
      </div>
    </header>
  );
}
