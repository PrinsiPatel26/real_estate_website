import type { GalleryImage, Project, ProjectImageRole, ProjectImage } from '../types/project';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '');

export function resolveImageUrl(value: string | null | undefined): string {
  const nextValue = (value ?? '').trim();
  if (!nextValue) return '';

  if (nextValue.startsWith('data:') || /^https?:\/\//i.test(nextValue)) {
    return nextValue;
  }

  if (!nextValue.startsWith('/uploads/') && !nextValue.startsWith('/api/uploads/')) {
    return nextValue.startsWith('/') ? nextValue : `/${nextValue}`;
  }

  if (nextValue.startsWith('/')) {
    return `${API_BASE_URL}${nextValue}`;
  }

  return `${API_BASE_URL}/${nextValue}`;
}

export function getProjectTitle(project: Partial<Project> | undefined): string {
  return String((project?.title || project?.name || '') || '').trim() || 'Project';
}

export function getProjectTagline(project: Partial<Project> | undefined): string {
  return String((project?.tagline || project?.shortDescription || project?.description || '') || '').trim();
}

export function getProjectShortDescription(project: Partial<Project> | undefined): string {
  return String((project?.shortDescription || project?.tagline || project?.description || '') || '').trim();
}

export function getProjectType(project: Partial<Project> | undefined): string {
  return String((project?.projectType || project?.eyebrow || 'Residential') || '').trim() || 'Residential';
}

export function getProjectPriceLabel(project: Partial<Project> | undefined): string {
  return String((project?.priceLabel || 'BASE PRICE') || '').trim() || 'BASE PRICE';
}

export function getProjectStatus(project: Partial<Project> | undefined): string {
  return String((project?.status || 'Upcoming') || '').trim() || 'Upcoming';
}

function normalizeRole(value: string | undefined): ProjectImageRole | null {
  const role = (value ?? '').trim().toLowerCase();
  if (role === 'card' || role === 'hero' || role === 'gallery' || role === 'floor-plan' || role === 'floorplan') {
    return role === 'floorplan' ? 'floor-plan' : role as ProjectImageRole;
  }
  return null;
}

function toProjectImage(raw: any, index: number): ProjectImage | null {
  if (!raw || typeof raw !== 'object') {
    const url = typeof raw === 'string' ? raw.trim() : '';
    if (!url) return null;
    return { url: resolveImageUrl(url), alt: 'Project image', role: 'gallery', order: index + 1 };
  }

  const record = raw as Record<string, unknown>;
  const urlValue = String(record.url ?? record.src ?? record.image ?? record.imageUrl ?? record.path ?? '').trim();
  if (!urlValue) return null;

  const role = normalizeRole(String(record.role ?? record.type ?? '')) ?? (record.isFeatured === true ? 'card' : 'gallery');
  const alt = String(record.alt ?? record.name ?? '').trim() || 'Project image';

  return {
    url: resolveImageUrl(urlValue),
    alt,
    role,
    order: Number(record.order ?? index + 1)
  };
}

export function normalizeProjectImages(rawImages: unknown): ProjectImage[] {
  if (!Array.isArray(rawImages)) return [];

  return rawImages
    .map((image, index) => toProjectImage(image, index))
    .filter((image): image is ProjectImage => Boolean(image))
    .sort((left, right) => (left.order || 0) - (right.order || 0));
}

export function getProjectImage(project: Partial<Project> | undefined, role: ProjectImageRole): string {
  const rawImages = Array.isArray(project?.images) ? project.images : [];
  const images = normalizeProjectImages(rawImages);
  const match = images.find((image) => image.role === role);
  if (match) return match.url;

  if (role === 'hero') {
    return getProjectImage(project, 'card') || getProjectImage(project, 'gallery') || project?.card || '';
  }

  if (role === 'card') {
    const fallbackImage = images.find((image) => image.role === 'gallery') || images[0];
    return fallbackImage?.url || project?.card || '';
  }

  if (role === 'gallery') {
    return images.find((image) => image.role === 'gallery')?.url || images[0]?.url || project?.card || '';
  }

  return images.find((image) => image.role === 'floor-plan')?.url || project?.card || '';
}

export function getProjectGallery(project: Partial<Project> | undefined): GalleryImage[] {
  const rawImages = Array.isArray(project?.images) ? project.images : [];
  const images = normalizeProjectImages(rawImages)
    .filter((image) => image.role === 'gallery')
    .sort((left, right) => (left.order || 0) - (right.order || 0));

  if (images.length) {
    return images.map((image) => ({ src: image.url, alt: image.alt }));
  }

  const legacyGallery = Array.isArray((project as any)?.gallery)
    ? (project as any).gallery
    : [];
  return normalizeProjectImages(legacyGallery)
    .filter((image) => image.role === 'gallery')
    .map((image) => ({ src: image.url, alt: image.alt }));
}

export function getProjectCard(project: Partial<Project> | undefined): string {
  const candidate = getProjectImage(project, 'card');
  if (candidate) return candidate;

  const legacyCard = typeof project?.card === 'string' ? project.card : '';
  return resolveImageUrl(legacyCard);
}

export function getProjectHero(project: Partial<Project> | undefined): string {
  const candidate = getProjectImage(project, 'hero');
  if (candidate) return candidate;

  return getProjectCard(project);
}

export function getProjectFloorPlans(project: Partial<Project> | undefined): Array<{ label: string; note: string; image?: string }> {
  const rawImages = Array.isArray(project?.images) ? project.images : [];
  const images = normalizeProjectImages(rawImages).filter((image) => image.role === 'floor-plan');
  const defaultPlans = Array.isArray((project as any)?.floorPlans) ? (project as any).floorPlans : [];

  if (!images.length) {
    return defaultPlans;
  }

  return images.map((image, index) => ({
    label: `Floor plan ${index + 1}`,
    note: image.alt || 'Official floor plan image',
    image: image.url
  }));
}
