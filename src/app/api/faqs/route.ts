import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const faqs = await db.fAQ.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  return NextResponse.json({ faqs });
}
