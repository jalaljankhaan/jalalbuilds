import { z } from "zod";

const emailField = z.string().trim().email().max(255);

/** Matches server-side Zod email rules for the contact form. */
export function isValidEmail(value: string): boolean {
  return emailField.safeParse(value).success;
}
