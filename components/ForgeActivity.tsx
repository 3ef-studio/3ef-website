// components/ForgeActivity.tsx
"use client";
import { useEffect, useState } from "react";

type BacklogItem = {
  project: string;
  major_goal: string;
  details?: string[];
  status?: "Queued" | "In Progress" | "Polish" | "Done";
  target_sprint?: string;
};
type Backlog = { updated_at: string; items: BacklogItem[] };

type CommitItem = {
  project: string;
  repo: string;
  sha: string;
  message: string;
  timestamp: string;
  branch: string;
  url?: string;
};
type Commits = { generated_at: string; items: CommitItem[] };

export default function ForgeActivity() {
  const [data, setData] = useState<{ backlog: Backlog; commits: Commits } | null>(null);

  useEffect(() => {
    fetch("/api/forge").then(r => r.json()).then(setData).catch(() => setData(null));
  }, []);

  if (!data) return null;

  return (
    <section className="rounded-2xl bg-card shadow-soft p-6">
      <h2 className="text-2xl font-semibold">The Forge in Motion</h2>
      <p className="text-sm text-muted-foreground">Ideas heating up and creations cooling down.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Upcoming Work */}
       <div className="rounded-xl border p-4 max-h-[400px] overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Upcoming Work</h3>
            <span className="text-xs text-muted-foreground">
              Updated {new Date(data.backlog.updated_at).toLocaleDateString()}
            </span>
          </div>
          <ul className="space-y-3">
            {data.backlog.items.slice(0, 7).map((it, i) => (
              <li key={i} className="rounded-lg bg-background p-3 border">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{it.project}</div>
                  {it.status && (
                    <span className="text-xs px-2 py-1 rounded-full border">
                      {it.status}
                    </span>
                  )}
                </div>
                <div className="text-sm mt-1">{it.major_goal}</div>
                {it.details?.length ? (
                  <ul className="text-xs text-muted-foreground mt-1 list-disc pl-4">
                    {it.details.slice(0, 3).map((d, j) => <li key={j}>{d}</li>)}
                  </ul>
                ) : null}
                {it.target_sprint && (
                  <div className="text-[11px] text-muted-foreground mt-1">
                    Target: {it.target_sprint}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Recently Forged */}
        <div className="rounded-xl border p-4 max-h-[400px] overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Recently Forged</h3>
            <span className="text-xs text-muted-foreground">
              Refreshed {new Date(data.commits.generated_at).toLocaleDateString()}
            </span>
          </div>
          <ul className="space-y-3">
            {data.commits.items.slice(0, 10).map((c, i) => (
              <li key={i} className="rounded-lg bg-background p-3 border">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{c.project}</div>
                  <span className="text-xs">{c.sha}</span>
                </div>
                <div className="text-sm mt-1">{c.message}</div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  {c.repo} • {new Date(c.timestamp).toLocaleString()} • {c.branch}
                </div>
                {c.url && (
                  <a href={c.url} className="text-xs underline mt-1 inline-block" target="_blank" rel="noreferrer">
                    View commit
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
