/**
 * REPRESENTATIVE STOCK PHOTOS (hero + services only).
 * Free-licensed images from Unsplash / Pexels. They are general illustrations of
 * the trades, NOT BNZ projects, crews or sites. Never use them on project
 * cards or project pages. Sources, photographers and licenses are recorded in
 * public/images/stock/CREDITS.md.
 */
import type { ImageMetadata } from 'astro';
import heroImg from '../assets/stock/hero-interior-painting.jpg';
import painting from '../assets/stock/painting.jpg';
import commercialRenovations from '../assets/stock/commercial-renovations.jpg';
import bathroomRenovations from '../assets/stock/bathroom-renovations.jpg';
import drywallCeilings from '../assets/stock/drywall-ceilings.jpg';
import flooringTile from '../assets/stock/flooring-tile.jpg';
import generalConstruction from '../assets/stock/general-construction.jpg';
import governmentContracting from '../assets/stock/government-contracting.jpg';

export type StockPhoto = { src: ImageMetadata; alt: string; position?: string };

/** Note shown near the photos and in the footer. */
export const STOCK_NOTE = 'Representative images';
export const STOCK_CREDIT_LINE = 'General images from Unsplash/Pexels; not BNZ projects.';

export const heroStock: StockPhoto = {
  src: heroImg,
  alt: 'Commercial interior painting with an airless sprayer (stock image)',
  position: '22% 40%',
};

/** Keyed by service slug (see services in site.ts). */
export const serviceStock: Record<string, StockPhoto> = {
  painting: { src: painting, alt: 'Interior spray painting with masking and floor protection (stock image)' },
  'commercial-renovations': { src: commercialRenovations, alt: 'Commercial interior under renovation with scaffolding (stock image)', position: '45% 50%' },
  'bathroom-renovations': { src: bathroomRenovations, alt: 'Room in renovation with tile layout lines and plumbing rough-in (stock image)' },
  'drywall-ceilings': { src: drywallCeilings, alt: 'Drywall ceiling sanding before paint (stock image)', position: '35% 50%' },
  'flooring-tile': { src: flooringTile, alt: 'Large-format floor tile installation with leveling clips (stock image)' },
  'general-construction': { src: generalConstruction, alt: 'Interior framing and carpentry on a construction site (stock image)' },
  'government-contracting': { src: governmentContracting, alt: 'Corridor in a public school building (stock image)' },
};
