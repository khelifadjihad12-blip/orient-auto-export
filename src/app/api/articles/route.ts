import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const articles = await db.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
  return NextResponse.json({ articles });
}
