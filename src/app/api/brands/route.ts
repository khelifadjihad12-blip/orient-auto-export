import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const result = await db.execute(
      'SELECT b.*, (SELECT COUNT(*) FROM "Vehicle" v WHERE v."brandId" = b.id) as "modelCount" FROM "Brand" b ORDER BY b.name ASC'
    );
    return NextResponse.json({ brands: result.rows });
  } catch (err) {
    console.error("[brands] failed", err);
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}
