"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/utils/env";
import type { Database } from "./types";

let browserClient: SupabaseClient<Database> | null = null;

export function getBrowserSupabaseClient(): SupabaseClient<Database> {
  if (!browserClient) {
    const clientEnv = env.client();

    browserClient = createBrowserClient<Database>(
      clientEnv.NEXT_PUBLIC_SUPABASE_URL,
      clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );
  }

  return browserClient;
}

