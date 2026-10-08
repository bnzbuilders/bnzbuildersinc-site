// Full-page screenshots of the built site (run `npm run build` first).
// Output: $SHOTS_DIR or /workspace/bnz-public-site-shots/*.png. Usage: npm run screenshots
// Uses playwright-core with the system Chrome (CHROME_PATH overrides).
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import { serve } from './serve.mjs';
import { BASE } from '../deploy.config.mjs';

const out = process.env.SHOTS_DIR || '/workspace/bnz-public-site-shots';
fs.mkdirSync(out, { recursive: true });
const port = 4399;
const server = await serve(port);
const pages = [
  ['home', '/'],
  ['services', '/services/'],
  ['projects', '/projects/'],
  ['government-contracting', '/government-contracting/'],
  ['contact', '/contact/'],
  ['about', '/about/'],
];
const only = process.argv[2];
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome' });
const errors = [];
for (const [name, url] of pages) {
  if (only && !name.startsWith(only)) continue;
  for (const [label, width, height] of [['desktop-1440', 1440, 900], ['mobile-390', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    page.on('console', (m) => m.type() === 'error' && errors.push(`${url}: ${m.text()}`));
    page.on('pageerror', (e) => errors.push(`${url}: ${e.message}`));
    await page.goto(`http://127.0.0.1:${port}${BASE}${url.replace(/^\//, '')}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) errors.push(`${url} @${width}: horizontal overflow ${overflow}px`);
    await page.screenshot({ path: `${out}/${name}-${label}.png`, fullPage: true });
    await page.close();
    console.log('✓', `${out}/${name}-${label}.png`);
  }
}
await browser.close();
server.close();
console.log(errors.length ? `\nIssues:\n${errors.join('\n')}` : '\nNo console errors or horizontal overflow.');
