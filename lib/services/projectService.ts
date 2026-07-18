import { getDb, parseTagsJson } from "@/lib/db/d1";

/**
 * Public shape of a project as used by the frontend.
 * Keep this aligned with the `projects` table.
 */
export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string | null;
  url: string | null;
  tags: string[];
  featured: boolean;
  sort_order: number;
  created_at: string;
};

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string | null;
  url: string | null;
  tags: string;
  featured: number;
  sort_order: number;
  created_at: string;
};

/**
 * Fetches portfolio projects, ordered featured first then sort_order.
 * Returns an empty list on failure so the page still renders.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const db = await getDb();
    const { results } = await db
      .prepare(
        `SELECT id, slug, title, summary, description, url, tags, featured, sort_order, created_at
         FROM projects
         ORDER BY featured DESC, sort_order ASC`,
      )
      .all<ProjectRow>();

    return (results ?? []).map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      summary: r.summary,
      description: r.description,
      url: r.url,
      tags: parseTagsJson(r.tags),
      featured: Boolean(r.featured),
      sort_order: r.sort_order,
      created_at: r.created_at,
    }));
  } catch (e) {
    console.error("getProjects unexpected", e);
    return [];
  }
}
