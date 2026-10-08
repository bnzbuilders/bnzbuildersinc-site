# BNZ Builders Inc. — public website

Public website for **BNZ Builders Inc.**, a New York general contractor based in
Cedarhurst, NY. Launch domain: **https://bnzbuilders.com**. (This is not the
BuildWithBNZ software site and must never reference it.)

> Status: **preview / not launched.** `PREVIEW_NOINDEX = true` (every page is
> noindex, robots.txt disallows all). The quote form uses a mailto fallback.
> Content still needs Bilal's approval — search `src/data/site.ts` for `TODO(Bilal)`.
> Full handoff notes: [`HANDOFF-CLAUDE.md`](HANDOFF-CLAUDE.md).

## Stack

- Astro 5, static output to `dist/` (Node 20+)
- `@astrojs/sitemap` → `sitemap-index.xml` + `sitemap-0.xml` (URLs always on https://bnzbuilders.com)
- Hand-written CSS (`src/styles/global.css`), small vanilla JS (mobile nav, reveal-on-scroll, before/after slider, form)
- Self-hosted fonts from npm (no Google Fonts / no trackers): **Archivo Variable** (headings, width axis) + **Inter Variable** (body)

## Commands

```bash
npm ci
npm run dev           # dev server
npm run build         # → dist/
npm run preview:lan   # serve dist at http://0.0.0.0:4321/bnzbuildersinc-site/
npm run check:links   # every internal link/asset/#anchor/sitemap URL in dist
npm run screenshots   # full-page PNGs → /workspace/bnz-public-site-shots (system Chrome via playwright-core)
npm run og            # re-render public/og.png
```

## Config (one place each)

| Setting | File | Default | Meaning |
|---|---|---|---|
| `PREVIEW_NOINDEX` | `src/data/site.ts` | `true` | noindex meta on all pages + `Disallow: /`. Set `false` at launch. |
| `FORM_ENDPOINT` | `src/data/site.ts` | `''` | `''` = mailto fallback. URL = POST FormData (Formspree / Web3Forms / Worker). |
| `SHOW_PROJECT_STREET_ADDRESSES` | `src/data/site.ts` | `false` | Project street lines (occupied residences) hidden; city/region shown. |
| `SHOW_OFFICE_STREET` | `src/data/site.ts` | `false` | Office shows "Cedarhurst, NY" only. |
| `SHOW_CREDENTIALS` | `src/data/site.ts` | `false` | Registration numbers hidden until verified. |
| `HERO_PHOTO` | `src/data/site.ts` | `''` | Blueprint illustration until an approved photo is supplied. |
| `DEPLOY_TARGET` / `BASE_PATH` | `deploy.config.mjs` | `github-pages` → base `/bnzbuildersinc-site/` | `custom-domain` → base `/`. |

Internal links must use `u('/path/')` from `src/lib/paths.ts` so they follow the base path.

## Content rules

No "Completed" status unless `completionVerified: true`. No contract values, PO
numbers, agency documents or client personal info. Never mention bonding. No
license / insurance / certification claims until verified. No stock or AI photos
presented as BNZ work — `PhotoSlot` placeholders until approved photos exist.
