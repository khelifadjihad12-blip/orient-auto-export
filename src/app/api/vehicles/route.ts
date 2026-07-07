import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured") === "true";
  const energy = searchParams.get("energy");
  const brand = searchParams.get("brand");

  const conditions: string[] = ['v.published = 1'];
  const args: unknown[] = [];
  if (featured) {
    conditions.push("v.featured = 1");
  }
  if (energy) {
    conditions.push('v."energyType" = ?');
    args.push(energy.toUpperCase());
  }
  const where = "WHERE " + conditions.join(" AND ");

  let sql = `SELECT v.*, b.name as "brandName", b.slug as "brandSlug" FROM "Vehicle" v JOIN "Brand" b ON v."brandId" = b.id`;
  if (brand) {
    sql += ` JOIN "Brand" b2 ON v."brandId" = b2.id AND b2.slug = ?`;
    args.unshift(brand);
  }
  sql += ` ${where} ORDER BY v.featured DESC, v."priceUsd" ASC`;

  try {
    const result = await db.execute({ sql, args });
    return NextResponse.json({ vehicles: result.rows });
  } catch (err) {
    console.error("[vehicles] failed", err);
    return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 });
  }
}
