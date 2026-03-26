import { NextResponse } from "next/server";
import { getActiveContactPackages } from "@/lib/services/contactPackageService";

/**
 * GET /api/contact-packages — active package options for the contact form.
 */
export async function GET() {
  try {
    const packages = await getActiveContactPackages();
    return NextResponse.json({ packages });
  } catch (error) {
    console.error("GET /api/contact-packages", error);
    return NextResponse.json({ packages: [], error: "failed_to_load" });
  }
}
