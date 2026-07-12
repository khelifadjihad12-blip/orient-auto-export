/**
 * WhatsApp Business helpers.
 *
 * The phone number is the company's WhatsApp Business line (international
 * format, digits only). It is configurable via the `NEXT_PUBLIC_WHATSAPP_NUMBER`
 * env var so production deployments can change it without a code edit.
 */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "213780442267";

export const WHATSAPP_DISPLAY = "+213 780 442 267";

/** Default pre-filled message used by generic WhatsApp CTAs. */
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello HAKO AUTOMOBILE,\n\nI would like to receive a quotation for importing a brand-new Chinese vehicle to Algeria. Please share your available models, pricing and lead times.\n\nThank you.";

/**
 * Build a wa.me deep link with a pre-filled, URL-encoded message.
 * Works on both desktop (web.whatsapp.com) and mobile (app).
 */
export function buildWhatsAppLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/** Pre-filled message for a specific vehicle inquiry. */
export function vehicleWhatsAppMessage(opts: {
  vehicleName?: string;
  brandName?: string;
  quantity?: number;
}): string {
  const lines = [
    "Hello HAKO AUTOMOBILE,",
    "",
    "I am interested in the following vehicle:",
  ];
  if (opts.brandName) lines.push(`• Brand: ${opts.brandName}`);
  if (opts.vehicleName) lines.push(`• Model: ${opts.vehicleName}`);
  if (opts.quantity) lines.push(`• Quantity: ${opts.quantity} unit(s)`);
  lines.push("", "Please send me a quotation including FOB and CIF pricing to Algeria.");
  lines.push("", "Thank you.");
  return lines.join("\n");
}

/** Pre-filled message for a general quotation / shipping question. */
export function quoteWhatsAppMessage(): string {
  return [
    "Hello HAKO AUTOMOBILE,",
    "",
    "I would like to discuss a vehicle import quotation. Could you please advise on:",
    "• Available models and current pricing",
    "• Shipping options to Djendjen / Algiers",
    "• Payment terms (T/T or L/C)",
    "• Estimated lead time",
    "",
    "Thank you.",
  ].join("\n");
}
