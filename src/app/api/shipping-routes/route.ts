import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const result = await db.execute(
      'SELECT * FROM "ShippingRoute" ORDER BY "destinationCountry" ASC, "transitDays" ASC'
    );
    return NextResponse.json({ routes: result.rows });
  } catch (err) {
    console.error("[shipping-routes] failed", err);
    return NextResponse.json({ error: "Failed to fetch shipping routes" }, { status: 500 });
  }
}
