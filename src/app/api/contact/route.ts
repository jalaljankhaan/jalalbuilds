import { NextResponse, type NextRequest } from "next/server";
import {
  saveContactMessage,
  contactInputSchema,
  InvalidContactPackageError,
  ContactPersistenceError,
} from "@/lib/services/contactService";
import {
  ContactEmailDeliveryError,
  sendContactNotification,
} from "@/lib/services/contactEmailService";

function isZodValidationError(error: unknown): boolean {
  return error instanceof Error && "issues" in (error as { issues?: unknown });
}

/**
 * POST /api/contact — persist the inquiry to D1, then notify the team by email.
 */
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = contactInputSchema.parse(json);
    const saved = await saveContactMessage(parsed);
    await sendContactNotification(parsed, saved);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (isZodValidationError(error)) {
      return NextResponse.json(
        { error: "Please check the form and try again." },
        { status: 400 },
      );
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
    if (error instanceof ContactEmailDeliveryError) {
      return NextResponse.json(
        {
          error:
            "Your message was saved, but the notification could not be sent. Please try again.",
        },
        { status: 502 },
      );
    }
    console.error("POST /api/contact", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
