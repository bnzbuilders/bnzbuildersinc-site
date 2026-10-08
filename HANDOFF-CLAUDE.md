# HANDOFF — BNZ Builders Inc. public site v2 (for Claude Code)

- Repo: `bnzbuilders/bnzbuildersinc-site` · base commit **bdbc50d** (main)
- Work branch: **`grok/public-site-v2`** — committed **locally only, not pushed**. No deploys, PRs, settings or DNS changes were made.
- Local clone: `/workspace/bnz-public-site` · Screenshots: `/workspace/bnz-public-site-shots/` · Zip: `/workspace/bnz-public-site-v2.zip`
- Date: Thu Oct 8, 2026

> Scope guard: this is the **construction company** site (BNZ Builders Inc.). Do not touch
> BuildWithBNZ / buildwithbnz.com or its repos (bnz-site, bnz-app, bnz-ops-*, buildwithbnz-os-*).

---

## 1. What changed vs bdbc50d

**Facts / content**
- Domain → `https://bnzbuilders.com` (was bnzbuildersinc.com). Email → `bnzbuilders1@gmail.com`. Phone unchanged (1-332-258-1401).
- Leadership: Noor Mangani (President), Abdul Salam Mohammed (Vice President), Bilal Mohammed (Project Management / Operations).
- New hero copy (eyebrow, line, headline, supporting copy, "Request a Quote" + "View Our Projects").
- Seven services, **Professional Painting first** as the core trade.
- Projects replaced with a typed portfolio model (see §4). The three bdbc50d "team experience" cards
  (Jazeera, Tobacco Road, NYT College Point) were **removed** — they carried completion claims that are not verified.
  Recoverable from git history if Bilal verifies them.
- **Removed from public render:** all bonding language; "Licensed & insured" claims (header/OG/footer);
  D-U-N-S / NYC DCWP / NYSDOL numbers (kept in data as `credentialsPendingVerification`, behind `SHOW_CREDENTIALS=false`);
  office street address (behind `SHOW_OFFICE_STREET=false`); OSHA/insurance "on request" list; budget field on the form.
- Neutral line "Insurance and registration documentation available on request." appears only on the Government
  Contracting page and capability statement (TODO(Bilal) to confirm).

**Pages**
- New **Government Contracting** page (`/government-contracting/`) replaces `/public-works/` (old URL now a base-aware
  meta-refresh redirect, excluded from the sitemap). Sections: capabilities, compliance awareness, **Documented work**
  (from project data), **Agencies and owners we pursue work with** (NYS OPWDD, NYS OGS, DASNY, NYC SCA, NYC DDC, NYCHA,
  municipal/institutional) with an explicit "not a contract/award/prequalification" disclaimer.
- Home, Services, Projects, About, Contact rebuilt. Capability statement, Careers, Privacy, 404 kept and updated.
- Nav: Services · Projects · Government Contracting · About · Contact + phone + Request a Quote. Careers, Capability
  Statement, Privacy in the footer.

**Design**
- Palette (per Bilal, Oct 8): **deep forest green** dark surfaces (`--ink #18302a`, `--char #1f3a2e`), **cream** light
  backgrounds / text on dark (`--paper #f5f0e6`, `--paper-2 #ece4d3`, `--white #fbf8f2`), **warm tan accent**
  (`--tan #c9a66b`, hover `#d6b67f`, small text on cream `--tan-ink #6e5020`) for buttons, eyebrows, rules, crane linework,
  status dot, CTA band. Tan buttons carry dark-green text (6.1:1). Checked ratios: green on cream 12.4:1, muted #4f5a52 on
  cream 6.3:1, tan on green 6.1:1, #c8cfc4 on green 8.8:1. Lighthouse color-contrast audit passes. All colors are CSS
  variables at the top of `global.css`; favicon and `og.png` recolored to match.
- Archivo Variable (wide, 800) headings + Inter body, self-hosted via @fontsource (no external requests).
- Hero: full-bleed forest green with blueprint grid and an SVG elevation/crane line drawing, captioned
  "ILLUSTRATIVE ELEVATION · NOT A BNZ PROJECT DRAWING". `HERO_PHOTO` swaps in a real photo with a dark overlay.
- Photo placeholders read "Approved project photo coming soon"; before/after slider uses placeholders.
- Motion: hero fade-up, line-draw, reveal-on-scroll — all disabled under `prefers-reduced-motion` and without JS.
- Earlier charcoal + safety-amber scheme fully replaced (no remaining values).
- Fixed: mobile nav drawer (no backdrop-filter so the fixed drawer isn't trapped), sticky header, 44px+ targets.

**SEO / tech**
- Astro `site` = https://bnzbuilders.com always; canonical, og:url, og:image, JSON-LD and sitemap URLs never include
  the preview base path.
- `@astrojs/sitemap` (replaces hand-rolled sitemap.xml.ts) + small hook so `sitemap-index.xml` also points at the root.
- `robots.txt` follows `PREVIEW_NOINDEX` (preview: `Disallow: /`; launch: `Allow: /` + Sitemap).
- JSON-LD `GeneralContractor` on Home, About, Contact: name, url, description, telephone, email,
  addressLocality Cedarhurst / NY / US, areaServed New York State + NYC + Long Island, knowsAbout = services.
  No DUNS, ratings, licenses or bonding.
- New `public/og.png` (non-photographic), new favicon (cream B, tan bar on forest green).
- Scripts: `check-links` updated for launch-domain URLs + sitemap-index; `screenshots` writes 1440×900 and 390×844
  full-page PNGs to `/workspace/bnz-public-site-shots/`; `og-image` uses Archivo.
- `.github/workflows/deploy.yml` **unchanged**.

## 2. File map

```
deploy.config.mjs            PROD_ORIGIN + base path (DEPLOY_TARGET / BASE_PATH)
astro.config.mjs             site/base, sitemap integration, sitemap-index rewrite hook
src/data/site.ts             ALL copy, switches, services, projects, agencies, SEO strings, TODO(Bilal)s
src/lib/paths.ts             u() base-aware links, abs() launch-domain URLs, unbase()
src/layouts/Base.astro       <head> (title/desc/canonical/OG/robots/JSON-LD), header/footer, reveal JS
src/components/
  Header.astro Brand.astro Footer.astro   chrome + mobile drawer
  PageHero.astro HeroGraphic.astro        inner-page hero / home blueprint SVG
  ServiceIcon.astro                       inline SVG icons
  ProjectCard.astro StatusBadge.astro     project card + status pill (never "Completed" unless verified)
  PhotoSlot.astro                         labelled photo placeholder / real <img>
  BeforeAfter.astro                       before/after slider (range input; side-by-side without JS)
  CtaBand.astro                           tan quote CTA band
src/pages/
  index services projects about government-contracting contact
  capability-statement careers privacy 404 public-works(redirect) robots.txt.ts
src/styles/global.css        all styles
scripts/                     check-links, screenshots, serve, og-image
public/                      favicon.svg, og.png   (add public/projects/*, public/team/*, public/CNAME later)
```

## 3. Build / preview

```bash
cd /workspace/bnz-public-site
npm ci
npm run build                 # 0 errors, 0 warnings
npm run check:links           # 0 failures
npm run preview:lan           # http://<host>:4321/bnzbuildersinc-site/  (base path = GitHub Pages preview)
DEPLOY_TARGET=custom-domain npm run build   # base "/" (launch build)
```
Lighthouse (mobile, Oct 8 2026, local preview): Performance 98 · Accessibility 100 · Best Practices 100 ·
SEO 66 in preview (only failing audit = intentional noindex); a launch-mode build (`PREVIEW_NOINDEX=false`,
base `/`) scored SEO 100 / Perf 97.

## 4. Config flags

| Flag | Where | Default | Notes |
|---|---|---|---|
| `PREVIEW_NOINDEX` | site.ts | `true` | The single noindex switch. `false` at launch → removes robots meta, robots.txt allows + lists sitemap. |
| `FORM_ENDPOINT` | site.ts | `''` | `''` → mailto (opens email app pre-filled to bnzbuilders1@gmail.com). URL → `fetch` POST FormData with `Accept: application/json`, falls back to mailto on failure. |
| `FORM_HIDDEN_FIELDS` | site.ts | `{}` | Public hidden fields some services need (e.g. Web3Forms `access_key`). |
| `SHOW_PROJECT_STREET_ADDRESSES` | site.ts | `false` | Street lines stay in data only. |
| `SHOW_OFFICE_STREET` | site.ts | `false` | 424 Rockaway Turnpike carried over from bdbc50d, unconfirmed. |
| `SHOW_CREDENTIALS` | site.ts | `false` | D-U-N-S / DCWP / NYSDOL numbers. |
| `HERO_PHOTO` / `HERO_PHOTO_ALT` | site.ts | `''` | Approved photo path in /public. |
| `DEPLOY_TARGET` | deploy.config.mjs / env | `github-pages` | base `/bnzbuildersinc-site/`; `custom-domain` → `/`. `BASE_PATH` env overrides. |

**Form backend options (nothing signed up for):**
- **Formspree** — create form → `FORM_ENDPOINT = 'https://formspree.io/f/<id>'`. Honeypot field is named `website` (dropped client-side); Formspree also supports `_gotcha` if preferred.
- **Web3Forms** — `FORM_ENDPOINT = 'https://api.web3forms.com/submit'`, `FORM_HIDDEN_FIELDS = { access_key: '<public key>' }`.
- **Cloudflare Worker** — POST endpoint that validates, rate-limits and emails (e.g. via MailChannels/Resend); return 2xx JSON. Add CORS for bnzbuilders.com.
- Update the Privacy page wording if a third-party service is used (it switches automatically on `FORM_ENDPOINT`).

**Projects model** (`src/data/site.ts` → `Project`): `slug, title, agency, agencyApproved, location{street,city,region,area},
trade, scope[], status ('verification-pending'|'closeout-pending'|'in-progress'|'completed'), completionVerified (false),
photos[], beforeAfter[{before,after,label}], publishApproved, featured`. `projectStatusLabel()` returns "Completed" only if
`status==='completed' && completionVerified`. Only `publishApproved` projects render.
- A: Finger Lakes OPWDD Bathroom Renovation — Newark, NY (545 Vienna Street in data) — Status verification pending.
- B: Hudson Valley DDSO Interior Painting — Maybrook, NY (107 Indian Trail in data) — Closeout / sign-off pending verification.
- C: 360 Kenwood painting — `publishApproved:false` (hidden).

## 5. TODO(Bilal) — consolidated (all require Bilal's decision/approval)

1. **Launch approval** of all copy; then flip `PREVIEW_NOINDEX` to `false`.
2. **Photos** — approved, owner-cleared project photos (cover + up to 3 thumbs + before/after per project); hero photo; optional leadership headshots/bios. No stock/AI images.
3. **Project approvals** — confirm A and B may be published (currently `publishApproved: true` for preview) and that the agency names ("NYS OPWDD · Finger Lakes region", "NYS OPWDD · Hudson Valley DDSO") may be shown.
4. **Verified statuses** — set `completionVerified: true` (and `status: 'completed'`) only after closeout/sign-off is verified.
5. **Project C (360 Kenwood)** — confirm location, owner, scope, and whether to publish.
6. **Addresses** — keep occupied-residence street addresses off the site (recommended)? Confirm the office street address (424 Rockaway Turnpike, Cedarhurst, NY 11516) before showing it.
7. **Licenses / insurance / certifications** — verify D-U-N-S, NYC DCWP, NYSDOL registration before `SHOW_CREDENTIALS=true`. Do not add MBE, SCA prequalification, licenses or insurance claims until held and verified. Never add bonding.
8. **"Insurance and registration documentation available on request."** — confirm accurate.
9. **Compliance wording** — confirm prevailing-wage / certified-payroll statements on Government Contracting.
10. **NAICS codes** for the capability statement.
11. **Form service** — choose one (or keep mailto).
12. **Google** — Search Console + Business Profile steps below (no GBP changes made).

## 6. SEO notes

- Target terms used in titles/descriptions/copy: BNZ Builders Inc.; commercial general contractor New York; commercial
  renovation contractor Long Island (service area copy); commercial painting contractor New York; government construction
  contractor New York; institutional renovation contractor.
- **Google Search Console (requires Bilal approval):** after launch, add a **Domain property** for `bnzbuilders.com` and verify
  with the DNS **TXT** record Google provides (GoDaddy DNS). Then submit `https://bnzbuilders.com/sitemap-index.xml`.
  (Alternative: URL-prefix property + HTML meta tag — would need a `google-site-verification` meta in Base.astro.)
- **Google Business Profile (do not change without Bilal):** make NAP match the site exactly — "BNZ Builders Inc.",
  Cedarhurst, NY, 1-332-258-1401, website https://bnzbuilders.com. Consider a service-area business (hide street) with
  NYC / Long Island / NY State areas. Category suggestion: General contractor; secondary: Painter / Commercial painting.

## 7. Launch checklist — bnzbuilders.com on GitHub Pages (**every step requires Bilal approval**)

Current state (checked Oct 8, 2026 via DNS-over-HTTPS): `bnzbuilders.com` **A 160.153.0.116** (GoDaddy),
`www` CNAME → `bnzbuilders.com`, nameservers `ns63/ns64.domaincontrol.com` (GoDaddy). HTTPS on the current host fails
with **ERR_SSL_VERSION_OR_CIPHER_MISMATCH** (reported; TLS handshake failure).

1. Resolve §5; set `PREVIEW_NOINDEX = false` in `src/data/site.ts`.
2. In `deploy.config.mjs` change the default `TARGET` to `'custom-domain'` (the workflow does not set `DEPLOY_TARGET`), so base = `/`.
3. Add `public/CNAME` containing `bnzbuilders.com`. Note (GitHub docs, verified Oct 8 2026): when publishing with a
   **custom GitHub Actions workflow** (this repo), the CNAME file is ignored/not required — the domain is set in
   Settings → Pages. Keeping the file is harmless and documents intent.
4. (Recommended) Verify the domain for GitHub Pages first (org Settings → Pages → Add verified domain → TXT record) to prevent takeover.
5. Merge to `main` (triggers the existing deploy workflow) → repo **Settings → Pages → Custom domain** = `bnzbuilders.com` → Save.
6. **GoDaddy DNS** (remove the existing apex A `160.153.0.116` and any GoDaddy forwarding/parked records):
   - `A @` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA @` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME www` → `bnzbuilders.github.io` (no repo name)
   - These values match current GitHub docs ("Managing a custom domain for your GitHub Pages site", fetched Oct 8 2026). No wildcard records.
7. Wait for DNS + certificate (up to 24 h), then tick **Enforce HTTPS**.
8. Verify: `dig bnzbuilders.com +noall +answer -t A`, `dig www.bnzbuilders.com`, load https://bnzbuilders.com and https://www.bnzbuilders.com (should redirect to apex), check robots.txt and sitemap-index.xml.
9. Search Console + sitemap submission; update Google Business Profile website URL (with approval).

Other hosts (Vercel/Netlify/Cloudflare Pages) also work: build `npm run build`, output `dist`, env `DEPLOY_TARGET=custom-domain`.

## GoDaddy DNS change plan for bnzbuilders.com (verified Oct 8 2026, 3:07 PM ET, from Bilal's GoDaddy account #659914658; REQUIRES BILAL APPROVAL)

Current zone has 17 records. Change ONLY these two:
1. `A @ 160.153.0.116` -> edit to `185.199.108.153`; add `A @ 185.199.109.153`, `A @ 185.199.110.153`, `A @ 185.199.111.153` (optional AAAA: 2606:50c0:8000::153 .. 8003::153).
2. `CNAME www -> bnzbuilders.com` -> edit to `bnzbuilders.github.io`.

DO NOT TOUCH (Microsoft 365 email + GoDaddy plumbing):
- MX @ bnzbuilders-com.mail.protection.outlook.com (0)
- TXT @ NETORG18898397.onmicrosoft.com
- TXT @ v=spf1 include:secureserver.net -all
- TXT _dmarc v=DMARC1; p=reject; ...
- CNAME autodiscover, email, msoid, lyncdiscover, sip
- SRV _sip._tls, _sipfederationtls._tcp
- NS (x2), SOA, _domainconnect

Order: set custom domain `bnzbuilders.com` in GitHub Pages settings first -> change DNS -> wait for cert -> Enforce HTTPS -> verify https://bnzbuilders.com and https://www.bnzbuilders.com -> send a test email to/from @bnzbuilders.com to confirm mail unaffected.
Note: DMARC p=reject + SPF secureserver-only. Any future form service sending as @bnzbuilders.com must be added to SPF first. Current form uses mailto, so no impact.
