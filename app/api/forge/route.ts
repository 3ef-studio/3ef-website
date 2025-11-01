import { NextResponse } from "next/server";
import backlog from "@/data/backlog.json";
import recent from "@/data/recent_commits.json";

export const revalidate = 600; // 10 minutes (affects static caching of this route)

export async function GET() {
  return NextResponse.json({
    backlog,
    commits: recent
  });
}
