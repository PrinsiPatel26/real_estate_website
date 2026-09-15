/**
 * Every commercial detail on this site is verification-dependent.
 * `confidence` decides whether a fact reads as confirmed, as a reference figure
 * that must be re-checked with the developer / HRERA, or as available on request.
 */
export type Confidence = 'verified' | 'reference' | 'onRequest';

export interface ProjectFact {
  label: string;
  value: string;
  confidence: Confidence;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  /** Legal / RERA-registered identity where it differs from the marketing name. */
  registeredAs?: string;
  developer: string;
  location: string;
  eyebrow: string;
  tagline: string;
  overview: string[];
  configuration: string;
  area: string;
  price: string;
  facts: ProjectFact[];
  highlights: {title: string;text: string;}[];
  amenities: string[];
  connectivity: string[];
  floorPlans: {label: string;note: string;}[];
  gallery: GalleryImage[];
  card: string;
  /** Null when no brochure file has been supplied - never fabricate a PDF. */
  brochure: string | null;
  map: {x: number;y: number;sector: string;corridor: string;};
  /** Shown verbatim on the detail page so buyers see the caveat beside the claim. */
  verificationNote: string;
}