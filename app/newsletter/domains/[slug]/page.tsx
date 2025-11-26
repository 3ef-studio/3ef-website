// app/newsletter/domains/[slug]/page.tsx

import { notFound } from "next/navigation";
import DDENewsletterForm from "@/components/DDENewsletterForm";
import {
  getAllDdeIssueMetas,
  getDdeIssueBySlug,
} from "@/lib/newsletter/dde";

function formatPrice(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "-";
  return `$${value.toLocaleString()}`;
}

function formatScore(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "-";
  return value.toFixed(2);
}

// --- Metadata: note params is a Promise and must be awaited ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const issue = getDdeIssueBySlug(slug);

  if (!issue) {
    return {
      title: "DDE Weekly Top Domains — 3EF",
    };
  }

  return {
    title: `${issue.meta.title} — 3EF`,
    description:
      "Top 5 public preview for this DDE Weekly Top Domains issue. Full shortlist available by email.",
    alternates: {
      canonical: `/newsletter/domains/${issue.meta.slug}`,
    },
  };
}

// Optional: static generation of known slugs
export async function generateStaticParams() {
  const metas = getAllDdeIssueMetas();
  return metas.map((m) => ({ slug: m.slug }));
}

// --- Page: params is also a Promise here ---
export default async function DdeIssuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const issue = getDdeIssueBySlug(slug);

  if (!issue) {
    notFound();
  }

  const { meta, preview } = issue;
  const hasPreview = preview.length > 0;

  return (
    <div className="mx-auto max-w-4xl space-y-16 px-4 py-16">
      {/* ---------------- Header ---------------- */}
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          DDE Weekly Top Domains
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          {meta.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          Issue date: <span className="font-mono">{meta.date}</span> ·{" "}
          {meta.shortlistSize} domains · price range{" "}
          {formatPrice(meta.priceMin)}–{formatPrice(meta.priceMax)} · avg{" "}
          {formatPrice(meta.priceAvg)}
        </p>
        <p className="max-w-2xl text-sm text-muted-foreground">
          This page shows the public Top 5 preview for this issue. Email
          subscribers receive the full shortlist with 15–20 domains, scores,
          types, pricing, and notes.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="/newsletter/domains"
            className="text-sm text-muted-foreground underline-offset-2 hover:underline"
          >
            ← Back to newsletter overview
          </a>
        </div>
      </section>

      {/* ---------------- Top 5 Table ---------------- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Top 5 Preview</h2>

        {!hasPreview && (
          <p className="text-sm text-muted-foreground">
            Preview data isn&apos;t available for this issue yet.
          </p>
        )}

        {hasPreview && (
          <div className="overflow-x-auto rounded-2xl bg-card p-5 shadow-soft">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/70">
                  <th className="pb-2 pr-4 font-semibold">Domain</th>
                  <th className="pb-2 pr-4 font-semibold">Type</th>
                  <th className="pb-2 pr-4 font-semibold">Grade</th>
                  <th className="pb-2 pr-4 font-semibold">Price</th>
                  <th className="pb-2 pr-4 font-semibold">Score</th>
                  <th className="pb-2 pr-4 font-semibold">Note</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((d) => (
                  <tr
                    key={d.domain}
                    className="border-b border-border/40 last:border-0"
                  >
                    <td className="py-2 pr-4 font-medium">{d.domain}</td>
                    <td className="py-2 pr-4 text-xs font-mono text-muted-foreground">
                      {d.type}
                    </td>
                    <td className="py-2 pr-4 text-sm">{d.grade}</td>
                    <td className="py-2 pr-4 text-sm">
                      {formatPrice(d.price_suggested)}
                    </td>
                    <td className="py-2 pr-4 text-sm">
                      {formatScore(d.final_score)}
                    </td>
                    <td className="py-2 pr-4 text-sm text-muted-foreground">
                      {d.insight}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          To see the full shortlist for this issue (typically 15–20 domains),
          subscribe below and get the complete issue by email.
        </p>
      </section>

      {/* ---------------- Subscribe ---------------- */}
      <section id="subscribe" className="space-y-4">
        <h2 className="text-xl font-semibold">Get the Full Weekly List</h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Each week, you&apos;ll receive the full DDE shortlist with scores,
          types, pricing, and notes. No spam, no resale of your email—just
          speculative naming ideas and the occasional 3EF studio update.
        </p>

        <DDENewsletterForm source={`DDE Newsletter Issue ${meta.slug}`} />

        <p className="text-xs text-muted-foreground">
          This is not financial advice. Domain availability and pricing are
          heuristic and can change at any time.
        </p>
      </section>
    </div>
  );
}
