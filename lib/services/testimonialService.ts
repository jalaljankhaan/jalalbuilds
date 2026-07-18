import { getDb } from "@/lib/db/d1";

/**
 * Public representation of a testimonial.
 * Mirrors the `testimonials` table.
 */
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string | null;
  quote: string;
  order_index: number;
};

type TestimonialRow = {
  id: string;
  name: string;
  role: string;
  company: string | null;
  quote: string;
  order_index: number;
};

/**
 * Retrieves client testimonials for display.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const db = await getDb();
    const { results } = await db
      .prepare(
        `SELECT id, name, role, company, quote, order_index
         FROM testimonials
         WHERE is_visible = 1
         ORDER BY order_index ASC`,
      )
      .all<TestimonialRow>();

    return results ?? [];
  } catch (e) {
    console.error("getTestimonials unexpected", e);
    throw new Error("Failed to load testimonials.");
  }
}
