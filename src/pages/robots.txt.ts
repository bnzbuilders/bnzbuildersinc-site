import type { APIRoute } from 'astro';
import { abs } from '../lib/paths';
import { PREVIEW_NOINDEX } from '../data/site';

// Controlled by PREVIEW_NOINDEX in src/data/site.ts.
//   preview (true)  → Disallow: /
//   launch  (false) → Allow: / + Sitemap: https://bnzbuilders.com/sitemap-index.xml
// Crawlers only read robots.txt at a host's root, so on a GitHub Pages
// project sub-path the per-page noindex meta tag is what actually applies.
export const GET: APIRoute = () => {
  const body = PREVIEW_NOINDEX
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap-index.xml')}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
