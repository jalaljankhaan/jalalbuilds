import { getDb } from "@/lib/db/d1";

export type ContactPackageOption = {
  id: string;
  label: string;
};

type ContactPackageRow = {
  id: string;
  label: string;
};

/** Active packages for the contact form, ordered for display. */
export async function getActiveContactPackages(): Promise<ContactPackageOption[]> {
  try {
    const db = await getDb();
    const { results } = await db
      .prepare(
        `SELECT id, label
         FROM contact_packages
         WHERE is_active = 1
         ORDER BY sort_order ASC`,
      )
      .all<ContactPackageRow>();

    return results ?? [];
  } catch (e) {
    console.error("getActiveContactPackages unexpected", e);
    return [];
  }
}

/** Resolve label for an active package id (used when saving a lead). */
export async function getActiveContactPackageLabel(
  packageId: string,
): Promise<string | null> {
  try {
    const db = await getDb();
    const row = await db
      .prepare(
        `SELECT label
         FROM contact_packages
         WHERE id = ? AND is_active = 1
         LIMIT 1`,
      )
      .bind(packageId)
      .first<{ label: string }>();

    return row?.label ?? null;
  } catch (e) {
    console.error("getActiveContactPackageLabel unexpected", e);
    return null;
  }
}
