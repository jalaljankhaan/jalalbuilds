import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { ContactInput, SaveContactResult } from "./contactService";

const CONTACT_RECIPIENT = "developers@jnovasystems.com";
const CONTACT_SENDER = "website@jnovasystems.com";

export class ContactEmailDeliveryError extends Error {
  constructor() {
    super("Failed to deliver contact notification");
    this.name = "ContactEmailDeliveryError";
  }
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function composeContactNotification(
  input: ContactInput,
  result: SaveContactResult,
): EmailMessageBuilder {
  const subject = singleLine(input.subject);
  const message = input.message.trim();
  const fields = [
    ["Message ID", result.saved.id],
    ["Name", result.saved.name],
    ["Email", result.saved.email],
    ["Subject", subject],
    ["Package", result.packageLabel],
    ["Submitted", result.saved.created_at],
  ] as const;

  const text = [
    "New project inquiry from jnovasystems.com",
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
  ].join("\n");

  const htmlFields = fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return {
    to: CONTACT_RECIPIENT,
    from: { email: CONTACT_SENDER, name: "J Nova Systems Website" },
    replyTo: result.saved.email,
    subject: `[Website inquiry] ${subject}`,
    text,
    html: [
      '<main style="font-family:Arial,sans-serif;color:#102019;line-height:1.5">',
      "<h1>New project inquiry</h1>",
      `<table style="border-collapse:collapse">${htmlFields}</table>`,
      "<h2>Message</h2>",
      `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      "</main>",
    ].join(""),
  };
}

export async function sendContactNotification(
  input: ContactInput,
  result: SaveContactResult,
): Promise<string> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env.EMAIL) {
      throw new Error("Email binding EMAIL is not configured");
    }

    const response = await env.EMAIL.send(composeContactNotification(input, result));
    return response.messageId;
  } catch (error) {
    console.error("contact email delivery", {
      messageId: result.saved.id,
      error: error instanceof Error ? error.message : "Unknown email delivery error",
    });
    throw new ContactEmailDeliveryError();
  }
}
