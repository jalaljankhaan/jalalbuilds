import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/services/blogPostService";

/**
 * GET /api/blog-posts — blog cards (anon read via Supabase RLS).
 */
export async function GET() {
  try {
    const posts = await getBlogPosts();
    const payload = posts.map((p) => ({
      id: p.id,
      title: p.title,
      summary: p.summary,
      description: p.description,
      url: p.url,
      tags: p.tags,
    }));
    return NextResponse.json({ posts: payload });
  } catch (error) {
    console.error("GET /api/blog-posts", error);
    return NextResponse.json({ posts: [], error: "failed_to_load" });
  }
}
