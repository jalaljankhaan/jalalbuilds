import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Returns the D1 binding for the current request / async OpenNext context.
 * Prefer async mode so SSG / preview / Workers all resolve bindings correctly.
 */
export async function getDb(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.DB) {
    throw new Error("D1 binding DB is not configured");
  }
  return env.DB;
}

/** Parse a JSON tags column into a string array. */
export function parseTagsJson(value: unknown): string[] {
  if (typeof value !== "string" || value.trim().length === 0) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t): t is string => typeof t === "string" && t.trim().length > 0,
    );
  } catch {
    return [];
  }
}
