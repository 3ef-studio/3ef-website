import Link from "next/link";
import type { Project } from "@/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  const { name, summary, badges = [], status, links, slug } = project;

  return (
    <article className="rounded-2xl bg-card shadow-soft border border-white/5 hover:border-white/10 transition p-5 h-full flex flex-col">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {badges.map((b) => (
          <span key={b} className="text-[11px] px-2 py-1 rounded-full bg-white/5 text-white/80">
            {b}
          </span>
        ))}
        {status !== "active" && (
          <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-white/60">
            {status === "paused" ? "Paused" : "Archived"}
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold">
        <Link href={`/projects/${slug}`} className="hover:underline underline-offset-2">
          {name}
        </Link>
      </h3>
      {summary && <p className="text-muted-foreground mt-2">{summary}</p>}

      <div className="mt-4 text-sm flex flex-wrap gap-3">
        {links?.repo && (
          <Link href={links.repo} className="text-white/80 hover:underline underline-offset-2">
            GitHub →
          </Link>
        )}
        {links?.docs && (
          <Link href={links.docs} className="text-white/80 hover:underline underline-offset-2">
            Docs →
          </Link>
        )}
        {links?.live && (
          <Link href={links.live} className="text-white/80 hover:underline underline-offset-2">
            Live →
          </Link>
        )}
      </div>
    </article>
  );
}
