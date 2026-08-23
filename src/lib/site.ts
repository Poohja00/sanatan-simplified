// Single source of truth for the site's canonical URL — used by
// metadataBase, sitemap.ts, robots.ts, and JSON-LD. Set NEXT_PUBLIC_SITE_URL
// once a real domain exists; falls back to localhost for dev.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
