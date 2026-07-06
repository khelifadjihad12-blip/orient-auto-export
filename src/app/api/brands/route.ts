import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const brands = await db.brand.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { vehicles: true } } },
  });
  return NextResponse.json({ brands });
}
