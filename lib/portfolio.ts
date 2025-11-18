// lib/portfolio.ts

export interface PortfolioImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface PortfolioSection {
  /** Anchor id for jump navigation, e.g. #veilmark */
  id: string;
  /** Display title for the section */
  title: string;
  /** Optional short tagline or subheading */
  tagline?: string;
  /** Short overview paragraph */
  summary: string;
  /** Key technologies / tools involved */
  techStack: string[];
  /** Bullet points describing design, implementation, or impact */
  details: string[];
  /** What you were trying to learn or prove with this project */
  learningFocus?: string[];
  /** Strategy, market positioning, or product-thinking notes */
  strategyNotes?: string[];
  /** Next steps you’re considering or have queued */
  nextSteps?: string[];
  /** Screenshots, diagrams, etc. */
  images?: PortfolioImage[];
}

export const portfolioSections: PortfolioSection[] = [
  {
    id: "veilmark",
    title: "VeilMark — AI Authorship Detection",
    tagline: "An indie AI toolchain for detecting AI-generated text and images.",
    summary:
      "VeilMark is an AI-authorship detection platform combining local ML models with Discord bot tooling. It helps community moderators and builders understand when content is likely AI-generated, without turning moderation into a black box.",
    techStack: [
      "Python",
      "PyTorch",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Discord Bot",
      "Render",
      "Neon",
    ],
    details: [
      "Built text and image classifiers to distinguish human vs. AI-generated content.",
      "Integrated classifiers into a Discord bot with slash commands for checks and configuration.",
      "Migrated from SQLite to PostgreSQL to support growth across multiple communities.",
      "Designed a pricing and feature-tier model with room for self-hosted deployments.",
    ],
    learningFocus: [
      "Designing AI-powered features that remain transparent and explainable to end users.",
      "Balancing local model performance, latency, and hosting costs in an indie setting.",
      "Using Discord as both a delivery channel and a product discovery surface.",
    ],
    strategyNotes: [
      "Positioned as a practical moderation aid for community owners, not a generic \"AI detector.\"",
      "Prioritized self-hosting and low-cost infrastructure to keep unit economics sustainable.",
    ],
    nextSteps: [
      "Expand logging and evidence views so users can understand why a prediction was made.",
      "Refine model training pipelines and automate dataset refreshes.",
    ],
    images: [
      {
        src: "/images/portfolio/veilmark-dashboard-placeholder.png",
        alt: "Placeholder image for VeilMark dashboard",
        caption: "Dashboard + Discord workflows (placeholder; to be replaced with real screenshots).",
      },
    ],
  },
  {
    id: "dde",
    title: "Domain Discovery Engine — Brandable Domain Scoring",
    tagline: "A pipeline for generating, enriching, and scoring brandable domain names.",
    summary:
      "The Domain Discovery Engine (DDE) is a multi-stage pipeline that generates domain candidates, enriches them with availability and SEO signals, and scores them for brandability and potential resale value.",
    techStack: [
      "Python",
      "Pandas",
      "Next.js",
      "TypeScript",
      "Neon Postgres",
      "GitHub Actions",
    ],
    details: [
      "Implemented a scoring pipeline that blends LLM signals with heuristic rules and availability checks.",
      "Automated daily/weekly runs via GitHub Actions to process large candidate lists.",
      "Captured run outputs and top-20 recommendations in structured formats for review and purchase decisions.",
      "Explored custom parking/lander pages for portfolio domains and newsletter integration.",
    ],
    learningFocus: [
      "Combining LLM-based evaluation with deterministic heuristics and real-world constraints.",
      "Designing scoring functions that stay interpretable while juggling multiple signals.",
    ],
    strategyNotes: [
      "Treats domains as a long-tail, probabilistic asset class—focus is on process quality, not one-off bets.",
      "Explores how small indie tooling can support a niche but systematic investing workflow.",
    ],
    nextSteps: [
      "Automate parts of pricing recommendations and listing flow.",
      "Build a small public-facing lander for the best domains with email capture and newsletter tie-in.",
    ],
    images: [
      {
        src: "/images/portfolio/dde-run-summary-placeholder.png",
        alt: "Placeholder image for Domain Discovery Engine scoring summary",
        caption: "Sample scoring summary output (placeholder).",
      },
    ],
  },
  {
    id: "csv-tools",
    title: "csvClean & Data Utilities — Pragmatic Data Cleanup Tools",
    tagline: "Small, focused tools for cleaning, deduplicating, and reshaping CSV data.",
    summary:
      "csvClean and related utilities are targeted tools for cleaning and transforming CSV files, aimed at analysts, indie hackers, and builders who need quick, repeatable scripts rather than full-blown data platforms.",
    techStack: ["Python", "Pandas", "CLI tooling", "FastAPI (planned)", "Payhip/Gumroad"],
    details: [
      "Created reusable scripts to clean, deduplicate, and normalize messy CSV inputs.",
      "Packaged the most useful workflows into sharable bundles for non-engineering users.",
      "Explored distribution via lightweight landing pages and digital product platforms.",
    ],
    learningFocus: [
      "Testing whether small, opinionated utilities can provide enough value to justify micro-transactions.",
      "Finding the right balance between pure CLI tools and hosted/API-based offerings.",
    ],
    strategyNotes: [
      "Intended as a low-friction way to validate pricing and distribution mechanics for tiny tools.",
      "Acts as a testbed for future 3EF products around data quality and automation.",
    ],
    nextSteps: [
      "Expose common workflows via a simple HTTP API.",
      "Integrate error reporting and lightweight telemetry to understand usage patterns.",
    ],
    images: [
      {
        src: "/images/portfolio/csv-tools-placeholder.png",
        alt: "Placeholder image for CSV tools",
        caption: "Example CSV transformation view (placeholder).",
      },
    ],
  },
  {
    id: "agentic-experiments",
    title: "Agentic Experiments — PostStream & Multi-Agent Prototypes",
    tagline: "Exploring agentic patterns for content workflows and decision support.",
    summary:
      "Agentic Experiments is a collection of prototypes exploring how multi-step and multi-agent workflows can support content creation, evaluation, and strategic decision-making for indie products.",
    techStack: [
      "TypeScript",
      "Python",
      "Next.js",
      "OpenAI API",
      "LangGraph / agentic patterns (in progress)",
    ],
    details: [
      "Designed PostStream concepts for turning raw ideas into structured content across channels.",
      "Prototyped evaluation loops for grading outputs (e.g., domain candidates, content drafts).",
      "Used sprint-based learning cycles to test different agent patterns and memory strategies.",
    ],
    learningFocus: [
      "Understanding when agents genuinely add value vs. when a simple prompt is enough.",
      "Balancing automation with control so users stay in the loop on important decisions.",
    ],
    strategyNotes: [
      "Serves as a sandbox that feeds ideas back into shipped tools like VeilMark and DDE.",
      "Helps refine a reusable pattern for future 3EF products that need multi-step AI workflows.",
    ],
    nextSteps: [
      "Solidify one or two concrete agent flows and package them as user-facing features.",
      "Document the most useful patterns as part of the 3EF blog and learning series.",
    ],
    images: [
      {
        src: "/images/portfolio/agentic-experiments-placeholder.png",
        alt: "Placeholder image for agentic experiment flows",
        caption: "High-level flow diagram for an agentic content loop (placeholder).",
      },
    ],
  },
];
