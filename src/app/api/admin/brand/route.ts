import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { randomUUID } from "crypto";

// Simple password protection — set ADMIN_PASSWORD env var.
// In production, use a strong random password.
function checkAuth(request: Request): boolean {
  const auth = request.headers.get("x-admin-password");
  const expected = process.env.ADMIN_PASSWORD || "orient2025";
  return auth === expected;
}

const brandSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, hyphens"),
  country: z.string().max(100).default("China"),
  founded: z.number().int().min(1800).max(2030).optional().nullable(),
  description: z.string().min(1).max(2000),
  history: z.string().max(5000).optional().nullable(),
  logo: z.string().url().optional().nullable(),
  heroImage: z.string().url().optional().nullable(),
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

  const parsed = brandSchema.safeParse(body);
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
    // Check if slug already exists
    const existing = await db.execute({
      sql: 'SELECT id FROM "Brand" WHERE slug = ?',
      args: [d.slug],
    });
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: `Brand with slug "${d.slug}" already exists` },
        { status: 409 }
      );
    }

    await db.execute({
      sql: `INSERT INTO "Brand" ("id", "slug", "name", "country", "logo", "heroImage", "founded", "description", "history", "createdAt", "updatedAt") VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      args: [
        id,
        d.slug,
        d.name,
        d.country,
        d.logo ?? null,
        d.heroImage ?? null,
        d.founded ?? null,
        d.description,
        d.history ?? null,
        now,
        now,
      ],
    });

    return NextResponse.json(
      { success: true, id, slug: d.slug, name: d.name },
      { status: 201 }
    );
  } catch (err) {
    console.error("[admin/brand] failed", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create brand" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await db.execute(
      'SELECT id, slug, name, country, founded, description FROM "Brand" ORDER BY name ASC'
    );
    return NextResponse.json({ brands: result.rows });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}

// ── Edit a brand ──
const brandUpdateSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/).optional(),
  country: z.string().max(100).optional(),
  founded: z.number().int().min(1800).max(2030).optional().nullable(),
  description: z.string().min(1).max(2000).optional(),
  history: z.string().max(5000).optional().nullable(),
  logo: z.string().url().optional().nullable(),
  heroImage: z.string().url().optional().nullable(),
});

export async function PUT(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = brandUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const d = parsed.data;
  const now = new Date().toISOString();

  try {
    // Build dynamic SET clause
    const fields: string[] = ['"updatedAt" = ?'];
    const args: unknown[] = [now];
    const fieldMap: Record<string, string> = {
      name: "name",
      slug: "slug",
      country: "country",
      founded: "founded",
      description: "description",
      history: "history",
      logo: "logo",
      heroImage: '"heroImage"',
    };
    for (const [key, col] of Object.entries(fieldMap)) {
      if (d[key as keyof typeof d] !== undefined) {
        fields.push(`${col} = ?`);
        args.push(d[key as keyof typeof d] ?? null);
      }
    }
    args.push(d.id);

    await db.execute({
      sql: `UPDATE "Brand" SET ${fields.join(", ")} WHERE id = ?`,
      args,
    });

    return NextResponse.json({ success: true, id: d.id });
  } catch (err) {
    console.error("[admin/brand] update failed", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update brand" },
      { status: 500 }
    );
  }
}

// ── Delete a brand ──
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
    // Check if brand has vehicles
    const vehicles = await db.execute({
      sql: 'SELECT COUNT(*) as cnt FROM "Vehicle" WHERE "brandId" = ?',
      args: [id],
    });
    const count = Number((vehicles.rows[0] as { cnt: unknown }).cnt);
    if (count > 0) {
      return NextResponse.json(
        { error: `Cannot delete: brand has ${count} vehicle(s). Delete or reassign them first.` },
        { status: 409 }
      );
    }

    await db.execute({
      sql: 'DELETE FROM "Brand" WHERE id = ?',
      args: [id],
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 });
  }
}
