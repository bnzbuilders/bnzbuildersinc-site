// ============================================================================
//  HOSTING CONFIG — canonical origin + base path
// ============================================================================
//  PROD_ORIGIN is the launch domain. Astro `site`, canonical URLs, Open Graph
//  URLs, JSON-LD and the sitemap ALWAYS use it, even in preview builds, so
//  nothing needs to change in the templates at launch.
//
//  BASE is the URL sub-path the build is served from:
//    DEPLOY_TARGET=github-pages  (default) → '/bnzbuildersinc-site/'
//        matches the existing preview at https://bnzbuilders.github.io/bnzbuildersinc-site/
//        and the local preview at http://<host>:4321/bnzbuildersinc-site/
//    DEPLOY_TARGET=custom-domain           → '/'   (use this for bnzbuilders.com)
//    BASE_PATH=/anything/                  → overrides both (rarely needed)
//
//  The deploy workflow does not set DEPLOY_TARGET, so at launch change the
//  default below to 'custom-domain' (and add public/CNAME). See HANDOFF-CLAUDE.md.
// ============================================================================

export const PROD_ORIGIN = 'https://bnzbuilders.com';

export const TARGET = process.env.DEPLOY_TARGET || 'custom-domain';

const bases = {
  'github-pages': '/bnzbuildersinc-site/',
  'custom-domain': '/',
};

if (!bases[TARGET]) throw new Error(`Unknown DEPLOY_TARGET "${TARGET}"`);

const rawBase = process.env.BASE_PATH || bases[TARGET];

export const SITE = PROD_ORIGIN;
/** Always starts and ends with "/". */
export const BASE = ('/' + rawBase.replace(/^\/+|\/+$/g, '') + '/').replace(/\/+/g, '/');
