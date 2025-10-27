export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted">
        <p>© {new Date().getFullYear()} Three Eagles Forge Studio · Built with Next.js</p>
      </div>
    </footer>
  );
}
