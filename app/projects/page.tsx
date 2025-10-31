import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export const metadata = {
  title: "Projects • Three Eagles Forge Studio",
  description: "Active and archived projects from 3EF.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  const ordered = [...projects].sort((a, b) => {
    // active > paused > archived, then alpha by name
    const rank = (s: string) => (s === "active" ? 0 : s === "paused" ? 1 : 2);
    const r = rank(a.status) - rank(b.status);
    return r !== 0 ? r : a.name.localeCompare(b.name);
  });

  return (
    <div className="py-10 px-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="text-muted-foreground max-w-2xl">
          Experiments and tools in various stages — active, paused, or archived.
        </p>
      </header>

      <section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
