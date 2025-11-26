// app/newsletter/domains/archive/page.tsx

import Link from "next/link";
import { getAllDdeIssueMetas } from "@/lib/newsletter/dde";

export const metadata = {
  title: "DDE Newsletter Archive — 3EF",
  description:
    "Browse past issues of the DDE Weekly Top Domains newsletter from Three Eagles Forge.",
  alternates: { canonical: "/newsletter/domains/archive" },
};

function formatPrice(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "-";
  return `$${value.toLocaleString()}`;
}

export default async function DdeArchivePage() {
  const issues = getAllDdeIssueMetas();

  return (
    <div className="mx-auto max-w-4xl space-y-16 px-4 py-16">
      {/* ---------------- Hero ---------------- */}
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          DDE Newsletter Archive
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Past issues of the DDE Weekly Top Domains newsletter. Each issue
          includes a curated shortlist of brandable domains with scores, types,
          pricing, and notes. Public pages show a Top 5 preview; email
          subscribers receive the full list.
        </p>
        <Link
          href="/newsletter/domains"
          className="text-sm text-muted-foreground underline-offset-2 hover:underline"
        >
          ← Back to newsletter overview
        </Link>
      </section>

      {/* ---------------- Issues List ---------------- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Issues</h2>

        {issues.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No issues found yet. Once the first DDE newsletter run is
            published, you&apos;ll see it listed here.
          </p>
        )}

        {issues.length > 0 && (
          <ul className="space-y-3">
            {issues.map((issue) => (
              <li
                key={issue.slug}
                className="rounded-2xl bg-card p-4 shadow-soft flex flex-col gap-1 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-1">
                  <Link
                    href={`/newsletter/domains/${issue.slug}`}
                    className="text-sm font-medium underline-offset-2 hover:underline"
                  >
                    {issue.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {issue.date} · {issue.shortlistSize} domains · price range{" "}
                    {formatPrice(issue.priceMin)}–{formatPrice(issue.priceMax)}
                  </p>
                </div>
                <div className="mt-2 text-xs text-muted-foreground md:mt-0">
                  Avg price {formatPrice(issue.priceAvg)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
