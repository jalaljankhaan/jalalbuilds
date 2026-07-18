import { getDb, parseTagsJson } from "@/lib/db/d1";

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

type BlogPostRow = {
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

/** Fetches blog posts for the horizontal section; featured first, then sort_order. */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const db = await getDb();
    const { results } = await db
      .prepare(
        `SELECT id, slug, title, summary, description, url, tags, featured, sort_order, created_at
         FROM blog_posts
         ORDER BY featured DESC, sort_order ASC`,
      )
      .all<BlogPostRow>();

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
    console.error("getBlogPosts unexpected", e);
    return [];
  }
}
