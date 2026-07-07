import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const result = await db.execute(
      'SELECT * FROM "Article" WHERE published = 1 ORDER BY "publishedAt" DESC'
    );
    return NextResponse.json({ articles: result.rows });
  } catch (err) {
    console.error("[articles] failed", err);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
