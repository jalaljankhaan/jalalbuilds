import { z } from "zod";

/**
 * Trims whitespace and removes one layer of surrounding " or ' quotes.
 * Common mistakes in .env.local break Zod's URL check otherwise.
 */
function normalizeEnvString(value: string | undefined): string {
  if (value == null) return "";
  let s = value.trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

// Separate server schema so we can safely add server-only vars later
const serverEnvSchema = clientEnvSchema.extend({
  // Example placeholder for future server-only configuration:
  // SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

function parseClientEnv(): ClientEnv {
  return clientEnvSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: normalizeEnvString(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
    ),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: normalizeEnvString(
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ),
  });
}

function parseServerEnv(): ServerEnv {
  return serverEnvSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: normalizeEnvString(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
    ),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: normalizeEnvString(
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ),
    // SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}

export const env = {
  client: parseClientEnv,
  server: parseServerEnv,
} as const;

