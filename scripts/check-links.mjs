// Checks every internal link, asset and #anchor in dist/, honoring the base
// path from deploy.config.mjs. Any root-relative URL that does not start with
// the base path is a failure. Exits 1 on failure.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, BASE } from '../deploy.config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const htmlFiles = [];
const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && htmlFiles.push(p); } };
walk(root);

let failures = 0, checked = 0;
const fail = (msg) => { console.log('FAIL ' + msg); failures++; };

/** URL path as served (with base) → file in dist, or null. */
const resolveServed = (urlPath) => {
  if (!urlPath.startsWith(BASE)) return null;
  const p = path.join(root, decodeURIComponent(urlPath.slice(BASE.length)));
  if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  if (fs.existsSync(path.join(p, 'index.html'))) return path.join(p, 'index.html');
  return null;
};
const idsCache = new Map();
const idsOf = (file) => {
  if (!idsCache.has(file)) idsCache.set(file, new Set([...fs.readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return idsCache.get(file);
};
const external = new Set(), mailtos = new Set();

const checkUrl = (from, raw, file) => {
  checked++;
  if (raw.includes('${')) return; // template strings inside inline JS
  if (raw.startsWith(SITE)) {
    // Launch-domain URLs (canonical, OG, JSON-LD, sitemap) never carry the preview base.
    const served = BASE + new URL(raw).pathname.replace(/^\/+/, '');
    if (!resolveServed(served)) fail(`${from} → ${raw} (site URL has no file in dist / missing base ${BASE})`);
    return;
  }
  if (/^https?:\/\//.test(raw)) { external.add(raw.split('#')[0]); return; }
  if (/^(mailto|tel):/.test(raw)) { mailtos.add(raw.split('?')[0]); return; }
  const [p, hash] = raw.split('#');
  if (p === '') { if (hash && !idsOf(file).has(hash)) fail(`${from} → ${raw} (no #${hash})`); return; }
  const served = new URL(p, 'http://x' + from).pathname;
  if (p.startsWith('/') && !p.startsWith(BASE)) return fail(`${from} → ${raw} (root-relative URL missing base ${BASE})`);
  const target = resolveServed(served);
  if (!target) return fail(`${from} → ${raw} (missing)`);
  if (hash && target.endsWith('.html') && !idsOf(target).has(hash)) fail(`${from} → ${raw} (no #${hash})`);
};

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const from = BASE + path.relative(root, file).replace(/\\/g, '/').replace(/index\.html$/, '');
  for (const m of html.matchAll(/\s(href|src|content)="([^"]+)"/g)) {
    const raw = m[2].replace(/&amp;/g, '&');
    if (m[1] === 'content' && !raw.startsWith(SITE)) continue;
    checkUrl(from, raw, file);
  }
  // JSON-LD URLs
  for (const m of html.matchAll(/"(?:url|logo|image|@id)":"([^"]+)"/g)) checkUrl(from, m[1].split('#')[0], file);
}

// CSS url(...) references (fonts, etc.)
const cssDir = path.join(root, '_astro');
for (const f of fs.existsSync(cssDir) ? fs.readdirSync(cssDir).filter((x) => x.endsWith('.css')) : []) {
  const css = fs.readFileSync(path.join(cssDir, f), 'utf8');
  for (const m of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
    if (m[1].startsWith('data:')) continue;
    checkUrl(`${BASE}_astro/${f}`, m[1], path.join(cssDir, f));
  }
}

// sitemap (@astrojs/sitemap) + robots
for (const sm of fs.readdirSync(root).filter((f) => /^sitemap.*\.xml$/.test(f))) {
  const xml = fs.readFileSync(path.join(root, sm), 'utf8');
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) checkUrl(`${BASE}${sm}`, m[1], null);
}
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
for (const m of robots.matchAll(/Sitemap:\s*(\S+)/g)) checkUrl(`${BASE}robots.txt`, m[1], null);

console.log(`\nBase: ${SITE}${BASE}`);
console.log(`${htmlFiles.length} HTML files + CSS + sitemap/robots, ${checked} URLs checked, ${failures} failure(s).`);
console.log(`mailto/tel targets: ${[...mailtos].join(', ')}`);
console.log(`External URLs (not fetched): ${[...external].join(', ') || 'none'}`);
process.exit(failures ? 1 : 0);
