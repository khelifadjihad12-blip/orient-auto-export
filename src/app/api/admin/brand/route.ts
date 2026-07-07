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
