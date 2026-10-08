// Renders public/og.png (1200×630 social preview) with headless Chrome.
// Usage: npm run og   (needs Chrome; set CHROME_PATH if not /usr/bin/google-chrome)
// Non-photographic by design: no stock or AI imagery.
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const font = (p) => pathToFileURL(path.join(root, 'node_modules', p)).href;
const mark = fs.readFileSync(path.join(root, 'public/favicon.svg'), 'utf8');
const html = `<!doctype html><html><head><style>
@font-face{font-family:Archivo;font-weight:100 900;font-stretch:62% 125%;src:url(${font('@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2')})}
@font-face{font-family:Inter;font-weight:100 900;src:url(${font('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#18302a;color:#f5f0e6;font-family:Inter;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(245,240,230,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(245,240,230,.06) 1px,transparent 1px);background-size:48px 48px;-webkit-mask-image:linear-gradient(90deg,transparent 25%,#000)}
.bar{position:absolute;left:0;right:0;bottom:0;height:14px;background:#c9a66b}
.c{position:absolute;left:80px;top:64px;right:80px}
.brand{display:flex;align-items:center;gap:18px;font-family:Archivo;font-weight:800;font-stretch:112%;font-size:34px;letter-spacing:1px;text-transform:uppercase}
.brand svg{width:60px;height:60px}.brand span{color:#c9a66b;font-size:22px}
.line{margin-top:44px;font-size:24px;font-weight:600;color:#d9d3c4}
h1{font-family:Archivo;font-weight:800;font-stretch:108%;text-transform:uppercase;font-size:72px;line-height:.98;margin-top:16px;letter-spacing:-1px}
h1 em{font-style:normal;color:#c9a66b;display:block}
p.f{position:absolute;left:80px;bottom:48px;font-size:20px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#c8cfc4}
</style></head><body><div class="grid"></div><div class="bar"></div>
<div class="c"><div class="brand">${mark}<div>BNZ Builders <span>Inc.</span></div></div>
<p class="line">Commercial Construction. Renovations. Public Works.</p>
<h1>Building with precision. <em>Delivering with purpose.</em></h1></div>
<p class="f">Cedarhurst, New York · bnzbuilders.com</p></body></html>`;

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
