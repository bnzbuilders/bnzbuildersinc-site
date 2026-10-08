// Renders public/og.png (1200×630 social preview) with headless Chrome.
// Usage: node scripts/og-image.mjs   (needs Chrome; set CHROME_PATH if not /usr/bin/google-chrome)
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const font = (p) => pathToFileURL(path.join(root, 'node_modules', p)).href;
const mark = fs.readFileSync(path.join(root, 'public/favicon.svg'), 'utf8');
const html = `<!doctype html><html><head><style>
@font-face{font-family:BSD;font-weight:800;src:url(${font('@fontsource/big-shoulders-display/files/big-shoulders-display-latin-800-normal.woff2')})}
@font-face{font-family:Inter;font-weight:100 900;src:url(${font('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#161513;color:#F3F1EC;font-family:Inter;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(243,241,236,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(243,241,236,.07) 1px,transparent 1px);background-size:40px 40px;-webkit-mask-image:linear-gradient(90deg,transparent 30%,#000)}
.bar{position:absolute;left:0;top:0;bottom:0;width:18px;background:#EA580C}
.c{position:absolute;left:90px;top:70px;right:80px}
.brand{display:flex;align-items:center;gap:18px;font-family:BSD;font-weight:800;font-size:44px;letter-spacing:2px}
.brand svg{width:64px;height:64px}.brand span{color:#EA580C}
h1{font-family:BSD;font-weight:800;text-transform:uppercase;font-size:118px;line-height:.9;margin-top:56px}
h1 em{font-style:normal;color:#EA580C}
p{position:absolute;left:90px;bottom:62px;font-size:24px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#B9B4AB}
</style></head><body><div class="grid"></div><div class="bar"></div>
<div class="c"><div class="brand">${mark}<div>BNZ <span>BUILDERS</span></div></div>
<h1>Built right.<br>On time. <em>On budget.</em></h1></div>
<p>Licensed &amp; insured contractor serving New York · Cedarhurst, NY</p></body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const tmp = path.join(root, 'scripts', '.og-tmp.html');
fs.writeFileSync(tmp, html);
await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, 'public/og.png') });
await browser.close();
fs.unlinkSync(tmp);
console.log('Wrote public/og.png');
