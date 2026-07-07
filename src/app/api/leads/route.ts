import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { randomUUID } from "crypto";

const leadSchema = z.object({
  vehicleSlug: z.string().max(120).optional().nullable(),
  brand: z.string().max(120).optional().nullable(),
  quantity: z.number().int().min(1).max(1000).default(1),
  destinationPort: z.string().max(120).optional().nullable(),
  paymentPreference: z.string().max(60).optional().nullable(),
  businessName: z.string().max(200).optional().nullable(),
  contactPerson: z.string().min(2).max(200),
  email: z.string().email().max(200),
  phone: z.string().max(60).optional().nullable(),
  country: z.string().max(120).optional().nullable(),
  notes: z.string().max(4000).optional().nullable(),
});

// Generate a public Lead ID like OAE-2025-000142
async function generateLeadId(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `OAE-${year}-`;
  const yearStart = new Date(`${year}-01-01T00:00:00Z`).toISOString();
  const result = await db.execute({
    sql: 'SELECT COUNT(*) as cnt FROM "Lead" WHERE "createdAt" >= ?',
    args: [yearStart],
  });
  const count = Number((result.rows[0] as { cnt: unknown }).cnt) || 0;
  const suffix = String(count + 1).padStart(6, "0");
  return `${prefix}${suffix}`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const leadId = await generateLeadId();
  const id = randomUUID();
  const now = new Date().toISOString();

  try {
    await db.execute({
      sql: `INSERT INTO "Lead" ("id", "leadId", "vehicleSlug", "brand", "quantity", "destinationPort", "paymentPreference", "businessName", "contactPerson", "email", "phone", "country", "notes", "status", "createdAt", "updatedAt") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      args: [
        id,
        leadId,
        data.vehicleSlug ?? null,
        data.brand ?? null,
        data.quantity,
        data.destinationPort ?? null,
        data.paymentPreference ?? null,
        data.businessName ?? null,
        data.contactPerson,
        data.email,
        data.phone ?? null,
        data.country ?? null,
        data.notes ?? null,
        "NEW",
        now,
        now,
      ],
    });

    console.log(`[leads] New lead ${leadId} from ${data.email}`);

    return NextResponse.json(
      { success: true, leadId, id, createdAt: now },
      { status: 201 }
    );
  } catch (err) {
    console.error("[leads] create failed", err);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await db.execute(
      'SELECT * FROM "Lead" ORDER BY "createdAt" DESC LIMIT 100'
    );
    return NextResponse.json({ leads: result.rows });
  } catch (err) {
    console.error("[leads] list failed", err);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
