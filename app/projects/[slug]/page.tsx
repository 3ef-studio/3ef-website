import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug } from "@/lib/projects";
import Link from "next/link";
import type { Project } from "@/types/project";

type Params = { slug: string };
type PageProps = { params: Promise<Params> }; // params is a Promise in your setup

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const title = `${project.name} • Three Eagles Forge`;
  const description = project.summary ?? "A 3EF project.";
  return {
    title,
    description,
    openGraph: { title, description, type: "article", url: `/projects/${slug}` }
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const { name, summary, badges = [], status, links, details, highlights } = project as Project;

  return (
    <div className="py-10 px-6 space-y-6">
      <nav className="text-sm text-muted-foreground">
        <Link href="/projects" className="underline-offset-2 hover:underline">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-white/80">{name}</span>
      </nav>

      <header className="space-y-3">
        <div className="flex flex-wrap gap-2">
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

        <h1 className="text-3xl font-semibold">{name}</h1>
        {summary && <p className="text-muted-foreground max-w-2xl">{summary}</p>}
      </header>

      {details && (
        <section className="space-y-2 max-w-2xl">
          <h2 className="text-lg font-semibold">Details</h2>
          <p className="text-muted-foreground">{details}</p>
        </section>
      )}

      {highlights?.length ? (
        <section className="space-y-3 max-w-2xl">
          <h2 className="text-lg font-semibold">Highlights</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            {highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </section>
      ) : null}

      {(links?.repo || links?.docs || links?.live) && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Links</h2>
          <div className="text-sm flex flex-wrap gap-4">
            {links.repo && <Link href={links.repo} className="hover:underline underline-offset-2">GitHub →</Link>}
            {links.docs && <Link href={links.docs} className="hover:underline underline-offset-2">Docs →</Link>}
            {links.live && <Link href={links.live} className="hover:underline underline-offset-2">Live →</Link>}
          </div>
        </section>
      )}
    </div>
  );
}
