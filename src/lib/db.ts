import { PrismaClient } from "@prisma/client/edge";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

/**
 * Prisma client singleton — edge-runtime safe.
 *
 * Uses the EDGE build of @prisma/client (no native query engine, no `fs`
 * calls) with the libSQL adapter over HTTP. This is the only combination
 * that works on Cloudflare Workers, where there is no filesystem.
 *
 * Both local development and production use Turso (libsql://) as the
 * database — the edge build + libSQL adapter works identically in both
 * environments. To use a local file: SQLite instead, see the note in
 * the README about the `db:local` alternative.
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

  const libsql = createClient({
    url,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  const adapter = new PrismaLibSql(libsql);
  return new PrismaClient({ adapter, log: ["error", "warn"] });
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
