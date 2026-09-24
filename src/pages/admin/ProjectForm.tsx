import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, ImagePlusIcon, PlusIcon, SaveIcon, Trash2Icon, XIcon } from 'lucide-react';
import { useAdminAuth } from '../../admin/AdminAuthContext';
import { uploadProjectImage } from '../../services/api';
import { buildProjectInitialData } from './projectFormUtils';

export type HighlightItem = { title: string; text: string };
export type FactItem = { label: string; value: string; confidence: 'verified' | 'reference' | 'onRequest' };
export type FloorPlanItem = { label: string; note: string };
type UploadStatus = 'success' | 'uploading' | 'failed';
type ProjectImageRole = 'card' | 'hero' | 'gallery' | 'floor-plan';
export type ImageItem = { src: string; alt?: string; role?: ProjectImageRole; isFeatured?: boolean; order?: number; clientId?: string; file?: File; status?: UploadStatus; uploading?: boolean; uploadProgress?: number; uploadError?: string };

export type ProjectFormValue = Record<string, unknown> & {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  slug?: string;
  developer?: string;
  location?: string;
  city?: string;
  projectType?: string;
  tagline?: string;
  status?: string;
  price?: string;
  priceLabel?: string;
  minimumPrice?: string;
  maximumPrice?: string;
  shortDescription?: string;
  description?: string;
  configuration?: string;
  area?: string;
  possession?: string;
  address?: string;
  overview?: string[];
  facts?: FactItem[];
  connectivity?: string[];
  floorPlans?: FloorPlanItem[];
  verificationNote?: string;
  reraNumber?: string;
  highlights?: HighlightItem[];
  amenities?: string[];
  features?: string[];
  images?: ImageItem[];
  gallery?: ImageItem[];
  isFeatured?: boolean;
  isPublished?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
};

interface ProjectFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<ProjectFormValue>;
  onCancel: () => void;
  onSubmit: (payload: ProjectFormValue) => void | Promise<void>;
  submitting?: boolean;
}

const fieldClass = 'h-11 w-full border border-[#b48c32]/30 bg-[#fbfaf6] px-3 text-sm text-[#151515] outline-none transition-colors focus:border-[#c9a227]';
const areaClass = 'min-h-[120px] w-full resize-y border border-[#b48c32]/30 bg-[#fbfaf6] px-3 py-3 text-sm text-[#151515] outline-none transition-colors focus:border-[#c9a227]';
const labelClass = 'mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#7a7368]';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function normalizeImageRole(value: unknown): ProjectImageRole {
  const role = String(value ?? '').trim().toLowerCase();
  if (role === 'card' || role === 'hero' || role === 'gallery' || role === 'floor-plan' || role === 'floorplan') {
    return role === 'floorplan' ? 'floor-plan' : (role as ProjectImageRole);
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

function normalizeHighlightList(value: unknown): HighlightItem[] {
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
    .filter(Boolean) as HighlightItem[];

  return next.length ? next : [{ title: '', text: '' }];
}

function normalizeStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [''];

  const next = value
    .map((item) => (typeof item === 'string' ? item.trim() : String(item ?? '').trim()))
    .filter(Boolean);

  return next.length ? next : [''];
}

function normalizeFactList(value: unknown): FactItem[] {
  if (!Array.isArray(value)) return [{ label: '', value: '', confidence: 'reference' }];
  const next = value.map((item) => {
    const record = item && typeof item === 'object' ? item as Record<string, unknown> : {};
    const confidence = record.confidence === 'verified' || record.confidence === 'onRequest' ? record.confidence : 'reference';
    return { label: String(record.label ?? '').trim(), value: String(record.value ?? '').trim(), confidence } as FactItem;
  }).filter((item) => item.label || item.value);
  return next.length ? next : [{ label: '', value: '', confidence: 'reference' }];
}

function normalizeFloorPlanList(value: unknown): FloorPlanItem[] {
  if (!Array.isArray(value)) return [{ label: '', note: '' }];
  const next = value.map((item) => {
    const record = item && typeof item === 'object' ? item as Record<string, unknown> : {};
    return { label: String(record.label ?? '').trim(), note: String(record.note ?? '').trim() };
  }).filter((item) => item.label || item.note);
  return next.length ? next : [{ label: '', note: '' }];
}

export function normalizeProjectRecord(record: Partial<ProjectFormValue> = {}): ProjectFormValue {
  const next = buildProjectInitialData(record);

  if (!next.slug && next.name) {
    next.slug = slugify(next.name);
  }

  if (!next.name && next.title) {
    next.name = String(next.title);
  }

  if (!next.slug && next.name) {
    next.slug = slugify(next.name);
  }

  return next;
}

export function sanitizeProjectPayload(data: ProjectFormValue): ProjectFormValue {
  const fallbackImages = Array.isArray(data.images) && data.images.length ? data.images : (Array.isArray(data.gallery) ? data.gallery : []);
  const images = normalizeImageList(fallbackImages).filter((image) => image.status !== 'uploading' && image.status !== 'failed' && image.src && !image.src.startsWith('blob:'));

  const uniqueRoleImages = images.map((image, index) => ({ ...image, order: Number(image.order ?? index + 1), role: normalizeImageRole(image.role ?? 'gallery') }));
  const uniqueRoleSet = new Map<string, number>();
  const normalizedRoleImages = uniqueRoleImages.map((image) => {
    const currentCount = uniqueRoleSet.get(image.role ?? 'gallery') || 0;
    const roleKey = image.role ?? 'gallery';
    uniqueRoleSet.set(roleKey, currentCount + 1);
    if (roleKey === 'card' && currentCount > 0) return { ...image, role: 'gallery' };
    if (roleKey === 'hero' && currentCount > 0) return { ...image, role: 'gallery' };
    return image;
  });

  const cardImage = normalizedRoleImages.find((image) => image.role === 'card');
  const heroImage = normalizedRoleImages.find((image) => image.role === 'hero');
  const galleryImages = normalizedRoleImages.filter((image) => image.role === 'gallery').sort((left, right) => (left.order || 0) - (right.order || 0));
  const orderedImages = normalizedRoleImages
    .sort((left, right) => (left.order || 0) - (right.order || 0))
    .map((image, index) => ({
      url: image.src,
      alt: image.alt ?? '',
      role: image.role ?? 'gallery',
      order: index + 1
    }));

  const orderedGallery = galleryImages.map((image, index) => ({
    url: image.src,
    alt: image.alt ?? '',
    role: 'gallery',
    order: index + 1
  }));

  const highlights = Array.isArray(data.highlights)
    ? data.highlights
        .map((item) => {
          if (!item || typeof item !== 'object') return null;
          const record = item as Record<string, unknown>;
          const title = String(record.title ?? '').trim();
          const text = String(record.text ?? '').trim();
          if (!title && !text) return null;
          return { title, text };
        })
        .filter(Boolean) as HighlightItem[]
    : [{ title: '', text: '' }];

  const amenities = Array.isArray(data.amenities)
    ? data.amenities.map((item) => String(item ?? '').trim()).filter(Boolean)
    : [];

  const features = Array.isArray(data.features)
    ? data.features.map((item) => String(item ?? '').trim()).filter(Boolean)
    : [];

  const overview = Array.isArray(data.overview)
    ? data.overview.map((item) => String(item ?? '').trim()).filter(Boolean)
    : [];

  const facts = Array.isArray(data.facts)
    ? data.facts.map((item) => ({
        label: String(item.label ?? '').trim(),
        value: String(item.value ?? '').trim(),
        confidence: item.confidence || 'reference'
      })).filter((item) => item.label || item.value)
    : [];

  const connectivity = Array.isArray(data.connectivity)
    ? data.connectivity.map((item) => String(item ?? '').trim()).filter(Boolean)
    : [];

  const floorPlans = Array.isArray(data.floorPlans)
    ? data.floorPlans.map((item) => ({ label: String(item.label ?? '').trim(), note: String(item.note ?? '').trim() })).filter((item) => item.label || item.note)
    : [];

  const payload: ProjectFormValue = {
    ...data,
    name: String(data.name ?? data.title ?? '').trim(),
    title: String(data.title ?? data.name ?? '').trim(),
    slug: (String(data.slug ?? '').trim() || slugify(String(data.name ?? data.title ?? ''))).trim(),
    developer: String(data.developer ?? '').trim(),
    location: String(data.location ?? '').trim(),
    city: String(data.city ?? '').trim(),
    projectType: String(data.projectType ?? '').trim(),
    tagline: String(data.tagline ?? '').trim(),
    status: String(data.status ?? '').trim(),
    price: String(data.price ?? '').trim(),
    priceLabel: String(data.priceLabel ?? '').trim() || 'BASE PRICE',
    reraNumber: String(data.reraNumber ?? '').trim(),
    minimumPrice: String(data.minimumPrice ?? '').trim(),
    maximumPrice: String(data.maximumPrice ?? '').trim(),
    shortDescription: String(data.shortDescription ?? '').trim(),
    description: String(data.description ?? '').trim(),
    configuration: String(data.configuration ?? '').trim(),
    area: String(data.area ?? '').trim(),
    possession: String(data.possession ?? '').trim(),
    address: String(data.address ?? '').trim(),
    overview,
    facts,
    connectivity,
    floorPlans,
    verificationNote: String(data.verificationNote ?? '').trim(),
    highlights,
    amenities,
    features,
    images: orderedImages.map((image) => ({ url: image.url, alt: image.alt, role: image.role, order: image.order })) as unknown as ImageItem[],
    gallery: orderedGallery.map((image) => ({ url: image.url, alt: image.alt, role: 'gallery', order: image.order })) as unknown as ImageItem[],
    card: cardImage?.src || '',
    hero: heroImage?.src || '',
    isFeatured: Boolean(data.isFeatured),
    isPublished: data.isPublished !== false,
    seoTitle: String(data.seoTitle ?? '').trim(),
    seoDescription: String(data.seoDescription ?? '').trim(),
    seoKeywords: String(data.seoKeywords ?? '').trim(),
  };

  return payload;
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-none border border-[#d8d0c2] bg-[#f7f5f0] p-4 sm:p-6">
      <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#a98232]">{title}</h3>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

function ToggleField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="flex items-center justify-between rounded-none border border-[#d8d0c2] bg-[#f7f5f0] px-3 py-3">
      <span className="text-sm text-[#151515]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 items-center rounded-full border transition-colors ${checked ? 'border-[#c9a227] bg-[#c9a227]' : 'border-[#c8c0b1] bg-[#e7e1d7]'}`}>
        <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}

function HighlightManager({ value, onChange }: { value: HighlightItem[]; onChange: (next: HighlightItem[]) => void }) {
  const updateItem = (index: number, field: keyof HighlightItem, input: string) => {
    const next = [...value];
    next[index] = { ...next[index], [field]: input };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {value.map((highlight, index) => (
        <div key={`highlight-${index}`} className="rounded-none border border-[#d8d0c2] bg-[#f8f6f2] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-[#151515]">Highlight {index + 1}</p>
            {value.length > 1 ? (
              <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="inline-flex items-center gap-2 border border-red-900/20 px-2.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-red-700">
                <Trash2Icon className="h-3.5 w-3.5" /> Remove
              </button>
            ) : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Title</label>
              <input value={highlight.title} onChange={(event) => updateItem(index, 'title', event.target.value)} className={fieldClass} placeholder="Wellness Led" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Text</label>
              <textarea value={highlight.text} onChange={(event) => updateItem(index, 'text', event.target.value)} className={areaClass} placeholder="The project story..." />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, { title: '', text: '' }])} className="inline-flex items-center gap-2 border border-[#b48c32]/30 bg-[#f7f5f0] px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#a98232]">
        <PlusIcon className="h-3.5 w-3.5" /> Add Highlight
      </button>
    </div>
  );
}

function ListManager({ label, value, onChange, placeholder }: { label: string; value: string[]; onChange: (next: string[]) => void; placeholder: string }) {
  return (
    <div className="space-y-3">
      {value.map((item, index) => (
        <div key={`${label}-${index}`} className="flex gap-2">
          <input value={item} onChange={(event) => {
            const next = [...value];
            next[index] = event.target.value;
            onChange(next);
          }} className={fieldClass} placeholder={placeholder} />
          <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="inline-flex h-11 w-11 items-center justify-center border border-red-900/20 bg-[#f7f5f0] text-red-700">
            <Trash2Icon className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, ''])} className="inline-flex items-center gap-2 border border-[#b48c32]/30 bg-[#f7f5f0] px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#a98232]">
        <PlusIcon className="h-3.5 w-3.5" /> Add {label}
      </button>
    </div>
  );
}

function ParagraphManager({ value, onChange }: { value: string[]; onChange: (next: string[]) => void }) {
  return (
    <div className="space-y-4">
      {value.map((paragraph, index) => (
        <div key={`overview-${index}`} className="border border-[#d8d0c2] bg-[#f8f6f2] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-[#151515]">Paragraph {index + 1}</p>
            {value.length > 1 ? (
              <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="inline-flex items-center gap-2 border border-red-900/20 px-2.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-red-700">
                <Trash2Icon className="h-3.5 w-3.5" /> Remove
              </button>
            ) : null}
          </div>
          <textarea
            value={paragraph}
            onChange={(event) => {
              const next = [...value];
              next[index] = event.target.value;
              onChange(next);
            }}
            className={areaClass}
            placeholder="Write the project overview paragraph shown on the detail page."
          />
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, ''])} className="inline-flex items-center gap-2 border border-[#b48c32]/30 bg-[#f7f5f0] px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#a98232]">
        <PlusIcon className="h-3.5 w-3.5" /> Add Paragraph
      </button>
    </div>
  );
}

function FactManager({ value, onChange }: { value: FactItem[]; onChange: (next: FactItem[]) => void }) {
  const updateItem = (index: number, field: keyof FactItem, input: string) => {
    const next = [...value];
    next[index] = { ...next[index], [field]: input } as FactItem;
    onChange(next);
  };

  return <div className="space-y-3">
    {value.map((fact, index) => <div key={`fact-${index}`} className="grid gap-3 border border-[#d8d0c2] bg-[#f8f6f2] p-3 md:grid-cols-[1fr_1fr_11rem_auto]">
      <input value={fact.label} onChange={(event) => updateItem(index, 'label', event.target.value)} className={fieldClass} placeholder="Developer" />
      <input value={fact.value} onChange={(event) => updateItem(index, 'value', event.target.value)} className={fieldClass} placeholder="Verified detail" />
      <select value={fact.confidence} onChange={(event) => updateItem(index, 'confidence', event.target.value)} className={fieldClass}>
        <option value="verified">Verified</option><option value="reference">Reference</option><option value="onRequest">On request</option>
      </select>
      <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="inline-flex h-11 w-11 items-center justify-center border border-red-900/20 bg-[#f7f5f0] text-red-700"><Trash2Icon className="h-4 w-4" /></button>
    </div>)}
    <button type="button" onClick={() => onChange([...value, { label: '', value: '', confidence: 'reference' }])} className="inline-flex items-center gap-2 border border-[#b48c32]/30 bg-[#f7f5f0] px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#a98232]"><PlusIcon className="h-3.5 w-3.5" /> Add Fact</button>
  </div>;
}

function FloorPlanManager({ value, onChange }: { value: FloorPlanItem[]; onChange: (next: FloorPlanItem[]) => void }) {
  return <div className="space-y-3">
    {value.map((plan, index) => <div key={`floor-plan-${index}`} className="grid gap-3 border border-[#d8d0c2] bg-[#f8f6f2] p-3 md:grid-cols-[1fr_1fr_auto]">
      <input value={plan.label} onChange={(event) => { const next = [...value]; next[index] = { ...plan, label: event.target.value }; onChange(next); }} className={fieldClass} placeholder="3 BHK" />
      <input value={plan.note} onChange={(event) => { const next = [...value]; next[index] = { ...plan, note: event.target.value }; onChange(next); }} className={fieldClass} placeholder="Floor plan note" />
      <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="inline-flex h-11 w-11 items-center justify-center border border-red-900/20 bg-[#f7f5f0] text-red-700"><Trash2Icon className="h-4 w-4" /></button>
    </div>)}
    <button type="button" onClick={() => onChange([...value, { label: '', note: '' }])} className="inline-flex items-center gap-2 border border-[#b48c32]/30 bg-[#f7f5f0] px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#a98232]"><PlusIcon className="h-3.5 w-3.5" /> Add Floor Plan</button>
  </div>;
}

function ImageManager({ label, value, onChange }: { label: string; value: ImageItem[]; onChange: (next: ImageItem[]) => void }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useAdminAuth();

  const updateItem = (index: number, field: keyof ImageItem, input: string | boolean) => {
    const next = [...value];
    next[index] = { ...next[index], [field]: input };
    if (field === 'role') {
      const role = String(input).trim().toLowerCase();
      next[index] = { ...next[index], role: (role === 'card' || role === 'hero' || role === 'gallery' || role === 'floor-plan' || role === 'floorplan') ? (role === 'floorplan' ? 'floor-plan' : role) as ProjectImageRole : 'gallery' };
    }
    onChange(next);
  };

  const setFeatured = (index: number) => onChange(value.map((image, itemIndex) => ({ ...image, role: itemIndex === index ? 'card' : image.role ?? 'gallery' })));

  const moveItem = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= value.length) return;
    const next = [...value];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    onChange(next.map((image, itemIndex) => ({ ...image, order: itemIndex + 1 })));
  };

  const uploadFiles = async (files: File[]) => {
    if (!token) return;
    let next = [...value];
    for (const file of files) {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!['jpg', 'jpeg', 'png', 'webp'].includes(extension || '') || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        next = [...next, { src: '', alt: '', isFeatured: next.length === 0, order: next.length + 1, clientId: `${Date.now()}-${file.name}`, status: 'failed', uploadError: 'Please upload JPG, PNG or WEBP image.' }];
        onChange(next);
        continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        next = [...next, { src: '', alt: '', isFeatured: false, order: next.length + 1, clientId: `${Date.now()}-${file.name}`, status: 'failed', uploadError: 'Image size must be less than 10 MB.' }];
        onChange(next);
        continue;
      }

      const clientId = `${Date.now()}-${Math.random()}`;
      const preview = URL.createObjectURL(file);
      const previewItem: ImageItem = { src: preview, alt: file.name.replace(/\.[^/.]+$/, ''), isFeatured: next.length === 1, order: next.length + 1, clientId, file, status: 'uploading', uploading: true, uploadProgress: 0 };
      next = [...next, previewItem];
      onChange(next);

      try {
        const response = await uploadProjectImage(file, token, (progress) => {
            next = next.map((image) => image.clientId === clientId ? { ...image, uploadProgress: progress, status: 'uploading' } : image);
          onChange(next);
        });
        next = next.map((image) => image.clientId === clientId ? { ...image, src: response.data.url, status: 'success', uploading: false, uploadProgress: 100, uploadError: undefined, file: undefined } : image);
        onChange(next);
      } catch (error) {
        next = next.map((image) => image.clientId === clientId ? { ...image, status: 'failed', uploading: false, uploadError: error instanceof Error ? error.message : 'Upload failed. Please try again.' } : image);
        onChange(next);
      } finally {
        URL.revokeObjectURL(preview);
      }
    }
  };

  const retryUpload = async (index: number) => {
    if (!token) return;
    const image = value[index];
    if (!image?.file || image.status === 'uploading') return;
    const clientId = image.clientId || `${Date.now()}-${Math.random()}`;
    const preview = URL.createObjectURL(image.file);
    let next = [...value];
    next[index] = { ...image, src: preview, clientId, status: 'uploading', uploading: true, uploadProgress: 0, uploadError: undefined };
    onChange(next);
    try {
      const response = await uploadProjectImage(image.file, token, (progress) => {
        next = next.map((item) => item.clientId === clientId ? { ...item, uploadProgress: progress, status: 'uploading' } : item);
        onChange(next);
      });
      next = next.map((item) => item.clientId === clientId ? { ...item, src: response.data.url, status: 'success', uploading: false, uploadProgress: 100, uploadError: undefined, file: undefined } : item);
      onChange(next);
      URL.revokeObjectURL(preview);
    } catch (error) {
      next = next.map((item) => item.clientId === clientId ? { ...item, status: 'failed', uploading: false, uploadError: error instanceof Error ? error.message : 'Upload failed. Please try again.' } : item);
      onChange(next);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) void uploadFiles(Array.from(event.target.files));
    event.target.value = '';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    void uploadFiles(Array.from(event.dataTransfer.files));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {value.length > 0 ? value.map((image, index) => (
          <div key={`${label}-image-${index}`} className="border border-[#d8d0c2] bg-[#f8f6f2] p-3">
            <div className="flex h-28 items-center justify-center overflow-hidden border border-[#d8d0c2] bg-[#f0ede9]">
              {image.src ? <img src={image.src} alt={image.alt || `${label} ${index + 1}`} className="h-full w-full object-cover" /> : <span className="text-[0.7rem] uppercase tracking-[0.18em] text-[#7a7368]">Preview</span>}
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <button type="button" onClick={() => setFeatured(index)} disabled={image.status !== 'success'} className={`border px-2 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] disabled:opacity-50 ${image.role === 'card' ? 'border-[#c9a227] bg-[#c9a227]/10 text-[#111111]' : 'border-[#b48c32]/30 bg-[#f7f5f0] text-[#7a7368]'}`}>
                {image.role === 'card' ? '★ Card Image' : 'Set Card'}
              </button>
              <div className="flex gap-1"><button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0 || image.status === 'uploading'} aria-label="Move image up" className="border border-[#b48c32]/30 p-1.5 disabled:opacity-40"><ArrowUpIcon className="h-3.5 w-3.5" /></button><button type="button" onClick={() => moveItem(index, 1)} disabled={index === value.length - 1 || image.status === 'uploading'} aria-label="Move image down" className="border border-[#b48c32]/30 p-1.5 disabled:opacity-40"><ArrowDownIcon className="h-3.5 w-3.5" /></button><button type="button" onClick={() => { if (window.confirm('Remove this image?')) onChange(value.filter((_, itemIndex) => itemIndex !== index).map((item, itemIndex) => ({ ...item, order: itemIndex + 1 }))); }} className="border border-red-900/20 p-1.5 text-red-700" aria-label={`Remove ${label} ${index + 1}`}><Trash2Icon className="h-3.5 w-3.5" /></button></div>
            </div>
            <label className="mt-3 block">
              <span className={labelClass}>Role</span>
              <select value={image.role ?? 'gallery'} onChange={(event) => updateItem(index, 'role', event.target.value)} className={fieldClass}>
                <option value="card">Card Image</option>
                <option value="hero">Hero Image</option>
                <option value="gallery">Gallery Image</option>
                <option value="floor-plan">Floor Plan</option>
              </select>
            </label>
            <input value={image.alt || ''} onChange={(event) => updateItem(index, 'alt', event.target.value)} className={`${fieldClass} mt-3`} placeholder="Alt text" />
            {image.status === 'uploading' ? <p className="mt-2 text-xs text-[#a98232]">Uploading image... {image.uploadProgress ?? 0}%</p> : null}
            {image.status === 'success' ? <p className="mt-2 text-xs text-emerald-700">✓ Uploaded</p> : null}
            {image.status === 'failed' ? <div className="mt-2 flex items-center justify-between gap-2 text-xs text-red-700"><span>{image.uploadError || 'Upload failed.'}</span><button type="button" onClick={() => void retryUpload(index)} disabled={!image.file} className="border border-red-900/20 px-2 py-1 font-semibold uppercase tracking-[0.12em] disabled:opacity-40">Retry</button></div> : null}
          </div>
        )) : (
          <div className="col-span-full border border-dashed border-[#d8d0c2] bg-[#f8f6f2] p-4 text-sm text-[#6f695f]">No {label.toLowerCase()} added yet.</div>
        )}
      </div>

      <div onDragOver={(event) => { event.preventDefault(); setDragActive(true); }} onDragLeave={() => setDragActive(false)} onDrop={handleDrop} className={`border border-dashed p-5 text-center ${dragActive ? 'border-[#c9a227] bg-[#c9a227]/10' : 'border-[#b48c32]/30 bg-[#f7f5f0]'}`}>
        <ImagePlusIcon className="mx-auto h-6 w-6 text-[#a98232]" />
        <p className="mt-2 text-sm text-[#6f695f]">Drag & drop images here or choose from your computer.</p>
        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleFileChange} className="hidden" />
        <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-3 inline-flex items-center gap-2 border border-[#b48c32]/30 bg-[#fbfaf6] px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#a98232]"><PlusIcon className="h-3.5 w-3.5" /> Add {label}</button>
        <p className="mt-2 text-xs text-[#7a7368]">JPG, PNG or WEBP, maximum 10 MB per image.</p>
      </div>
    </div>
  );
}

export function ProjectForm({ mode, initialData, onCancel, onSubmit, submitting }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormValue>(() => normalizeProjectRecord(initialData));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const previousAutoSlug = useRef('');

  useEffect(() => {
    setFormData(normalizeProjectRecord(initialData));
  }, [initialData]);

  const updateField = (field: keyof ProjectFormValue, value: string | boolean | string[] | HighlightItem[] | FactItem[] | FloorPlanItem[] | ImageItem[]) => {
    setFormData((current) => {
      const next = { ...current, [field]: value } as ProjectFormValue;

      if (field === 'name' && mode === 'create') {
        const generatedSlug = slugify(String(value));
        const shouldAutoUpdate = !current.slug || current.slug === previousAutoSlug.current || current.slug === slugify(String(current.name ?? ''));
        if (shouldAutoUpdate) {
          next.slug = generatedSlug;
          previousAutoSlug.current = generatedSlug;
        }
      }

      return next;
    });
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!String(formData.name ?? '').trim()) nextErrors.name = 'Project name is required.';
    if (!String(formData.location ?? '').trim()) nextErrors.location = 'Location is required.';
    if (!String(formData.description ?? '').trim()) nextErrors.description = 'Description is required.';
    const pendingImages = [...(formData.images ?? []), ...(formData.gallery ?? [])].some((image) => image.status === 'uploading' || image.status === 'failed');
    if (pendingImages) nextErrors.images = 'Wait for image uploads to finish or remove failed images.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    const payload = sanitizeProjectPayload(formData);
    await onSubmit(payload);
  };

  const summary = useMemo(() => ({
    images: Array.isArray(formData.images) ? formData.images.filter((image) => image.src) : [],
    gallery: Array.isArray(formData.gallery) ? formData.gallery.filter((image) => image.src) : []
  }), [formData.images, formData.gallery]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-[#c9a227]/30 bg-[#f2efe8] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#d8d0c2] bg-[#f7f5f0] px-5 py-4 sm:px-7">
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#a98232]">Project CMS</p>
            <h2 className="mt-1 font-display text-2xl text-[#151515]">{mode === 'create' ? 'Add Project' : 'Edit Project'}</h2>
          </div>
          <button type="button" onClick={onCancel} aria-label="Close project form" className="inline-flex h-10 w-10 items-center justify-center border border-[#b48c32]/30 bg-[#fbfaf6] text-[#151515]">
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-7">
          <FormSection title="Basic Information">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={labelClass}>Project Name *</label>
                <input value={String(formData.name ?? '')} onChange={(event) => updateField('name', event.target.value)} className={fieldClass} placeholder="Ganga Code Name Nine" />
                {errors.name ? <p className="mt-1 text-xs text-red-700">{errors.name}</p> : null}
              </div>

              <div>
                <label className={labelClass}>Slug</label>
                <input value={String(formData.slug ?? '')} onChange={(event) => updateField('slug', event.target.value)} className={fieldClass} placeholder="ganga-code-name-nine" />
              </div>

              <div>
                <label className={labelClass}>Developer</label>
                <input value={String(formData.developer ?? '')} onChange={(event) => updateField('developer', event.target.value)} className={fieldClass} placeholder="Ganga Realty" />
              </div>

              <div>
                <label className={labelClass}>RERA Number</label>
                <input value={String(formData.reraNumber ?? '')} onChange={(event) => updateField('reraNumber', event.target.value)} className={fieldClass} placeholder="HRERA-XXXX" />
              </div>

              <div>
                <label className={labelClass}>Location</label>
                <input value={String(formData.location ?? '')} onChange={(event) => updateField('location', event.target.value)} className={fieldClass} placeholder="Sector 90, Gurugram" />
                {errors.location ? <p className="mt-1 text-xs text-red-700">{errors.location}</p> : null}
              </div>

              <div>
                <label className={labelClass}>City</label>
                <input value={String(formData.city ?? '')} onChange={(event) => updateField('city', event.target.value)} className={fieldClass} placeholder="Gurugram" />
              </div>

              <div>
                <label className={labelClass}>Project Type</label>
                <select value={String(formData.projectType ?? 'Residential')} onChange={(event) => updateField('projectType', event.target.value)} className={fieldClass}>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plot">Plot</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Status</label>
                <select value={String(formData.status ?? 'Upcoming')} onChange={(event) => updateField('status', event.target.value)} className={fieldClass}>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Tagline / Subtitle</label>
                <input value={String(formData.tagline ?? '')} onChange={(event) => updateField('tagline', event.target.value)} className={fieldClass} placeholder="Wellness & Assisted Comfort" />
              </div>
            </div>
          </FormSection>

          <FormSection title="Pricing">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Price</label>
                <input value={String(formData.price ?? '')} onChange={(event) => updateField('price', event.target.value)} className={fieldClass} placeholder="₹2.8 Cr onwards" />
              </div>
              <div>
                <label className={labelClass}>Price Label</label>
                <input value={String(formData.priceLabel ?? '')} onChange={(event) => updateField('priceLabel', event.target.value)} className={fieldClass} placeholder="On Request" />
              </div>
              <div>
                <label className={labelClass}>Minimum Price</label>
                <input value={String(formData.minimumPrice ?? '')} onChange={(event) => updateField('minimumPrice', event.target.value)} className={fieldClass} placeholder="₹1.2 Cr" />
              </div>
              <div>
                <label className={labelClass}>Maximum Price</label>
                <input value={String(formData.maximumPrice ?? '')} onChange={(event) => updateField('maximumPrice', event.target.value)} className={fieldClass} placeholder="₹3.5 Cr" />
              </div>
            </div>
          </FormSection>

          <FormSection title="Project Details">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={labelClass}>Short Description</label>
                <textarea value={String(formData.shortDescription ?? '')} onChange={(event) => updateField('shortDescription', event.target.value)} className={areaClass} placeholder="Short summary shown in project cards and listings." />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Description *</label>
                <textarea value={String(formData.description ?? '')} onChange={(event) => updateField('description', event.target.value)} className={areaClass} placeholder="Detailed project description..." />
                {errors.description ? <p className="mt-1 text-xs text-red-700">{errors.description}</p> : null}
              </div>

              <div>
                <label className={labelClass}>Configuration</label>
                <input value={String(formData.configuration ?? '')} onChange={(event) => updateField('configuration', event.target.value)} className={fieldClass} placeholder="3 BHK / 4 BHK" />
              </div>

              <div>
                <label className={labelClass}>Area</label>
                <input value={String(formData.area ?? '')} onChange={(event) => updateField('area', event.target.value)} className={fieldClass} placeholder="1500 - 2200 sq. ft." />
              </div>

              <div>
                <label className={labelClass}>Possession</label>
                <input value={String(formData.possession ?? '')} onChange={(event) => updateField('possession', event.target.value)} className={fieldClass} placeholder="Ready to move / 2028" />
              </div>

              <div>
                <label className={labelClass}>Address</label>
                <input value={String(formData.address ?? '')} onChange={(event) => updateField('address', event.target.value)} className={fieldClass} placeholder="Sector 90, Gurugram, Haryana" />
              </div>
            </div>
          </FormSection>

          <FormSection title="Highlights">
            <HighlightManager value={Array.isArray(formData.highlights) ? formData.highlights : [{ title: '', text: '' }]} onChange={(next) => updateField('highlights', next)} />
          </FormSection>

          <FormSection title="Overview">
            <ParagraphManager value={Array.isArray(formData.overview) ? formData.overview : ['']} onChange={(next) => updateField('overview', next)} />
          </FormSection>

          <FormSection title="Project Facts">
            <FactManager value={Array.isArray(formData.facts) ? formData.facts : [{ label: '', value: '', confidence: 'reference' }]} onChange={(next) => updateField('facts', next)} />
          </FormSection>

          <FormSection title="Amenities">
            <ListManager label="Amenity" value={Array.isArray(formData.amenities) ? formData.amenities : ['']} onChange={(next) => updateField('amenities', next)} placeholder="Swimming Pool" />
          </FormSection>

          <FormSection title="Features">
            <ListManager label="Feature" value={Array.isArray(formData.features) ? formData.features : ['']} onChange={(next) => updateField('features', next)} placeholder="Private garden" />
          </FormSection>

          <FormSection title="Connectivity">
            <ListManager label="Connectivity point" value={Array.isArray(formData.connectivity) ? formData.connectivity : ['']} onChange={(next) => updateField('connectivity', next)} placeholder="Dwarka Expressway" />
          </FormSection>

          <FormSection title="Floor Plans">
            <FloorPlanManager value={Array.isArray(formData.floorPlans) ? formData.floorPlans : [{ label: '', note: '' }]} onChange={(next) => updateField('floorPlans', next)} />
          </FormSection>

          <FormSection title="Verification Note">
            <textarea value={String(formData.verificationNote ?? '')} onChange={(event) => updateField('verificationNote', event.target.value)} className={areaClass} placeholder="Add any verification or disclaimer note for this project." />
          </FormSection>

          <FormSection title="Images / Gallery">
            <div className="space-y-4">
              <p className="text-sm text-[#6f695f]">Upload project images directly. Existing saved images remain available and can be reordered or removed from this project.</p>
              <ImageManager label="Image" value={Array.isArray(formData.images) ? formData.images : []} onChange={(next) => updateField('images', next)} />
              <ImageManager label="Gallery" value={Array.isArray(formData.gallery) ? formData.gallery : []} onChange={(next) => updateField('gallery', next)} />
              {errors.images ? <p className="text-xs text-red-700">{errors.images}</p> : null}
              <div className="grid gap-3 sm:grid-cols-2 text-sm text-[#6f695f]">
                <div><strong>Images:</strong> {summary.images.length}</div>
                <div><strong>Gallery:</strong> {summary.gallery.length}</div>
              </div>
            </div>
          </FormSection>

          <FormSection title="Project Settings">
            <div className="grid gap-4 md:grid-cols-2">
              <ToggleField label="Featured Project" checked={Boolean(formData.isFeatured)} onChange={(value) => updateField('isFeatured', value)} />
              <ToggleField label="Published" checked={formData.isPublished !== false} onChange={(value) => updateField('isPublished', value)} />
            </div>
          </FormSection>

          <FormSection title="SEO">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={labelClass}>SEO Title</label>
                <input value={String(formData.seoTitle ?? '')} onChange={(event) => updateField('seoTitle', event.target.value)} className={fieldClass} placeholder="Premium residences in Gurugram" />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>SEO Description</label>
                <textarea value={String(formData.seoDescription ?? '')} onChange={(event) => updateField('seoDescription', event.target.value)} className={areaClass} placeholder="A premium residential project in Sector 90..." />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>SEO Keywords</label>
                <input value={String(formData.seoKeywords ?? '')} onChange={(event) => updateField('seoKeywords', event.target.value)} className={fieldClass} placeholder="gurugram apartments, premium residences" />
              </div>
            </div>
          </FormSection>
        </div>

        <div className="flex items-center justify-between border-t border-[#d8d0c2] bg-[#f7f5f0] px-5 py-4 sm:px-7">
          <button type="button" onClick={onCancel} className="inline-flex items-center justify-center border border-[#b48c32]/30 bg-[#fbfaf6] px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#151515]">Cancel</button>
          <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 bg-[#c9a227] px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#111111] disabled:cursor-not-allowed disabled:opacity-60">
            <SaveIcon className="h-4 w-4" />
            {submitting ? 'Saving...' : mode === 'create' ? 'Save Project' : 'Update Project'}
          </button>
        </div>
      </form>
    </div>
  );
}

export function ConfirmDialog({ open, title, message, confirmText, onCancel, onConfirm }: { open: boolean; title: string; message: string; confirmText: string; onCancel: () => void; onConfirm: () => void | Promise<void>; }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md border border-[#c9a227]/30 bg-[#f2efe8] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#a98232]">Confirm action</p>
            <h3 className="mt-2 font-display text-2xl text-[#151515]">{title}</h3>
          </div>
          <button type="button" onClick={onCancel} aria-label="Close confirmation dialog" className="inline-flex h-9 w-9 items-center justify-center border border-[#b48c32]/30 bg-[#fbfaf6] text-[#151515]">
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-[#554f48]">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="border border-[#b48c32]/30 bg-[#fbfaf6] px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#151515]">Cancel</button>
          <button type="button" onClick={onConfirm} className="bg-[#c9a227] px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#111111]">{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
