import { createClient, type Client } from "@libsql/client";

/**
 * Direct libSQL client for Turso / Cloudflare Workers.
 *
 * Bypasses Prisma entirely to avoid the native query engine's `fs.readdir`
 * dependency, which is unavailable on Cloudflare Workers (no filesystem).
 *
 * The libSQL client speaks HTTP to Turso and works perfectly on the edge.
 * All data-access functions in src/lib/data.ts use this client directly
 * with type-safe row mapping.
 *
 * For local development, the same client works against both:
 *   - Local file: SQLite (DATABASE_URL="file:./db/custom.db")
 *   - Remote Turso (DATABASE_URL="libsql://...")
 */

const globalForLibsql = globalThis as unknown as {
  libsqlClient: Client | undefined;
};

function createLibsqlClient(): Client {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  return createClient({
    url,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
}

export function getDb(): Client {
  if (globalForLibsql.libsqlClient) return globalForLibsql.libsqlClient;
  const client = createLibsqlClient();
  if (process.env.NODE_ENV !== "production") {
    globalForLibsql.libsqlClient = client;
  }
  return client;
}

/**
 * `db` is a lazy delegate: importing it never touches the database.
 * The real client is built on the first property access via getDb().
 */
export const db: Client = new Proxy(
  {} as Client,
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
