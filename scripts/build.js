#!/usr/bin/env node
/**
 * Smart build script that prevents infinite recursion.
 *
 * Problem: OpenNext's build step internally calls `bun run build` to build
 * the Next.js app. If the `build` script itself runs `opennextjs-cloudflare
 * build`, this creates infinite recursion → build timeout.
 *
 * Solution: use an env-var sentinel to distinguish the two call contexts:
 *
 *   1. Top-level call (Cloudflare dashboard runs `bun run build`):
 *      → runs `opennextjs-cloudflare build` (sets the sentinel)
 *
 *   2. OpenNext's internal call (inside opennextjs-cloudflare build):
 *      → runs `next build` (the actual Next.js build, no recursion)
 */
const { execSync } = require("child_process");
const path = require("path");

// Ensure local node_modules/.bin is on PATH (so `next` and
// `opennextjs-cloudflare` resolve when invoked via node).
const binDir = path.join(process.cwd(), "node_modules", ".bin");
const env = {
  ...process.env,
  PATH: `${binDir}:${process.env.PATH || ""}`,
};

const isInternal = process.env.OAE_OPENNEXT_INTERNAL === "1";

if (isInternal) {
  // Called by OpenNext's buildNextjsApp() — run the real Next.js build.
  execSync("next build", { stdio: "inherit", env });
} else {
  // Top-level call — run OpenNext, marking the env so the recursive
  // `bun run build` call inside OpenNext runs `next build` instead.
  execSync("opennextjs-cloudflare build", {
    stdio: "inherit",
    env: { ...env, OAE_OPENNEXT_INTERNAL: "1" },
  });
}
