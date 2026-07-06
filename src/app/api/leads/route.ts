import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

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
  const yearStart = new Date(`${year}-01-01T00:00:00Z`);
  const count = await db.lead.count({
    where: { createdAt: { gte: yearStart } },
  });
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

  try {
    const lead = await db.lead.create({
      data: {
        leadId,
        vehicleSlug: data.vehicleSlug ?? null,
        brand: data.brand ?? null,
        quantity: data.quantity,
        destinationPort: data.destinationPort ?? null,
        paymentPreference: data.paymentPreference ?? null,
        businessName: data.businessName ?? null,
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone ?? null,
        country: data.country ?? null,
        notes: data.notes ?? null,
        status: "NEW",
      },
    });

    // Admin notification hook (wire to Resend in production)
    console.log(`[leads] New lead ${lead.leadId} from ${lead.email}`);

    return NextResponse.json(
      {
        success: true,
        leadId: lead.leadId,
        id: lead.id,
        createdAt: lead.createdAt,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[leads] create failed", err);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ leads });
  } catch (err) {
    console.error("[leads] list failed", err);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
