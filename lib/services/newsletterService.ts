import { z } from "zod";
import { createSupabaseServerClient } from "./supabaseClient";

/**
 * Shape of a newsletter subscriber as stored in Supabase.
 */
export type NewsletterSubscriber = {
  id: string;
  email: string;
  created_at: string;
};

export const newsletterInputSchema = z.object({
  email: z.string().email().max(255),
});

export type NewsletterInput = z.infer<typeof newsletterInputSchema>;

/**
 * Subscribes an email address to the newsletter.
 *
 * Security:
 * - Validates the email format.
 * - Treats duplicate subscriptions as a success to avoid leaking
 *   information about existing subscribers.
 */
export async function subscribeToNewsletter(
  input: NewsletterInput,
): Promise<NewsletterSubscriber | null> {
  const parsed = newsletterInputSchema.parse(input);
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert({
      email: parsed.email.toLowerCase(),
    })
    .select("*")
    .single();

  if (error) {
    // If there's a unique constraint on email, treat a conflict as a no-op.
    if (typeof (error as { code?: string }).code === "string" && (error as { code?: string }).code === "23505") {
      return null;
    }
    throw new Error("Failed to subscribe to newsletter.");
  }

  return (data ?? null) as NewsletterSubscriber | null;
}

