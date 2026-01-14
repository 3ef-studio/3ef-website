// app/labs/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Labs | 3EF Studio",
  description:
    "Experiments, challenges, and public builds from 3EF Studio — shipped fast, refined over time.",
};

export default function LabsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Labs</h1>
        <p className="mt-3 text-base text-muted-foreground">
          A home for experiments, challenges, and fast-shipped prototypes. Labs
          projects are intentionally lightweight — the goal is to learn fast,
          ship real artifacts, and refine what earns it.
        </p>
      </header>

      <section aria-label="Labs list" className="space-y-6">
        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Challenge 001 — Vibe Coding Product Sprint
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Build a real product in 24 hours. Submit a live demo + short
                write-up. Winner earns cash + two weeks of 3EF Product Forge
                support.
              </p>
            </div>

            <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
              Coming soon
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/labs/challenge-001"
              className="inline-flex items-center justify-center rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
            >
              View details
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Back to home
            </Link>
          </div>
        </article>
      </section>

      <footer className="mt-10 text-sm text-muted-foreground">
        Want to suggest a future challenge theme? Send a note via the contact
        link in the footer.
      </footer>
    </main>
  );
}
