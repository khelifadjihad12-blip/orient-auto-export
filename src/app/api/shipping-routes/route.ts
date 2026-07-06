import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const routes = await db.shippingRoute.findMany({
    orderBy: [{ destinationCountry: "asc" }, { transitDays: "asc" }],
  });
  return NextResponse.json({ routes });
}
