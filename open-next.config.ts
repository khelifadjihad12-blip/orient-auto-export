import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

/**
 * OpenNext for Cloudflare configuration.
 * Builds the Next.js app into a Cloudflare Worker with static assets.
 *
 * Docs: https://opennext.js.org/cloudflare
 */
export default defineCloudflareConfig({
  // The inline flag bundles dependencies into a single worker file,
  // which is required for Cloudflare Workers deployment.
  incrementalCache: {
    // Use Cloudflare KV for ISR cache (optional). If not configured,
    // ISR falls back to per-request rendering.
    // To enable: create a KV namespace and bind it as NEXT_CACHE_WORKERS_KV
  },
});
