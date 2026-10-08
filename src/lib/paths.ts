/**
 * Base-path helpers. The build may be served under a sub-path (GitHub Pages
 * project preview: /bnzbuildersinc-site/) or at the domain root (launch).
 * ALWAYS build internal links and asset URLs with u('/path/').
 */
const rawBase = import.meta.env.BASE_URL || '/';
export const BASE = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

/** Launch origin (Astro `site`, from deploy.config.mjs). */
export const ORIGIN = (import.meta.env.SITE || 'https://bnzbuilders.com').replace(/\/+$/, '');

/** '/services/' → '/bnzbuildersinc-site/services/' (external, mailto, tel and # untouched). */
export function u(path: string): string {
  if (!path || /^(?:[a-z]+:|#|\/\/)/i.test(path)) return path;
  return BASE + path.replace(/^\/+/, '');
}

/** Strip the base from a served pathname: '/bnzbuildersinc-site/services/' → '/services/'. */
export function unbase(pathname: string): string {
  return pathname.startsWith(BASE) ? '/' + pathname.slice(BASE.length) : pathname;
}

/** Absolute launch-domain URL (canonical, OG, JSON-LD, sitemap), never includes the preview base. */
export function abs(path: string): string {
  return ORIGIN + '/' + path.replace(/^\/+/, '');
}
