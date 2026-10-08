/**
 * ============================================================================
 *  BNZ BUILDERS INC. — ALL WEBSITE COPY AND SETTINGS LIVE IN THIS ONE FILE.
 * ============================================================================
 *  Edit text here, save, and rebuild (`npm run build`). Every page reads from
 *  this file, so you rarely need to touch the page templates.
 *
 *  Accuracy rules (keep these when editing):
 *   - Never say "New York State licensed general contractor" (NY has no
 *     statewide GC license). Use the exact credential + number instead.
 *   - Say "across New York", never "tri-state".
 *   - No testimonials until a real, attributed, approved one exists.
 *   - No bonding dollar amounts. No invented numbers (years, counts, sq ft).
 *   - Do not publish active jobs, private financials, payroll or client data.
 *
 *  Search for "TODO(Bilal)" to find every item that still needs a decision.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// 1. SWITCHES — one-line controls
// ---------------------------------------------------------------------------

/**
 * PREVIEW / NOINDEX switch.
 *   true  → every page gets <meta name="robots" content="noindex, nofollow">
 *           and robots.txt says "Disallow: /" (use while content is unapproved)
 *   false → normal indexing; robots.txt allows crawling and lists the sitemap
 * TODO(Bilal): set to false only when the content is approved for launch.
 */
export const PREVIEW_NOINDEX = true;


/**
 * Project cards that still need verification (needsVerification: true).
 *   true  → show them with a visible "DRAFT, pending approval" badge
 *   false → hide them everywhere (the Projects page shows a short note instead)
 * TODO(Bilal): set to false before launch unless every card is approved.
 */
export const SHOW_DRAFT_PROJECTS = true;

/**
 * Where the Request a Quote form sends submissions.
 * TODO(Bilal): leave '' until a form service is chosen (e.g. Formspree,
 * Basin, a Cloudflare Worker). While empty, the form opens the visitor's
 * email app with everything pre-filled, addressed to business.email.
 * Example when ready: 'https://formspree.io/f/xxxxxxx'
 */
export const FORM_ENDPOINT = '';

// ---------------------------------------------------------------------------
// 2. BUSINESS FACTS (NAP) — used in header, footer, contact page, JSON-LD
// ---------------------------------------------------------------------------

export const business = {
  legalName: 'BNZ Builders Inc.',
  name: 'BNZ Builders',
  // Production domain (the live URL itself comes from deploy.config.mjs).
  url: 'https://bnzbuildersinc.com',
  phoneDisplay: '1-332-258-1401',
  phoneHref: 'tel:+13322581401',
  phoneE164: '+1-332-258-1401',
  email: 'saracooper@bnzbuildersinc.com',
  address: {
    street: '424 Rockaway Turnpike',
    city: 'Cedarhurst',
    region: 'NY',
    postalCode: '11516',
    country: 'US',
  },
  // Short one-liners (all approved wording from earlier BNZ material).
  tagline: 'Built right. On time. On budget.',
  credentialLine: 'Licensed & insured contractor serving New York',
  aboutLine: 'A New York contractor that stays on the job.',
  bondingNote: 'Bonding available based on project requirements.',
};

export const addressOneLine = `${business.address.street}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`;

// ---------------------------------------------------------------------------
// 3. NAVIGATION
// ---------------------------------------------------------------------------

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Public Works', href: '/public-works/' },
  { label: 'About', href: '/about/' },
  { label: 'Careers', href: '/careers/' },
  { label: 'Contact', href: '/contact/' },
];

// ---------------------------------------------------------------------------
// 4. HOME PAGE
// ---------------------------------------------------------------------------

export const home = {
  seoTitle: 'BNZ Builders Inc. | New York General Contractor — Interiors & Public Works',
  seoDescription:
    'BNZ Builders Inc. is a New York general contractor in Cedarhurst, NY. Interiors, painting, drywall, bathrooms, commercial fit-out and public-works renovations. Same PM from scope through punch list.',
  heroLead:
    'Interiors, painting, drywall, bathrooms, and public-works renovations for New York owners and agencies. The same project manager who scopes the job runs it to close-out.',
  facts: [
    { label: 'Headquarters', value: 'Cedarhurst, NY' },
    { label: 'Same PM', value: 'Scope through punch list' },
    { label: 'Public work', value: 'Prevailing wage when required' },
    { label: 'Bonding', value: 'Available based on project requirements' },
  ],
  servicesHeading: 'Full-service interiors. One contract.',
  ctaHeading: 'Have drawings or a scope? Send it over.',
  ctaText: 'Tell us what you are building, where, and when. We will come back with next steps.',
};

// ---------------------------------------------------------------------------
// 5. DIFFERENTIATORS (from the BNZ capability statement)
// ---------------------------------------------------------------------------

export const differentiators = [
  {
    title: 'Same PM from scope through punch list.',
    text: 'The project manager who scopes the work stays on it through punch list.',
  },
  {
    title: 'Occupied-space protection.',
    text: 'Protection and sequencing for buildings that stay in use while we work.',
  },
  {
    title: 'Prevailing wage when required.',
    text: 'Certified payroll and public-work paperwork handled by the book.',
  },
  {
    title: 'Bonding available based on project requirements.',
    text: 'Tell us what your project calls for and we will confirm.',
  },
];

// ---------------------------------------------------------------------------
// 6. SERVICES
// ---------------------------------------------------------------------------

export const services = [
  {
    slug: 'general-contracting',
    title: 'General contracting',
    short: 'Permits through punch list for occupied renovations.',
    text: 'Full project management from permitting through punch list for interiors and occupied renovations.',
  },
  {
    slug: 'painting',
    title: 'Painting',
    short: 'Commercial and institutional packages. Protection first.',
    text: 'Commercial and institutional painting packages, protection, and occupied-building sequencing.',
  },
  {
    slug: 'drywall-interiors',
    title: 'Drywall & interiors',
    short: 'Sheetrock, taping, plaster, ceilings, finish carpentry.',
    text: 'Sheetrock, taping, plaster, patch and paint, acoustical ceilings, finish carpentry.',
  },
  {
    slug: 'bathroom-renovation',
    title: 'Bathroom renovation',
    short: 'Institutional and residential bathrooms to close-out.',
    text: 'Institutional and residential bathrooms — tile, vanities, waterproofing, closeout.',
  },
  {
    slug: 'public-works-interiors',
    title: 'Public works interiors',
    short: 'Municipal and agency work. Prevailing wage when required.',
    text: 'Small municipal and agency renovations, prevailing wage, certified payroll, bid-desk discipline.',
  },
  {
    slug: 'commercial-fit-out',
    title: 'Commercial fit-out',
    short: 'Tenant interiors, doors, selective demolition under one PM.',
    text: 'Tenant interiors, selective demolition, doors, and storefront work under one contract.',
  },
];

/** The broader scope list (from the BNZ master profile). */
export const scopes = [
  'Interior painting',
  'Drywall / sheetrock',
  'Framing',
  'Taping',
  'Plaster / patching',
  'Interior finishes',
  'Bathroom renovation',
  'Light renovation',
  'Flooring',
  'Tile',
  'Acoustical ceilings',
  'Finish carpentry',
  'Selective demolition',
  'Aluminum storefront / door work',
  'Occupied residential / IRA / group-home interiors',
  'Small municipal / village interiors',
  'OPWDD interior renovation and repair',
];

// ---------------------------------------------------------------------------
// 7. SERVICE AREA
// ---------------------------------------------------------------------------

export const serviceArea = {
  heading: 'Long Island and NYC first. Public work across New York.',
  areas: ['Nassau County', 'Suffolk County', 'Queens', 'New York City', 'Westchester', 'Hudson Valley'],
  note: 'Agency and institutional work elsewhere in New York when the size, schedule and logistics fit.',
};

// ---------------------------------------------------------------------------
// 8. PROJECTS
// ---------------------------------------------------------------------------
// All three entries below come from the internal project registry and are
// marked "Needs Verification". They describe TEAM EXPERIENCE, not contracts
// held by BNZ Builders Inc. No dollar values are published, by rule.
// To add a real photo: put the file in /public/projects/ and set `photo`.

export type Project = {
  title: string;
  client: string;
  type: string;
  location: string;
  year: string;
  scope: string;
  credit: string; // how BNZ's role must be described
  needsVerification: boolean;
  photo?: string; // e.g. '/projects/jazeera-01.jpg'
  photoAlt?: string;
};

export const projects: Project[] = [
  {
    title: 'Full interior build-out',
    client: 'Jazeera Restaurant',
    type: 'Restaurant interior',
    location: 'Hicksville, NY',
    year: '2024',
    scope:
      'Full demolition and interior reconstruction: framing, drywall, finish carpentry, flooring, tile, commercial-kitchen coordination, plumbing and electrical coordination, suspended ceilings, painting, fixtures, inspections and turnover.',
    // TODO(Bilal): confirm the performing contractor and each person's role.
    credit: 'Team experience. Completed in 2024 by members of the BNZ team, before BNZ Builders Inc. was incorporated.',
    needsVerification: true,
  },
  {
    title: 'Luxury lounge build-out',
    client: 'Tobacco Road Premium Cigars',
    type: 'Retail / hospitality interior',
    location: 'Cedarhurst, NY',
    year: '2022–2024',
    scope:
      'Lounge renovation including architectural finishes, custom finish carpentry support, flooring, lighting coordination, storefront upgrades and Armstrong ceiling systems.',
    // TODO(Bilal): confirm BNZ leadership roles (e.g. Noor Mangani's management role).
    credit: 'Team experience, before BNZ Builders Inc. was incorporated. Role details pending confirmation.',
    needsVerification: true,
  },
  {
    title: 'Locker room improvements',
    client: 'The New York Times facility',
    type: 'Corporate facility interior',
    location: 'College Point, NY',
    year: '2024',
    scope: 'Locker-room and bathroom improvements with plumbing-related work.',
    // TODO(Bilal): confirm the contracting chain and supported roles.
    credit: 'Prime contractor: M I Builders Inc. Work coordinated by members of the BNZ team.',
    needsVerification: true,
  },
];

// ---------------------------------------------------------------------------
// 9. TEAM
// ---------------------------------------------------------------------------

export const team = [
  // TODO(Bilal): add headshots to /public/team/ and set `photo`.
  { name: 'Noor Mangani', role: 'President', photo: '' },
  { name: 'Abdul Salam Mohammed', role: 'Vice President', photo: '' },
  { name: 'Bilal Mohammed', role: 'Field / Project Manager', photo: '' },
];

export const about = {
  seoTitle: 'About BNZ Builders Inc. | Cedarhurst, NY General Contractor',
  seoDescription:
    'BNZ Builders Inc. is a New York general contractor based in Cedarhurst, NY, focused on interior renovation and finish trades for owners, tenants and public agencies.',
  story: [
    'BNZ Builders Inc. is a New York general contractor based at 424 Rockaway Turnpike in Cedarhurst.',
    'We focus on interior renovation and finish trades: painting, drywall, bathrooms, ceilings, flooring, doors and storefronts. We work for owners, tenants and public agencies, including occupied buildings that cannot shut down while the work happens.',
    'The project manager who scopes the work stays on it through punch list.',
  ],
};

// ---------------------------------------------------------------------------
// 10. PUBLIC WORKS & CREDENTIALS
// ---------------------------------------------------------------------------

export const publicWorks = {
  seoTitle: 'Public Works & Credentials | BNZ Builders Inc.',
  seoDescription:
    'Agency and municipal interiors in New York. Prevailing wage and certified payroll when required. D-U-N-S 139354417, NYC DCWP 2129829-DCWP, NYSDOL public work registration 26-66SKI-CR.',
  heading: 'Agency interiors. Prevailing wage when required.',
  lead: 'Small municipal and institutional renovations in New York State. Bonding available based on project requirements.',
  capabilities: [
    { title: 'Prevailing wage', text: 'Wage schedules followed on public work when the contract requires it.' },
    { title: 'Certified payroll', text: 'Certified payroll prepared and submitted with the job paperwork.' },
    { title: 'Occupied buildings', text: 'Protection and sequencing for buildings that stay in use during the work.' },
    { title: 'OPWDD / IRA group-home interiors', text: 'Interior renovation and repair in residential and group-home facilities.' },
  ],
};

/** Credentials with real numbers. Do not add a number unless it is on file. */
export const credentials = [
  { label: 'Legal name', value: 'BNZ Builders Inc.' },
  { label: 'D-U-N-S', value: '139354417' },
  { label: 'NYC DCWP', value: '2129829-DCWP' },
  { label: 'NYSDOL public work registration', value: '26-66SKI-CR' },
  { label: 'Headquarters', value: addressOneLine },
];

/**
 * Documents shared on request (no numbers shown).
 * TODO(Bilal): confirm each line is current before launch. Insurance records in
 * Notion ran to July 2026; confirm renewed certificates. MBE, SCA
 * prequalification and SAM.gov UEI were deliberately left off: add them only
 * once they are actually held.
 */
export const onRequest = [
  'Certificates of insurance',
  'W-9',
  'OSHA training cards for field crew',
  'NYC PASSPort and NYS vendor (SFS) registration details',
  'Bonding letter, based on project requirements',
];

/** TODO(Bilal): add primary/secondary NAICS codes. While empty, the
 *  capability statement says "available on request". */
export const naics: { code: string; label: string }[] = [];

// ---------------------------------------------------------------------------
// 11. CAREERS & SUBCONTRACTORS
// ---------------------------------------------------------------------------

export const careers = {
  seoTitle: 'Careers & Subcontractors | BNZ Builders Inc.',
  seoDescription:
    'Work in the field with BNZ Builders, or join our short vendor list. Painting, drywall, tile, plumbing, electric and protection trades across New York.',
  careersHeading: 'Come work in the field with us.',
  careersText: 'We hire people who show up, protect the building, and finish the punch list. Send a short note.',
  subsHeading: 'Subcontract with BNZ.',
  subsText: 'We keep a short vendor list. Painting, drywall, tile, plumbing, electric, protection. Send coverage area, W-9 status, and COI.',
  trades: ['Painting', 'Drywall', 'Tile', 'Plumbing', 'Electric', 'Protection'],
};

// ---------------------------------------------------------------------------
// 12. CONTACT / QUOTE FORM OPTIONS
// ---------------------------------------------------------------------------

export const contact = {
  seoTitle: 'Contact & Request a Quote | BNZ Builders Inc.',
  seoDescription:
    'Request a quote from BNZ Builders Inc. Call 1-332-258-1401 or email saracooper@bnzbuildersinc.com. 424 Rockaway Turnpike, Cedarhurst, NY 11516.',
  heading: 'Request a quote.',
  lead: 'Tell us about the job. Drawings, a scope sheet or a few photos all help. We will come back with next steps.',
  projectTypes: [
    ...['General contracting', 'Painting', 'Drywall & interiors', 'Bathroom renovation', 'Public works interiors', 'Commercial fit-out'],
    'Other',
  ],
  timelines: ['As soon as possible', 'Within 1–3 months', '3–6 months out', 'More than 6 months out', 'Public bid — due date set', 'Not sure yet'],
  budgets: ['Prefer not to say', 'Under $25k', '$25k–$100k', '$100k–$500k', '$500k+', 'Not sure yet'],
};

export const privacy = {
  lastUpdated: 'October 7, 2026',
};
