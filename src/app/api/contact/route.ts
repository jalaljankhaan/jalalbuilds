import { NextResponse, type NextRequest } from "next/server";
import {
  saveContactMessage,
  contactInputSchema,
  InvalidContactPackageError,
  ContactPersistenceError,
} from "@/lib/services/contactService";

function isZodValidationError(error: unknown): boolean {
  return error instanceof Error && "issues" in (error as { issues?: unknown });
}

/**
 * POST /api/contact — persist lead to Supabase (anon insert via RLS).
 */
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = contactInputSchema.parse(json);
    await saveContactMessage(parsed);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (isZodValidationError(error)) {
      return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
    }
    if (error instanceof InvalidContactPackageError) {
      return NextResponse.json(
        { error: "Invalid or inactive package selection." },
        { status: 400 },
      );
    }
    if (error instanceof ContactPersistenceError) {
      return NextResponse.json(
        { error: "Could not save your message. Please try again later." },
        { status: 500 },
      );
    }
    console.error("POST /api/contact", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
