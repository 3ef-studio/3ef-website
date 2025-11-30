// app/portfolio/page.tsx
import { portfolioSections } from "@/lib/portfolio";
import PortfolioClient from "./PortfolioClient";

export const metadata = {
  title: "Projects — Three Eagles Forge Studio",
  description:
    "A working portfolio of Three Eagles Forge Studio projects: VeilMark, Domain Discovery Engine, csvClean, and agentic experiments.",
};

export default function PortfolioPage() {
  // Server component: no hooks here.
  return <PortfolioClient sections={portfolioSections} />;
}
