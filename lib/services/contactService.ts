import { z } from "zod";
import { getDb } from "@/lib/db/d1";
import { getActiveContactPackageLabel } from "./contactPackageService";

/**
 * Data contract for a contact message stored in D1.
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

/** Thrown when D1 rejects the insert (constraint / schema mismatch). */
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

/**
 * Persists a contact lead.
 * Intentionally INSERT-only — no SELECT on contact_messages from public APIs.
 */
export async function saveContactMessage(
  input: ContactInput,
): Promise<SaveContactResult> {
  const parsed = contactInputSchema.parse(input);
  const packageLabel = await getActiveContactPackageLabel(parsed.packageId);

  if (!packageLabel) {
    throw new InvalidContactPackageError();
  }

  const storedMessage = composeStoredMessage(
    parsed.subject,
    packageLabel,
    parsed.message,
  );

  const id = crypto.randomUUID();
  const name = parsed.name.trim();
  const email = parsed.email.toLowerCase();
  const created_at = new Date().toISOString();

  try {
    const db = await getDb();
    const result = await db
      .prepare(
        `INSERT INTO contact_messages (id, name, email, message, created_at)
         VALUES (?, ?, ?, ?, ?)`,
      )
      .bind(id, name, email, storedMessage, created_at)
      .run();

    if (!result.success) {
      throw new ContactPersistenceError();
    }
  } catch (error) {
    if (error instanceof ContactPersistenceError) throw error;
    console.error("contact_messages insert", error);
    throw new ContactPersistenceError();
  }

  return {
    saved: {
      id,
      name,
      email,
      message: storedMessage,
      created_at,
    },
    packageLabel,
  };
}
