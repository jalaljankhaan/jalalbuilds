import { NextResponse } from "next/server";
import { getProjects } from "@/lib/services/projectService";

/**
 * GET /api/projects — portfolio cards (anon read via Supabase RLS).
 */
export async function GET() {
  try {
    const projects = await getProjects();
    const payload = projects.map((p) => ({
      id: p.id,
      title: p.title,
      summary: p.summary,
      description: p.description,
      url: p.url,
      tags: p.tags,
    }));
    return NextResponse.json({ projects: payload });
  } catch (error) {
    console.error("GET /api/projects", error);
    return NextResponse.json({ projects: [], error: "failed_to_load" });
  }
}
