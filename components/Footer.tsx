// components/Footer.tsx (replace or extend content)
import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {year} Three Eagles Forge Studio
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/portfolio"
            className="hover:text-foreground hover:underline underline-offset-2"
          >
            Portfolio
          </Link>



          <Link
            href="https://github.com/3ef-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white"
          >
            <Github className="h-4 w-4" /> GitHub
          </Link>
          <Link
            href="https://twitter.com/3ef_studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white"
          >
            <Twitter className="h-4 w-4" /> X/Twitter
          </Link>
        </div>
      </div>
    </footer>
  );
}
