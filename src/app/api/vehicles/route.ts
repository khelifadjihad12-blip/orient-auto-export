import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured") === "true";
  const energy = searchParams.get("energy"); // EV | HYBRID | PETROL
  const brand = searchParams.get("brand");

  const vehicles = await db.vehicle.findMany({
    where: {
      published: true,
      ...(featured ? { featured: true } : {}),
      ...(energy ? { energyType: energy.toUpperCase() } : {}),
      ...(brand ? { brand: { slug: brand } } : {}),
    },
    include: { brand: true },
    orderBy: [{ featured: "desc" }, { priceUsd: "asc" }],
  });

  return NextResponse.json({ vehicles });
}
