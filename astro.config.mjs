// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SITE, BASE } from './deploy.config.mjs';

/** Sitemap URLs always point at the launch domain root, whatever BASE is. */
const toProd = (/** @type {string} */ url) => url.replace(SITE + BASE, SITE + '/');

// Hosting target (site + base path) is set in deploy.config.mjs.
export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(404|public-works)\/?$/.test(page),
      serialize(item) {
        item.url = toProd(item.url);
        return item;
      },
    }),
    {
      // sitemap-index.xml points at the launch-domain root too.
      name: 'bnz-sitemap-index-origin',
      hooks: {
        'astro:build:done': ({ dir }) => {
          const f = fileURLToPath(new URL('sitemap-index.xml', dir));
          if (fs.existsSync(f)) fs.writeFileSync(f, toProd(fs.readFileSync(f, 'utf8')));
        },
      },
    },
  ],
});
