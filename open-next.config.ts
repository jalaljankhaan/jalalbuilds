import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Scenario A caching for a mostly-static marketing site.
 * Home is SSG; API routes remain dynamic and do not need ISR/R2.
 * See: https://opennext.js.org/cloudflare/caching#ssg-site
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
