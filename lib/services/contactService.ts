import { z } from "zod";
import { getActiveContactPackageLabel } from "./contactPackageService";
import { createSupabaseServerClient } from "./supabaseClient";

/**
 * Data contract for a contact message stored in Supabase.
 * Keep this in sync with the `contact_messages` table.
 */
export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export class InvalidContactPackageError extends Error {
  constructor() {
    super("Invalid or inactive package");
    this.name = "InvalidContactPackageError";
  }
}

/** Thrown when Supabase rejects the insert (RLS, missing table, schema mismatch). */
export class ContactPersistenceError extends Error {
  constructor() {
    super("Failed to persist contact message");
    this.name = "ContactPersistenceError";
  }
}

export const contactInputSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().trim().email().max(255),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(4000),
  packageId: z.string().uuid(),
});

export type ContactInput = z.infer<typeof contactInputSchema>;

export type SaveContactResult = {
  saved: ContactMessage;
  packageLabel: string;
};

function composeStoredMessage(
  subject: string,
  packageLabel: string,
  body: string,
): string {
  return [`Subject: ${subject.trim()}`, `Package: ${packageLabel}`, "", body.trim()].join(
    "\n",
  );
}

export async function saveContactMessage(
  input: ContactInput,
): Promise<SaveContactResult> {
  const parsed = contactInputSchema.parse(input);
  const packageLabel = await getActiveContactPackageLabel(parsed.packageId);

  if (!packageLabel) {
    throw new InvalidContactPackageError();
  }

  const supabase = createSupabaseServerClient();
  const storedMessage = composeStoredMessage(
    parsed.subject,
    packageLabel,
    parsed.message,
  );

  /**
   * Insert without `.select()`: with RLS, anon can INSERT but must not SELECT rows
   * (otherwise we'd need a policy that exposes all leads). We generate `id` on the
   * server and return it to the client.
   */
  // Web Crypto — preferred on Cloudflare Workers (nodejs_compat not required for UUID)
  const id = crypto.randomUUID();
  const name = parsed.name.trim();
  const email = parsed.email.toLowerCase();

  const { error } = await supabase.from("contact_messages").insert({
    id,
    name,
    email,
    message: storedMessage,
  });

  if (error) {
    console.error("contact_messages insert", error);
    throw new ContactPersistenceError();
  }

  return {
    saved: {
      id,
      name,
      email,
      message: storedMessage,
      created_at: new Date().toISOString(),
    } as ContactMessage,
    packageLabel,
  };
}
