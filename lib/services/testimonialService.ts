import { createSupabaseServerClient } from "./supabaseClient";

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

/**
 * Retrieves client testimonials for display.
 *
 * Design:
 * - Encapsulates ordering and filtering logic so the UI remains simple.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_visible", true)
    .order("order_index", { ascending: true });

  if (error || !data) {
    throw new Error("Failed to load testimonials.");
  }

  return data as Testimonial[];
}

