import { createSupabaseServerClient } from "./supabaseClient";

/**
 * Public shape of a blog post for the home page carousel.
 * Mirrors `blog_posts` (same columns as `projects` for consistency).
 */
export type BlogPost = {
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

/** Fetches blog posts for the horizontal section; featured first, then sort_order. */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "id, slug, title, summary, description, url, tags, featured, sort_order, created_at",
      )
      .order("featured", { ascending: false })
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("getBlogPosts", error);
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
    console.error("getBlogPosts unexpected", e);
    return [];
  }
}
