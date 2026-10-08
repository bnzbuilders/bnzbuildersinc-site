# BNZ Builders Inc. — website (local preview)

Public website for **BNZ Builders Inc.**, the New York general contractor
(424 Rockaway Turnpike, Cedarhurst, NY 11516). This is **not** the
BuildWithBNZ software site.

> Status: **preview.** It is published at
> https://bnzbuilders.github.io/bnzbuildersinc-site/ with **noindex on**, so
> search engines are told not to index it. The quote form is not connected to
> any service. The content is still pending Bilal's approval.

## Stack

- [Astro 5](https://astro.build) with static output to `dist/` (works on Node 20+ / npm 9+)
- Hand-written CSS in `src/styles/global.css` (no framework); a little vanilla JS
  for the mobile menu, the quote form and the print button
- Fonts are self-hosted from npm (no Google Fonts requests at runtime):
  **Big Shoulders Display** (headings) + **Inter** (body)

## Run it

```bash
npm install
npm run dev          # live-reload dev server at http://localhost:4321
npm run build        # production build → dist/
npm run serve        # serve dist/ at http://127.0.0.1:4321/bnzbuildersinc-site/ (base path)
npm run check:links  # check every internal link, asset and #anchor in dist/
npm run screenshots  # full-page PNGs → screenshots/ (needs Google Chrome)
npm run og           # re-render public/og.png (social preview image)
```

`screenshots` and `og` use `playwright-core` with the system Chrome at
`/usr/bin/google-chrome`. Set `CHROME_PATH=/path/to/chrome` to use another one.

## Edit the content

**Almost everything lives in one file: [`src/data/site.ts`](src/data/site.ts).**
That includes the address, phone and email, taglines, services, the scope list,
service area, team, credentials, projects, careers copy and form options. Edit
it, then `npm run build`.

Search that file for **`TODO(Bilal)`** to find every open decision.

The main switches are at the top of the file:

| Setting | What it does |
|---|---|
| `PREVIEW_NOINDEX` | `true` (current) adds `<meta name="robots" content="noindex, nofollow">` to every page and makes `robots.txt` say `Disallow: /`. Set it to `false` at launch for normal indexing; `robots.txt` then allows crawling and lists the sitemap. |
| `SHOW_DRAFT_PROJECTS` | `true` shows the three unverified project cards with a **DRAFT, pending approval** badge. `false` hides them, and the Projects page then shows a "gallery coming soon" note. |
| `FORM_ENDPOINT` | Leave `''` and the quote form opens the visitor's email app with everything filled in, addressed to the business email. Set it to a form-service URL (Formspree, Basin, a Cloudflare Worker, …) and the form posts there, falling back to email if that fails. |

### Adding real photos

- Project photos go in `public/projects/`. Set `photo: '/projects/file.jpg'`
  and `photoAlt` on the project in `site.ts`.
- Team headshots go in `public/team/`. Set `photo` on the team member.
- Until a photo is set, a hatched box labelled "Project photo coming soon" /
  "Photo coming soon" shows instead. **Do not use stock photos that could be
  mistaken for BNZ work.**

### Accuracy rules (keep them)

- Don't say "New York State licensed GC". New York has no statewide GC
  license, so use the exact credential and number.
- Say "across New York", never "tri-state".
- No testimonials until a real, attributed one is approved.
- No bonding dollar amounts. Don't invent numbers (years, project counts,
  square footage).
- Don't publish active jobs, private financials or client data without
  Bilal's approval.

## Pages

| URL | File |
|---|---|
| `/` | `src/pages/index.astro` |
| `/services/` | `src/pages/services.astro` |
| `/projects/` | `src/pages/projects.astro` |
| `/about/` | `src/pages/about.astro` |
| `/public-works/` (Public Works & Credentials) | `src/pages/public-works.astro` |
| `/capability-statement/` (printable, "Save as PDF") | `src/pages/capability-statement.astro` |
| `/careers/` (Careers & Subcontractors) | `src/pages/careers.astro` |
| `/contact/` (Request a Quote) | `src/pages/contact.astro` |
| `/privacy/` | `src/pages/privacy.astro` |
| 404 | `src/pages/404.astro` |
| `/sitemap.xml` | `src/pages/sitemap.xml.ts` (add new pages to its list) |
| `/robots.txt` | `src/pages/robots.txt.ts` (follows `PREVIEW_NOINDEX`) |

SEO: every page has a unique title and description, a canonical URL, and
Open Graph/Twitter tags with `og.png`. Home and Contact also carry
`GeneralContractor` JSON-LD with the real name, address and phone.

## Hosting & deploys

### Where it's hosted: `deploy.config.mjs` (one line)

```js
export const TARGET = process.env.DEPLOY_TARGET || 'github-pages';
```

| TARGET | Site URL | Base path |
|---|---|---|
| `github-pages` (current) | https://bnzbuilders.github.io/bnzbuildersinc-site/ | `/bnzbuildersinc-site/` |
| `custom-domain` | https://bnzbuildersinc.com/ | `/` |

Astro's `site` and `base` come from this file, so do canonical URLs, OG
image URLs, JSON-LD, the sitemap and robots.txt. **In templates, always write
internal links as `u('/path/')`** (from `src/lib/paths.ts`) so they follow the
base path. `npm run check:links` fails on any root-relative link that's
missing the base.

### GitHub Pages (current)

- Repo: `bnzbuilders/bnzbuildersinc-site`. Pages source: **GitHub Actions**.
- `.github/workflows/deploy.yml` runs on every push to `main` (or a manual
  "Run workflow"). It uses Node 20 and runs `npm ci`, `npm run build` and
  `npm run check:links`, then deploys `dist/` with
  `actions/upload-pages-artifact` + `actions/deploy-pages`.

### Launch checklist: switch to bnzbuildersinc.com

1. Resolve every `TODO(Bilal)` in `src/data/site.ts`, and set
   `SHOW_DRAFT_PROJECTS` as approved.
2. `src/data/site.ts`: set `PREVIEW_NOINDEX = false`.
3. `deploy.config.mjs`: change `'github-pages'` to `'custom-domain'`. The
   workflow doesn't set `DEPLOY_TARGET`, so this file decides.
4. Add `public/CNAME` containing `bnzbuildersinc.com`.
5. Push to `main`, then in the repo go to Settings → Pages → Custom domain
   and enter `bnzbuildersinc.com`. Turn on "Enforce HTTPS" once the
   certificate is issued.
6. DNS: `bnzbuildersinc.com` currently uses **Squarespace DNS** and shows a
   Squarespace "Coming Soon" page (as of Oct 7, 2026). In Squarespace →
   Domains → DNS:
   - Apex `A` records → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`.
   - `www` `CNAME` → `bnzbuilders.github.io`.
   - Remove the conflicting Squarespace default records.

Other hosts work too: Vercel, Netlify and Cloudflare Pages all use build
command `npm run build` and output `dist`, with `DEPLOY_TARGET=custom-domain`.
