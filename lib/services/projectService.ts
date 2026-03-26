import { createSupabaseServerClient } from "./supabaseClient";

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

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((t): t is string => typeof t === "string" && t.trim().length > 0);
}

/**
 * Fetches all portfolio projects (public read via RLS), ordered featured first then sort_order.
 *
 * Returns an empty list on failure so the page still renders.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("projects")
      .select(
        "id, slug, title, summary, description, url, tags, featured, sort_order, created_at",
      )
      .order("featured", { ascending: false })
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("getProjects", error);
      return [];
    }

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((row) => {
      const r = row as Record<string, unknown>;
      return {
        id: r.id as string,
        slug: r.slug as string,
        title: r.title as string,
        summary: r.summary as string,
        description: typeof r.description === "string" ? r.description : null,
        url: typeof r.url === "string" ? r.url : null,
        tags: normalizeTags(r.tags),
        featured: Boolean(r.featured),
        sort_order: typeof r.sort_order === "number" ? r.sort_order : 100,
        created_at: typeof r.created_at === "string" ? r.created_at : new Date().toISOString(),
      };
    });
  } catch (e) {
    console.error("getProjects unexpected", e);
    return [];
  }
}
