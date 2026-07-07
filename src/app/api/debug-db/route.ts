import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const diag: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    runtime: typeof process !== "undefined" ? "server" : "unknown",
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

  // Test DB connection
  try {
    const count = await db.vehicle.count();
    diag.db = { status: "connected", vehicleCount: count };
  } catch (err) {
    diag.db = {
      status: "error",
      message: err instanceof Error ? err.message : String(err),
      code: (err as { code?: string }).code,
    };
  }

  return NextResponse.json(diag);
}
