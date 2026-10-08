/**
 * ============================================================================
 *  BNZ BUILDERS INC. — ALL WEBSITE COPY, PROJECT DATA AND SWITCHES.
 * ============================================================================
 *  Edit here, save, rebuild (`npm run build`). Every page reads from this file.
 *
 *  Accuracy rules (keep these when editing):
 *   - The company is "BNZ Builders Inc." (never "BuildWithBNZ"). Construction
 *     company only: no software / AI messaging.
 *   - Never call a project "Completed" unless completionVerified: true.
 *   - No contract values, PO numbers, agency documents or client personal info.
 *   - Never mention bonding capacity or bonding amounts.
 *   - No license / insurance / certification claims (MBE, SCA prequal, etc.)
 *     on the public site until verified — see `credentialsPendingVerification`.
 *   - No stock or AI photos presented as BNZ work. Use PhotoSlot placeholders.
 *   - Keep each project's details with its own project (Vienna St ≠ Indian Trail).
 *
 *  Search for "TODO(Bilal)" to find every open decision.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// 1. SWITCHES — one-line controls
// ---------------------------------------------------------------------------

/**
 * PREVIEW / LAUNCH switch (the ONE noindex flag).
 *   true  → every page: <meta name="robots" content="noindex, nofollow">,
 *           robots.txt: "Disallow: /". Use while content is unapproved.
 *   false → normal indexing; robots.txt allows crawling + lists the sitemap.
 * TODO(Bilal): flip to false only at launch, after content approval.
 */
export const PREVIEW_NOINDEX = false;

/**
 * Quote-form backend (the ONE form value).
 *   ''  → mailto fallback: the form opens the visitor's email app with every
 *         field filled in, addressed to business.email. Works in preview.
 *   URL → the form POSTs FormData there (Accept: application/json) and falls
 *         back to mailto if the request fails. Compatible with e.g.
 *         'https://formspree.io/f/<id>', 'https://api.web3forms.com/submit'
 *         (also set FORM_HIDDEN_FIELDS.access_key), or a Cloudflare Worker URL.
 * TODO(Bilal): choose a form service. Nothing has been signed up for.
 */
export const FORM_ENDPOINT = '';
/** Extra hidden fields some services need (e.g. { access_key: '...' } for Web3Forms). Public values only. */
export const FORM_HIDDEN_FIELDS: Record<string, string> = {};

/**
 * Show exact street addresses for projects?
 *   false (default) → public pages show city/region only ("Newark, NY").
 *   true            → also shows the street line kept in each project's data.
 * TODO(Bilal): these are occupied residences. Keeping street addresses off the
 * public site is recommended for resident privacy; decide before launch.
 */
export const SHOW_PROJECT_STREET_ADDRESSES = false;

/**
 * Show the office street address? (Kept from the bdbc50d site.)
 * TODO(Bilal): confirm "424 Rockaway Turnpike, Cedarhurst, NY 11516" is the
 * address you want public. While false, the site shows "Cedarhurst, NY" only.
 */
export const SHOW_OFFICE_STREET = false;

/**
 * Show registration numbers (credentialsPendingVerification below)?
 * TODO(Bilal): verify each number is current and that you want it public.
 */
export const SHOW_CREDENTIALS = false;

/**
 * Hero photo. '' → non-photographic blueprint illustration (clearly labeled).
 * Set to an APPROVED BNZ jobsite photo, e.g. '/photos/hero.jpg' in /public.
 * TODO(Bilal): supply an approved, owner-cleared construction photo.
 */
export const HERO_PHOTO = '';
export const HERO_PHOTO_ALT = '';

// ---------------------------------------------------------------------------
// 2. BUSINESS FACTS (NAP)
// ---------------------------------------------------------------------------

export const business = {
  legalName: 'BNZ Builders Inc.',
  name: 'BNZ Builders',
  url: 'https://bnzbuilders.com',
  phoneDisplay: '1-332-258-1401',
  phoneHref: 'tel:+13322581401',
  phoneE164: '+1-332-258-1401',
  email: 'bnzbuilders1@gmail.com',
  address: {
    street: '424 Rockaway Turnpike', // shown only if SHOW_OFFICE_STREET
    city: 'Cedarhurst',
    region: 'NY',
    postalCode: '11516',
    country: 'US',
  },
  tagline: 'Building with precision. Delivering with purpose.',
  summary:
    'BNZ Builders Inc. provides commercial renovations, professional painting, interior improvements, and public works construction services throughout New York.',
};

export const cityLine = `${business.address.city}, New York`;
export const officeLine = SHOW_OFFICE_STREET
  ? `${business.address.street}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`
  : `${business.address.city}, ${business.address.region}`;

export const leadership = [
  // TODO(Bilal): optional headshots in /public/team/ (set `photo`) and short bios.
  { name: 'Noor Mangani', role: 'President', photo: '' },
  { name: 'Abdul Salam Mohammed', role: 'Vice President', photo: '' },
  { name: 'Bilal Mohammed', role: 'Project Management / Operations', photo: '' },
];

// ---------------------------------------------------------------------------
// 3. NAVIGATION
// ---------------------------------------------------------------------------

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Government Contracting', href: '/government-contracting/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerNav = [
  ...nav,
  { label: 'Capability Statement', href: '/capability-statement/' },
  { label: 'Careers & Subcontractors', href: '/careers/' },
  { label: 'Privacy', href: '/privacy/' },
];

// ---------------------------------------------------------------------------
// 4. SERVICE AREA
// ---------------------------------------------------------------------------

export const serviceArea = {
  priority: ['New York City', 'Long Island'],
  statewide: 'Public and institutional work across New York State',
  note: 'Based in Cedarhurst, NY. Priority markets are New York City and Long Island; government and institutional construction is pursued across New York State.',
};

// ---------------------------------------------------------------------------
// 5. SERVICES (Painting first — the core trade)
// ---------------------------------------------------------------------------

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  items: string[];
  icon: 'paint' | 'building' | 'bath' | 'drywall' | 'tile' | 'hammer' | 'capitol';
  core?: boolean;
};

export const services: Service[] = [
  {
    slug: 'painting',
    title: 'Professional Painting',
    short: 'Interior and exterior painting with the surface prep that makes a finish last.',
    intro:
      'Painting is our core trade. We handle commercial and institutional repainting, with careful protection and sequencing so occupied buildings can stay in use.',
    items: ['Interior painting', 'Exterior painting', 'Commercial repainting', 'Surface preparation', 'Patching and repairs', 'Trim and finishing'],
    icon: 'paint',
    core: true,
  },
  {
    slug: 'commercial-renovations',
    title: 'Commercial Renovations',
    short: 'Interior renovations, tenant improvements and commercial fit-outs.',
    intro: 'Renovation work for offices, retail and institutional spaces, coordinated under one contract from demolition to finish.',
    items: ['Interior renovation', 'Tenant improvements', 'Commercial fit-outs'],
    icon: 'building',
  },
  {
    slug: 'bathroom-renovations',
    title: 'Bathroom Renovations',
    short: 'Complete bathroom renovations from demolition through fixtures.',
    intro: 'Full bathroom renovations for commercial, institutional and residential settings, with trades coordinated in sequence.',
    items: ['Demolition', 'Plumbing coordination', 'Wall finishes', 'Flooring', 'Fixtures and vanities', 'Complete bathroom renovation'],
    icon: 'bath',
  },
  {
    slug: 'drywall-ceilings',
    title: 'Drywall & Ceiling Work',
    short: 'Sheetrock, taping, finishing, ceiling repairs and acoustic ceilings.',
    intro: 'Wall and ceiling work finished to a paint-ready standard.',
    items: ['Sheetrock installation', 'Taping and finishing', 'Ceiling repairs', 'Acoustic ceiling systems'],
    icon: 'drywall',
  },
  {
    slug: 'flooring-tile',
    title: 'Flooring & Tile',
    short: 'Commercial flooring, ceramic tile, vinyl and wall tile.',
    intro: 'Floor and tile installation for commercial and institutional interiors.',
    items: ['Commercial flooring', 'Ceramic tile', 'Vinyl flooring', 'Wall tile'],
    icon: 'tile',
  },
  {
    slug: 'general-construction',
    title: 'General Construction',
    short: 'Demolition, carpentry, doors and interior renovation, with subcontractors coordinated.',
    intro: 'The general-contracting work that ties a renovation together.',
    items: ['Demolition', 'Carpentry', 'Doors', 'Interior renovations', 'Subcontractor coordination'],
    icon: 'hammer',
  },
  {
    slug: 'government-contracting',
    title: 'Government Contracting',
    short: 'Public works and institutional renovations, including prevailing-wage projects.',
    intro: 'Construction for public agencies and institutional owners, run with the documentation public work requires.',
    items: ['Public works', 'Institutional renovations', 'Prevailing-wage projects', 'Construction compliance'],
    icon: 'capitol',
  },
];

// ---------------------------------------------------------------------------
// 6. PROJECTS — typed portfolio data
// ---------------------------------------------------------------------------
// Rules: status is never shown as "Completed" unless completionVerified is
// true. Photos stay empty (placeholders render) until approved. Only projects
// with publishApproved: true render publicly. Street lines render only when
// SHOW_PROJECT_STREET_ADDRESSES is true.

export type ProjectStatus = 'verification-pending' | 'closeout-pending' | 'in-progress' | 'completed';

export type Photo = { src: string; alt: string; caption?: string };

export type Project = {
  slug: string;
  title: string;
  /** Agency / owner type. Rendered only if agencyApproved is true. */
  agency?: string;
  agencyApproved: boolean;
  location: { street?: string; city: string; region: string; area?: string };
  trade: string;
  scope: string[];
  status: ProjectStatus;
  /** Must be explicitly set true (after verification) to ever show "Completed". */
  completionVerified: boolean;
  photos: Photo[];
  beforeAfter: { before?: Photo; after?: Photo; label?: string }[];
  publishApproved: boolean;
  featured?: boolean;
  notes?: string; // internal only, never rendered
};

export const projects: Project[] = [
  {
    slug: 'finger-lakes-opwdd-bathroom',
    title: 'Finger Lakes OPWDD Bathroom Renovation',
    // TODO(Bilal): confirm the agency name may be shown publicly.
    agency: 'NYS OPWDD · Finger Lakes region',
    agencyApproved: true,
    // TODO(Bilal): occupied residence — keep the street off the public site? (see SHOW_PROJECT_STREET_ADDRESSES)
    location: { street: '545 Vienna Street', city: 'Newark', region: 'NY', area: 'Finger Lakes' },
    trade: 'Bathroom renovation',
    scope: ['Bathroom renovation', 'Solid-surface materials', 'Vanity-related work', 'Associated construction'],
    status: 'verification-pending',
    completionVerified: false, // TODO(Bilal): set true only after closeout is verified
    photos: [], // TODO(Bilal): approved photos only
    beforeAfter: [{ label: 'Bathroom' }],
    publishApproved: true, // TODO(Bilal): confirm approval to publish before launch
    featured: true,
  },
  {
    slug: 'hudson-valley-ddso-painting',
    title: 'Hudson Valley DDSO Interior Painting',
    // TODO(Bilal): confirm the agency name may be shown publicly.
    agency: 'NYS OPWDD · Hudson Valley DDSO',
    agencyApproved: true,
    // TODO(Bilal): occupied residence — keep the street off the public site? (see SHOW_PROJECT_STREET_ADDRESSES)
    location: { street: '107 Indian Trail', city: 'Maybrook', region: 'NY', area: 'Hudson Valley' },
    trade: 'Interior painting',
    scope: ['Interior patching', 'Surface preparation', 'Interior painting', 'Trim', 'Restoration of finishes in an occupied residence'],
    status: 'closeout-pending',
    completionVerified: false, // TODO(Bilal): set true only after sign-off is verified
    photos: [], // TODO(Bilal): approved photos only
    beforeAfter: [{ label: 'Interior finishes' }],
    publishApproved: true, // TODO(Bilal): confirm approval to publish before launch
    featured: true,
  },
  {
    slug: '360-kenwood-painting',
    title: '360 Kenwood Painting',
    agencyApproved: false,
    // TODO(Bilal): confirm full location, owner, scope and whether to publish.
    location: { street: '360 Kenwood', city: 'Location to be confirmed', region: 'NY' },
    trade: 'Interior / exterior painting',
    scope: ['Interior painting', 'Exterior painting'],
    status: 'verification-pending',
    completionVerified: false,
    photos: [],
    beforeAfter: [],
    publishApproved: false, // DRAFT — hidden from the public render
  },
];

const statusLabels: Record<ProjectStatus, string> = {
  'verification-pending': 'Status verification pending',
  'closeout-pending': 'Closeout / sign-off pending verification',
  'in-progress': 'In progress',
  completed: 'Status verification pending', // never "Completed" without completionVerified
};

export function projectStatusLabel(p: Project): string {
  if (p.status === 'completed' && p.completionVerified) return 'Completed';
  return statusLabels[p.status];
}

export function projectLocation(p: Project): string {
  const city = `${p.location.city}, ${p.location.region}`;
  return SHOW_PROJECT_STREET_ADDRESSES && p.location.street ? `${p.location.street}, ${city}` : city;
}

export const publicProjects = projects.filter((p) => p.publishApproved);

// ---------------------------------------------------------------------------
// 7. GOVERNMENT CONTRACTING
// ---------------------------------------------------------------------------

/** "Agencies and owners we pursue work with" — NOT a claim of contracts or prequalification. */
export const agenciesPursued = [
  { short: 'NYS OPWDD', name: 'NYS Office for People With Developmental Disabilities' },
  { short: 'NYS OGS', name: 'NYS Office of General Services' },
  { short: 'DASNY', name: 'Dormitory Authority of the State of New York' },
  { short: 'NYC SCA', name: 'NYC School Construction Authority' },
  { short: 'NYC DDC', name: 'NYC Department of Design and Construction' },
  { short: 'NYCHA', name: 'New York City Housing Authority' },
  { short: 'Municipal', name: 'Municipal and institutional owners across New York' },
];

/** TODO(Bilal): confirm the prevailing-wage / certified-payroll wording matches how BNZ actually operates. */
export const govCapabilities = [
  { title: 'Public works', text: 'Renovation and repair work for state agencies, authorities and municipalities.' },
  { title: 'Institutional renovations', text: 'Residences, schools and facilities where buildings stay occupied and protection comes first.' },
  { title: 'Prevailing wage', text: 'Applicable prevailing-wage schedules followed when the contract requires them.' },
  { title: 'Construction compliance', text: 'Certified payroll, submittals and closeout documentation prepared as the contract specifies.' },
];

export const deliveryApproach = [
  { title: 'Scope', text: 'We walk the site, read the documents and confirm exactly what is included before pricing.' },
  { title: 'Plan', text: 'Schedule, protection and sequencing are set up front, especially in occupied buildings.' },
  { title: 'Build', text: 'One point of contact runs the job and coordinates every trade and subcontractor.' },
  { title: 'Close out', text: 'Punch list, cleanup and closeout paperwork, finished properly.' },
];

/**
 * Registration numbers carried over from the bdbc50d site.
 * NOT RENDERED while SHOW_CREDENTIALS is false.
 * TODO(Bilal): verify each is current before showing any of them.
 * Do NOT add MBE, SCA prequalification, licenses or insurance claims until
 * verified. Never add bonding capacity or bonding amounts.
 */
export const credentialsPendingVerification = [
  { label: 'D-U-N-S', value: '139354417' },
  { label: 'NYC DCWP', value: '2129829-DCWP' },
  { label: 'NYSDOL public work registration', value: '26-66SKI-CR' },
];

/** TODO(Bilal): confirm this neutral line is accurate (documents actually on file and current). */
export const documentsLine = 'Insurance and registration documentation available on request.';

/** TODO(Bilal): add primary/secondary NAICS codes; while empty the capability statement says "available on request". */
export const naics: { code: string; label: string }[] = [];

// ---------------------------------------------------------------------------
// 8. PAGE COPY + SEO
// ---------------------------------------------------------------------------

export const seo = {
  home: {
    title: 'BNZ Builders Inc. | Commercial General Contractor in New York',
    description:
      'BNZ Builders Inc. is a commercial general contractor in Cedarhurst, NY: commercial renovations, professional painting, interior improvements and public works across New York, with priority on NYC and Long Island.',
  },
  services: {
    title: 'Services | Commercial Painting, Renovation & Construction | BNZ Builders Inc.',
    description:
      'Commercial painting contractor in New York and commercial renovation contractor for Long Island and NYC: professional painting, commercial renovations, bathroom renovations, drywall and ceilings, flooring and tile, general construction and government contracting.',
  },
  projects: {
    title: 'Projects | BNZ Builders Inc.',
    description:
      'Documented renovation and painting work by BNZ Builders Inc. in New York, including institutional bathroom renovation and interior painting. Approved project photos coming soon.',
  },
  gov: {
    title: 'Government Construction Contractor in New York | BNZ Builders Inc.',
    description:
      'BNZ Builders Inc. pursues public works and institutional renovation contracts across New York State: prevailing-wage awareness, construction compliance, and documented agency work.',
  },
  about: {
    title: 'About BNZ Builders Inc. | Cedarhurst, NY General Contractor',
    description:
      'BNZ Builders Inc. is a Cedarhurst, New York general contractor and institutional renovation contractor: commercial renovations, painting, interior improvements and public works. Meet the leadership team.',
  },
  contact: {
    title: 'Contact BNZ Builders Inc. | Request a Quote',
    description:
      'Request a quote from BNZ Builders Inc., Cedarhurst, NY. Call 1-332-258-1401 or email bnzbuilders1@gmail.com about commercial renovation, painting or public works projects.',
  },
};

export const about = {
  story: [
    'BNZ Builders Inc. is a general contractor based in Cedarhurst, New York. We handle commercial renovations, institutional construction, interior improvements and professional painting, and we pursue public works across New York State, with priority on New York City and Long Island.',
    'Painting is our core trade, and it shapes how we work: careful preparation, protected spaces and clean finishes. We bring the same approach to bathrooms, drywall and ceilings, flooring and tile, and full interior renovations.',
    'Much of our work happens in buildings that stay in use. We plan protection and sequencing around the people who live and work there.',
  ],
  capabilities: [
    'Professional painting — interior and exterior',
    'Commercial renovations and tenant improvements',
    'Bathroom renovations',
    'Drywall, taping and ceiling systems',
    'Flooring and tile',
    'General construction and subcontractor coordination',
    'Public works and institutional renovations',
  ],
};

export const careers = {
  seoTitle: 'Careers & Subcontractors | BNZ Builders Inc.',
  seoDescription:
    'Work in the field with BNZ Builders Inc., or join our subcontractor list. Painting, drywall, tile, flooring, plumbing and electrical trades across New York.',
  careersHeading: 'Work in the field with us.',
  careersText: 'We look for people who show up, protect the building and finish the punch list. Send a short note about your trade and experience.',
  subsHeading: 'Subcontract with BNZ.',
  subsText: 'We keep a short list of reliable subcontractors. Send your trade, coverage area and contact details.',
  trades: ['Painting', 'Drywall', 'Tile', 'Flooring', 'Plumbing', 'Electrical', 'Carpentry'],
};

export const contact = {
  heading: 'Request a quote.',
  lead: 'Tell us about the project. Drawings, a scope sheet or a few photos all help. We will come back with next steps.',
  projectTypes: [...services.map((s) => s.title), 'Other'],
  timelines: ['As soon as possible', 'Within 1–3 months', '3–6 months out', 'More than 6 months out', 'Public bid — due date set', 'Not sure yet'],
};

export const privacy = { lastUpdated: 'October 8, 2026' };
