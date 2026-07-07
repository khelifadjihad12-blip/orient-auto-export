import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { randomUUID } from "crypto";

function checkAuth(request: Request): boolean {
  const auth = request.headers.get("x-admin-password");
  const expected = process.env.ADMIN_PASSWORD || "orient2025";
  return auth === expected;
}

const vehicleSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, hyphens"),
  brandSlug: z.string().min(1).max(120),
  energyType: z.enum(["EV", "HYBRID", "PETROL", "DIESEL"]),
  bodyType: z.enum(["SEDAN", "SUV", "MPV", "PICKUP", "COUPE"]).optional().nullable(),
  priceUsd: z.number().min(0).max(1000000),
  image: z.string().url().optional().nullable(),
  excerpt: z.string().min(1).max(500),
  description: z.string().min(1).max(5000),
  featured: z.boolean().default(false),
  // Specs as a flexible object
  specs: z.object({
    engine: z.string().optional(),
    transmission: z.string().optional(),
    battery: z.string().optional(),
    range: z.string().optional(),
    horsepower: z.string().optional(),
    topSpeed: z.string().optional(),
    acceleration: z.string().optional(),
    dimensions: z.string().optional(),
    seating: z.string().optional(),
    features: z.array(z.string()).optional(),
  }).optional().default({}),
});

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = vehicleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const d = parsed.data;
  const id = randomUUID();
  const now = new Date().toISOString();

  try {
    // Find the brand by slug
    const brandResult = await db.execute({
      sql: 'SELECT id FROM "Brand" WHERE slug = ?',
      args: [d.brandSlug],
    });
    if (brandResult.rows.length === 0) {
      return NextResponse.json(
        { error: `Brand "${d.brandSlug}" not found. Create the brand first.` },
        { status: 404 }
      );
    }
    const brandId = brandResult.rows[0].id as string;

    // Check if vehicle slug already exists
    const existing = await db.execute({
      sql: 'SELECT id FROM "Vehicle" WHERE slug = ?',
      args: [d.slug],
    });
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: `Vehicle with slug "${d.slug}" already exists` },
        { status: 409 }
      );
    }

    await db.execute({
      sql: `INSERT INTO "Vehicle" ("id", "slug", "name", "brandId", "categoryId", "energyType", "bodyType", "priceUsd", "image", "gallery", "excerpt", "description", "specs", "featured", "published", "createdAt", "updatedAt") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      args: [
        id,
        d.slug,
        d.name,
        brandId,
        null, // categoryId — optional, not set via admin form
        d.energyType,
        d.bodyType ?? null,
        d.priceUsd,
        d.image ?? null,
        JSON.stringify(d.image ? [d.image] : []),
        d.excerpt,
        d.description,
        JSON.stringify(d.specs),
        d.featured ? 1 : 0,
        1, // published = true
        now,
        now,
      ],
    });

    return NextResponse.json(
      { success: true, id, slug: d.slug, name: d.name },
      { status: 201 }
    );
  } catch (err) {
    console.error("[admin/vehicle] failed", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create vehicle" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await db.execute(
      `SELECT v.id, v.slug, v.name, v."energyType", v."priceUsd", v.image, v.featured, b.name as "brandName" FROM "Vehicle" v JOIN "Brand" b ON v."brandId" = b.id ORDER BY v."createdAt" DESC`
    );
    return NextResponse.json({ vehicles: result.rows });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 });
  }
}

// Delete a vehicle
export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  try {
    await db.execute({
      sql: 'DELETE FROM "Vehicle" WHERE id = ?',
      args: [id],
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete vehicle" }, { status: 500 });
  }
}
