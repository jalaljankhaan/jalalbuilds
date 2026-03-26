import { createSupabaseServerClient } from "./supabaseClient";

export type ContactPackageOption = {
  id: string;
  label: string;
};

/** Active packages for the contact form, ordered for display. */
export async function getActiveContactPackages(): Promise<ContactPackageOption[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("contact_packages")
      .select("id, label")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("getActiveContactPackages", error);
      return [];
    }

    if (!Array.isArray(data)) {
      return [];
    }

    return data as ContactPackageOption[];
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
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("contact_packages")
      .select("label")
      .eq("id", packageId)
      .eq("is_active", true)
      .maybeSingle();

    if (error || !data?.label) {
      return null;
    }

    return data.label as string;
  } catch (e) {
    console.error("getActiveContactPackageLabel unexpected", e);
    return null;
  }
}
