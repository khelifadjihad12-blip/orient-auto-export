import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

/**
 * Prisma client singleton.
 *
 * Two modes, selected automatically by the DATABASE_URL scheme:
 *
 *   1. Local development — DATABASE_URL="file:./db/custom.db"
 *      Uses the standard PrismaClient with the built-in SQLite driver
 *      (the libSQL adapter does not support file: URLs).
 *
 *   2. Production (Turso / Cloudflare) — DATABASE_URL="libsql://..."
 *      Uses the libSQL adapter over HTTP, which works on serverless edge
 *      runtimes (Cloudflare Workers) where there is no filesystem.
 *
 * The Prisma schema stays 100% identical for both modes — only the
 * connection mechanism changes.
 *
 * Data-access functions in src/lib/data.ts wrap every query in safeQuery()
 * which returns an empty fallback on DB errors, so `next build` / the
 * OpenNext build can complete even when DATABASE_URL isn't configured yet.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  // Remote libSQL / Turso / HTTP URLs → use the libSQL adapter (edge-safe).
  if (url.startsWith("libsql:") || url.startsWith("http:") || url.startsWith("https:")) {
    const libsql = createClient({
      url,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    });
    const adapter = new PrismaLibSql(libsql);
    return new PrismaClient({ adapter, log: ["error", "warn"] });
  }

  // Local file: URL → standard PrismaClient (built-in SQLite driver).
  // Set the env var so Prisma's internal engine resolves the datasource.
  process.env.DATABASE_URL = url;
  return new PrismaClient({ log: ["error", "warn"] });
}

/** Lazily-created singleton. */
export function getDb(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const client = createPrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }
  return client;
}

/**
 * `db` is a lazy delegate: importing it never touches Prisma. The real client
 * is built on the first property access via getDb(). This keeps `next build`
 * (which imports every module) from crashing when DATABASE_URL isn't loaded
 * yet during static generation.
 */
export const db: PrismaClient = new Proxy(
  function () {} as unknown as PrismaClient,
  {
    get(_target, prop) {
      const client = getDb();
      const value = Reflect.get(client, prop);
      if (typeof value === "function") {
        return value.bind(client);
      }
      return value;
    },
  }
);
