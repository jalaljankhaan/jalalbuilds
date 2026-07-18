import { z } from "zod";
import { getDb } from "@/lib/db/d1";

/**
 * Shape of a newsletter subscriber as stored in D1.
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
 * - INSERT-only from public callers (no SELECT of the full list).
 */
export async function subscribeToNewsletter(
  input: NewsletterInput,
): Promise<NewsletterSubscriber | null> {
  const parsed = newsletterInputSchema.parse(input);
  const email = parsed.email.toLowerCase();
  const id = crypto.randomUUID();
  const created_at = new Date().toISOString();

  try {
    const db = await getDb();
    await db
      .prepare(
        `INSERT INTO newsletter_subscribers (id, email, created_at)
         VALUES (?, ?, ?)`,
      )
      .bind(id, email, created_at)
      .run();

    return { id, email, created_at };
  } catch (error) {
    // SQLite unique constraint → treat as success (no info leak)
    const message = error instanceof Error ? error.message : String(error);
    if (/UNIQUE/i.test(message)) {
      return null;
    }
    console.error("newsletter_subscribers insert", error);
    throw new Error("Failed to subscribe to newsletter.");
  }
}
