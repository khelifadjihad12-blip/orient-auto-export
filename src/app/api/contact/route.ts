import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email().max(200),
  subject: z.string().min(2).max(300),
  message: z.string().min(5).max(4000),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  try {
    const ticket = `OAE-CONTACT-${Date.now().toString(36).toUpperCase()}`;
    console.log(
      `[contact] New message ${ticket} from ${parsed.data.email}: ${parsed.data.subject}`
    );
    return NextResponse.json({ success: true, ticket }, { status: 201 });
  } catch (err) {
    console.error("[contact] failed", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
