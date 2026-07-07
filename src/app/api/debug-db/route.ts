import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const diag: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL: process.env.DATABASE_URL
        ? `SET (${process.env.DATABASE_URL.slice(0, 30)}...)`
        : "UNDEFINED",
      DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN
        ? `SET (${process.env.DATABASE_AUTH_TOKEN.length} chars)`
        : "UNDEFINED",
      NODE_ENV: process.env.NODE_ENV,
    },
  };

  try {
    const result = await db.execute('SELECT COUNT(*) as cnt FROM "Vehicle"');
    diag.db = { status: "connected", vehicleCount: Number((result.rows[0] as { cnt: unknown }).cnt) };
  } catch (err) {
    diag.db = {
      status: "error",
      message: err instanceof Error ? err.message : String(err),
    };
  }

  return NextResponse.json(diag);
}
