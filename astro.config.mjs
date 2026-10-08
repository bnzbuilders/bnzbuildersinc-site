// @ts-check
import { defineConfig } from 'astro/config';
import { SITE, BASE } from './deploy.config.mjs';

// Hosting target (site + base path) is set in deploy.config.mjs.
export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
