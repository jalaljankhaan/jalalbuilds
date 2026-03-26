import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/utils/env";

/**
 * Centralized factory for a server-side Supabase client.
 *
 * Design decisions:
 * - Uses the public anon key on the server by default. This keeps the
 *   configuration simple and safe while you rely on Supabase RLS rules.
 * - Reads configuration via the typed env helpers so the rest of the app
 *   does not touch process.env directly (single responsibility).
 * - Exposed via a function instead of a global instance to make it easier
 *   to swap to per-request clients or service-role keys later.
 * - Uses untyped client until `npx supabase gen types` generates schema.
 *   Service layer enforces domain types on responses.
 */
export function createSupabaseServerClient(): SupabaseClient {
  const serverEnv = env.server();

  return createClient(
    serverEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
      },
    },
  );
}

