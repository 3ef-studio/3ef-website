// app/consulting/page.tsx
import ClientEvent from "@/components/ClientEvent";
import CtaTrack from "@/components/CtaTrack";
import LeadForm from "@/components/LeadForm"; // ← NEW


export const metadata = {
  title: "Forge Advisory — 3EF Consulting",
  description:
    "Book a short advisory session with Three Eagles Forge. Quick, focused help for founders and builders who need clarity on architecture, AI integration, or product strategy.",
  alternates: { canonical: "/consulting" },
};

export default function ConsultingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-16 px-4 py-16">
      {/* fire Plausible page-view */}
      <ClientEvent name="consulting_view" />

      {/* ---------------- Hero ---------------- */}
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Forge Advisory Hours for Builders &amp; Founders
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Quick, focused sessions to clarify your architecture, AI approach, or
          product plan. Discuss scope, validate direction, and move forward with
          confidence.
        </p>
        {/* CTA scrolls to the form + tracks click */}
        <CtaTrack
          href="#request"
          src="hero"
          className="inline-block rounded-xl bg-accent px-5 py-3 font-medium text-black shadow-sm transition hover:opacity-90"
        >
          Request a Session
        </CtaTrack>
      </section>

      {/* ---------------- What You Get ---------------- */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">What You Get</h2>
        <ul className="grid gap-6 md:grid-cols-3">
          <li className="rounded-2xl bg-card p-5 shadow-soft">
            <h3 className="font-medium">30-Minute Consultation</h3>
            <p className="text-sm text-muted-foreground">
              Talk through your current challenge and leave with a concrete next
              step or resource list.
            </p>
          </li>
          <li className="rounded-2xl bg-card p-5 shadow-soft">
            <h3 className="font-medium">5-Hour Strategy Sprint</h3>
            <p className="text-sm text-muted-foreground">
              We’ll review code, architecture, or product flow and deliver a
              written summary with recommendations.
            </p>
          </li>
          <li className="rounded-2xl bg-card p-5 shadow-soft">
            <h3 className="font-medium">10-Hour Build Block</h3>
            <p className="text-sm text-muted-foreground">
              Short, high-impact dev work or technical prototyping to unblock
              progress.
            </p>
          </li>
        </ul>
      </section>

      {/* ---------------- Who It's For ---------------- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Who It’s For</h2>
        <p className="text-muted-foreground">
          Early-stage founders, indie developers, and small AI or SaaS teams who
          want a clear path forward without large-agency overhead.
        </p>
      </section>

      {/* ---------------- How It Works ---------------- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How It Works</h2>
        <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
          <li>Submit a brief overview of your project or problem.</li>
          <li>We schedule a 30-minute discovery call.</li>
          <li>
            You receive a concise summary, outline of options, and (if helpful)
            a small-scope engagement proposal.
          </li>
        </ol>
      </section>

      {/* ---------------- Request a Session (Form) ---------------- */}
      <section id="request" className="space-y-4">
        <h2 className="text-xl font-semibold">Request a Session</h2>
        <p className="text-sm text-muted-foreground">
          Tell me a bit about your project. I’ll follow up within 1 business day.
        </p>
        <LeadForm source="consulting_page" />
      </section>

      {/* ---------------- About the Forge ---------------- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">About the Forge</h2>
        <p className="text-muted-foreground">
          Three Eagles Forge is an independent studio. We collaborate with builders to solve technical
          problems fast—drawing on hands-on experience in AI systems, product
          architecture, and startup execution.
        </p>
      </section>

    </div>
  );
}
