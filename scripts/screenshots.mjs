// Full-page screenshots of the built site (run `npm run build` first).
// Output: screenshots/*.png. Usage: npm run screenshots
import { chromium } from 'playwright-core';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from './serve.mjs';
import { BASE } from '../deploy.config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = 4399;
const server = await serve(port);
const shots = [
  ['home-desktop-1440', '/', 1440],
  ['home-mobile-390', '/', 390],
  ['services-desktop-1440', '/services/', 1440],
  ['projects-desktop-1440', '/projects/', 1440],
  ['contact-desktop-1440', '/contact/', 1440],
  // extra review shots
  ['services-mobile-390', '/services/', 390],
  ['projects-mobile-390', '/projects/', 390],
  ['contact-mobile-390', '/contact/', 390],
  ['about-desktop-1440', '/about/', 1440],
  ['public-works-desktop-1440', '/public-works/', 1440],
  ['capability-statement-desktop-1440', '/capability-statement/', 1440],
  ['careers-desktop-1440', '/careers/', 1440],
  ['privacy-desktop-1440', '/privacy/', 1440],
  ['404-desktop-1440', '/does-not-exist/', 1440],
];
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome' });
const errors = [];
for (const [name, url, width] of shots) {
  const page = await browser.newPage({ viewport: { width, height: width < 600 ? 844 : 900 }, deviceScaleFactor: width < 600 ? 2 : 1 });
  page.on('console', (m) => m.type() === 'error' && errors.push(`${url}: ${m.text()}`));
  page.on('pageerror', (e) => errors.push(`${url}: ${e.message}`));
  await page.goto(`http://127.0.0.1:${port}${BASE}${url.replace(/^\//, '')}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 0) errors.push(`${url} @${width}: horizontal overflow ${overflow}px`);
  await page.screenshot({ path: path.join(root, 'screenshots', `${name}.png`), fullPage: true });
  await page.close();
  console.log('✓', name);
}
await browser.close();
server.close();
console.log(errors.length ? `\nIssues:\n${errors.join('\n')}` : '\nNo console errors or horizontal overflow.');
