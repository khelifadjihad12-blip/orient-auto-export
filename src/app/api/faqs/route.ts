import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const result = await db.execute(
      'SELECT * FROM "FAQ" ORDER BY "order" ASC, "createdAt" ASC'
    );
    return NextResponse.json({ faqs: result.rows });
  } catch (err) {
    console.error("[faqs] failed", err);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}
