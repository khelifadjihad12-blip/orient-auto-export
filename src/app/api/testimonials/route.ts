import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const result = await db.execute(
      'SELECT * FROM "Testimonial" WHERE published = 1 ORDER BY "createdAt" DESC'
    );
    return NextResponse.json({ testimonials: result.rows });
  } catch (err) {
    console.error("[testimonials] failed", err);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}
