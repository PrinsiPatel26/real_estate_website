import type { ImageItem, ProjectFormValue } from './ProjectForm';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function normalizeImageRole(value: unknown): 'card' | 'hero' | 'gallery' | 'floor-plan' {
  const role = String(value ?? '').trim().toLowerCase();
  if (role === 'card' || role === 'hero' || role === 'gallery' || role === 'floor-plan' || role === 'floorplan') {
    return role === 'floorplan' ? 'floor-plan' : (role as 'card' | 'hero' | 'gallery' | 'floor-plan');
  }
  return 'gallery';
}

function normalizeImageList(value: unknown): ImageItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === 'string') {
        const src = item.trim();
        return src ? { src, alt: '', role: 'gallery', isFeatured: false, order: 0 } : null;
      }

      if (!item || typeof item !== 'object') return null;

      const record = item as Record<string, unknown>;
      const src = String(record.src ?? record.url ?? record.image ?? '').trim();
      if (!src) return null;

      return {
        src,
        alt: String(record.alt ?? record.name ?? '').trim(),
        role: normalizeImageRole(record.role ?? record.type),
        isFeatured: Boolean(record.isFeatured),
        order: Number(record.order ?? 0),
        status: 'success'
      };
    })
    .filter(Boolean)
    .map((image, index) => ({ ...(image as ImageItem), order: Number((image as ImageItem).order || index + 1) })) as ImageItem[];
}

function normalizeHighlightList(value: unknown): Array<{ title: string; text: string }> {
  if (!Array.isArray(value)) return [{ title: '', text: '' }];

  const next = value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const record = item as Record<string, unknown>;
      const title = String(record.title ?? '').trim();
      const text = String(record.text ?? '').trim();
      if (!title && !text) return null;
      return { title, text };
    })
    .filter(Boolean) as Array<{ title: string; text: string }>;

  return next.length ? next : [{ title: '', text: '' }];
}

function normalizeStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [''];

  const next = value
    .map((item) => (typeof item === 'string' ? item.trim() : String(item ?? '').trim()))
    .filter(Boolean);

  return next.length ? next : [''];
}

function normalizeFactList(value: unknown): Array<{ label: string; value: string; confidence: 'verified' | 'reference' | 'onRequest' }> {
  if (!Array.isArray(value)) return [{ label: '', value: '', confidence: 'reference' }];
  const next = value.map((item) => {
    const record = item && typeof item === 'object' ? item as Record<string, unknown> : {};
    const confidence = record.confidence === 'verified' || record.confidence === 'onRequest' ? record.confidence : 'reference';
    return { label: String(record.label ?? '').trim(), value: String(record.value ?? '').trim(), confidence } as { label: string; value: string; confidence: 'verified' | 'reference' | 'onRequest' };
  }).filter((item) => item.label || item.value);
  return next.length ? next : [{ label: '', value: '', confidence: 'reference' }];
}

function normalizeFloorPlanList(value: unknown): Array<{ label: string; note: string }> {
  if (!Array.isArray(value)) return [{ label: '', note: '' }];
  const next = value.map((item) => {
    const record = item && typeof item === 'object' ? item as Record<string, unknown> : {};
    return { label: String(record.label ?? '').trim(), note: String(record.note ?? '').trim() };
  }).filter((item) => item.label || item.note);
  return next.length ? next : [{ label: '', note: '' }];
}

export function buildProjectInitialData(initialData: Partial<ProjectFormValue> = {}): ProjectFormValue {
  return {
    _id: initialData._id,
    id: initialData.id,
    name: initialData.name ?? '',
    slug: initialData.slug ?? '',
    developer: initialData.developer ?? '',
    location: initialData.location ?? '',
    city: initialData.city ?? '',
    projectType: initialData.projectType ?? 'Residential',
    status: initialData.status ?? 'Upcoming',
    price: initialData.price ?? '',
    priceLabel: initialData.priceLabel ?? '',
    minimumPrice: initialData.minimumPrice ?? '',
    maximumPrice: initialData.maximumPrice ?? '',
    shortDescription: initialData.shortDescription ?? '',
    description: initialData.description ?? '',
    configuration: initialData.configuration ?? '',
    area: initialData.area ?? '',
    possession: initialData.possession ?? '',
    address: initialData.address ?? '',
    overview: Array.isArray(initialData.overview) ? initialData.overview : [''],
    facts: normalizeFactList(initialData.facts),
    connectivity: normalizeStringList(initialData.connectivity),
    floorPlans: normalizeFloorPlanList(initialData.floorPlans),
    verificationNote: initialData.verificationNote ?? '',
    highlights: normalizeHighlightList(initialData.highlights),
    amenities: normalizeStringList(initialData.amenities),
    features: normalizeStringList(initialData.features),
    isFeatured: Boolean(initialData.isFeatured),
    isPublished: initialData.isPublished !== false,
    seoTitle: initialData.seoTitle ?? '',
    seoDescription: initialData.seoDescription ?? '',
    seoKeywords: initialData.seoKeywords ?? '',
    ...initialData,
    images: normalizeImageList(initialData.images ?? initialData.gallery ?? []),
    gallery: normalizeImageList(initialData.gallery ?? initialData.images ?? [])
  };
}

export { slugify };