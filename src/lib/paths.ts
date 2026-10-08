/**
 * Base-path helpers. The site may live under a sub-path (GitHub Pages project
 * site: /bnzbuildersinc-site/) or at the domain root. ALWAYS build internal
 * links and asset URLs with u('/path/') so they respect the base.
 */
const rawBase = import.meta.env.BASE_URL || '/';
export const BASE = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

/** '/services/' → '/bnzbuildersinc-site/services/' (external, mailto, tel and # untouched). */
export function u(path: string): string {
  if (!path || /^(?:[a-z]+:|#|\/\/)/i.test(path)) return path;
  return BASE + path.replace(/^\/+/, '');
}

/** Absolute URL including site + base, e.g. for canonical, OG, JSON-LD, sitemap. */
export function abs(path: string, site: URL | undefined): string {
  return new URL(u(path), site ?? 'https://bnzbuildersinc.com').href;
}
