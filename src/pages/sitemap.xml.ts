import type { APIRoute } from 'astro';
import { abs } from '../lib/paths';

// Every public page. Add new pages here.
const pages = ['/', '/services/', '/projects/', '/about/', '/public-works/', '/capability-statement/', '/careers/', '/contact/', '/privacy/'];

export const GET: APIRoute = ({ site }) => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = pages.map((p) => `  <url><loc>${abs(p, site)}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
