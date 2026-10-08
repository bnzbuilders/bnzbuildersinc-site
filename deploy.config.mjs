// ============================================================================
//  WHERE THE SITE IS HOSTED. Change ONE line (TARGET) to switch.
// ============================================================================
//  'github-pages'  → https://bnzbuilders.github.io/bnzbuildersinc-site/  (preview)
//  'custom-domain' → https://bnzbuildersinc.com/                          (launch)
//
//  The DEPLOY_TARGET environment variable overrides it, if set.
//  When switching to the custom domain, also add public/CNAME containing
//  `bnzbuildersinc.com` and set the domain in the repo's Pages settings.
// ============================================================================

export const TARGET = process.env.DEPLOY_TARGET || 'github-pages';

const targets = {
  'github-pages': { site: 'https://bnzbuilders.github.io', base: '/bnzbuildersinc-site/' },
  'custom-domain': { site: 'https://bnzbuildersinc.com', base: '/' },
};

if (!targets[TARGET]) throw new Error(`Unknown DEPLOY_TARGET "${TARGET}"`);

export const SITE = targets[TARGET].site;
/** Always starts and ends with "/". */
export const BASE = targets[TARGET].base;
