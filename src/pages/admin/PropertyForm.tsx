import React, { useEffect, useMemo, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, ImageIcon, PlusIcon, SaveIcon, Trash2Icon, XIcon } from 'lucide-react';

export type PropertyImage = { url: string; alt: string; isFeatured?: boolean; order?: number };
export type PropertyHighlight = { title: string; text: string; order?: number };
export type PropertyAmenity = { name: string; icon?: string; order?: number };

export type PropertyFormValue = Record<string, unknown> & {
  _id?: string;
  id?: string;
  title?: string;
  slug?: string;
  propertyType?: string;
  status?: string;
  developer?: string;
  project?: string;
  location?: {
    address?: string;
    locality?: string;
    area?: string;
    city?: string;
    state?: string;
    pincode?: string;
    mapUrl?: string;
    latitude?: string;
    longitude?: string;
  };
  pricing?: {
    price?: string;
    priceLabel?: string;
    startingPrice?: string;
    maxPrice?: string;
  };
  configuration?: {
    bedrooms?: string;
    bathrooms?: string;
    balconies?: string;
    parking?: string;
    carpetArea?: string;
    builtUpArea?: string;
    superBuiltUpArea?: string;
    areaUnit?: string;
    configuration?: string;
    possessionDate?: string;
  };
  images?: PropertyImage[];
  gallery?: PropertyImage[];
  shortDescription?: string;
  description?: string;
  highlights?: PropertyHighlight[];
  amenities?: PropertyAmenity[];
  features?: string[];
  additionalDetails?: {
    reraNumber?: string;
    possession?: string;
    propertyAge?: string;
    facing?: string;
    furnishing?: string;
    floor?: string;
    totalFloors?: string;
    maintenance?: string;
    ownership?: string;
    availability?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  isFeatured?: boolean;
  isPublished?: boolean;
  publishedAt?: string;
};

interface PropertyFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<PropertyFormValue>;
  onCancel: () => void;
  onSubmit: (payload: PropertyFormValue, mode: 'draft' | 'publish') => Promise<void> | void;
  submitting?: boolean;
}

const labelClass = 'mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#7a7368]';
const inputClass = 'h-11 w-full border border-[#b48c32]/30 bg-[#fbfaf6] px-3 text-sm text-[#151515] outline-none transition-colors focus:border-[#c9a227]';
const textAreaClass = 'min-h-[120px] w-full resize-y border border-[#b48c32]/30 bg-[#fbfaf6] px-3 py-3 text-sm text-[#151515] outline-none transition-colors focus:border-[#c9a227]';

const steps = [
  'Basic Details',
  'Location',
  'Pricing & Configuration',
  'Images & Gallery',
  'Description & Highlights',
  'Amenities & Features',
  'Additional Information',
  'SEO & Publish'
];

const defaultImage = (url = '', alt = '', isFeatured = false): PropertyImage => ({ url, alt, isFeatured, order: 0 });
const defaultHighlight = (): PropertyHighlight => ({ title: '', text: '', order: 0 });
const defaultAmenity = (): PropertyAmenity => ({ name: '', icon: '', order: 0 });

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').replace(/-{2,}/g, '-');
}

export function normalizePropertyData(input: Partial<PropertyFormValue> = {}): PropertyFormValue {
  const location = input.location ?? {};
  const pricing = input.pricing ?? {};
  const configuration = input.configuration ?? {};
  const additionalDetails = input.additionalDetails ?? {};
  const seo = input.seo ?? {};

  const next: PropertyFormValue = {
    _id: input._id,
    id: input.id,
    title: input.title ?? '',
    slug: input.slug ?? '',
    propertyType: input.propertyType ?? 'Apartment',
    status: input.status ?? 'Available',
    developer: input.developer ?? '',
    project: input.project ?? '',
    location: {
      address: location.address ?? '',
      locality: location.locality ?? '',
      area: location.area ?? '',
      city: location.city ?? '',
      state: location.state ?? '',
      pincode: location.pincode ?? '',
      mapUrl: location.mapUrl ?? '',
      latitude: location.latitude ?? '',
      longitude: location.longitude ?? ''
    },
    pricing: {
      price: pricing.price ?? '',
      priceLabel: pricing.priceLabel ?? '',
      startingPrice: pricing.startingPrice ?? '',
      maxPrice: pricing.maxPrice ?? ''
    },
    configuration: {
      bedrooms: configuration.bedrooms ?? '',
      bathrooms: configuration.bathrooms ?? '',
      balconies: configuration.balconies ?? '',
      parking: configuration.parking ?? '',
      carpetArea: configuration.carpetArea ?? '',
      builtUpArea: configuration.builtUpArea ?? '',
      superBuiltUpArea: configuration.superBuiltUpArea ?? '',
      areaUnit: configuration.areaUnit ?? 'sq.ft.',
      configuration: configuration.configuration ?? '',
      possessionDate: configuration.possessionDate ?? ''
    },
    images: Array.isArray(input.images) ? input.images.map((image) => ({ ...defaultImage(image.url, image.alt, image.isFeatured), ...image })) : [],
    gallery: Array.isArray(input.gallery) ? input.gallery.map((image) => ({ ...defaultImage(image.url, image.alt, image.isFeatured), ...image })) : [],
    shortDescription: input.shortDescription ?? '',
    description: input.description ?? '',
    highlights: Array.isArray(input.highlights) && input.highlights.length ? input.highlights.map((item) => ({ title: item.title ?? '', text: item.text ?? '', order: item.order ?? 0 })) : [defaultHighlight()],
    amenities: Array.isArray(input.amenities) && input.amenities.length ? input.amenities.map((item) => ({ name: item.name ?? '', icon: item.icon ?? '', order: item.order ?? 0 })) : [defaultAmenity()],
    features: Array.isArray(input.features) && input.features.length ? input.features : [''],
    additionalDetails: {
      reraNumber: additionalDetails.reraNumber ?? '',
      possession: additionalDetails.possession ?? '',
      propertyAge: additionalDetails.propertyAge ?? '',
      facing: additionalDetails.facing ?? '',
      furnishing: additionalDetails.furnishing ?? '',
      floor: additionalDetails.floor ?? '',
      totalFloors: additionalDetails.totalFloors ?? '',
      maintenance: additionalDetails.maintenance ?? '',
      ownership: additionalDetails.ownership ?? '',
      availability: additionalDetails.availability ?? ''
    },
    seo: {
      title: seo.title ?? '',
      description: seo.description ?? '',
      keywords: seo.keywords ?? ''
    },
    isFeatured: Boolean(input.isFeatured),
    isPublished: input.isPublished !== false,
    publishedAt: input.publishedAt ?? ''
  };

  if (!next.slug && next.title) next.slug = slugify(next.title);
  return next;
}

function findImageSet(value: PropertyImage[] | undefined): PropertyImage[] { return Array.isArray(value) ? value.filter((item) => item?.url) : []; }

export function sanitizePropertyPayload(data: PropertyFormValue): PropertyFormValue {
  const images = findImageSet(data.images).map((image, index) => ({ url: String(image.url ?? '').trim(), alt: String(image.alt ?? '').trim(), isFeatured: Boolean(image.isFeatured), order: Number(image.order ?? index + 1) }));
  const gallery = findImageSet(data.gallery).map((image, index) => ({ url: String(image.url ?? '').trim(), alt: String(image.alt ?? '').trim(), isFeatured: Boolean(image.isFeatured), order: Number(image.order ?? index + 1) }));
  const highlights = (Array.isArray(data.highlights) ? data.highlights : []).map((item, index) => ({ title: String(item?.title ?? '').trim(), text: String(item?.text ?? '').trim(), order: Number(item?.order ?? index + 1) })).filter((item) => item.title || item.text);
  const amenities = (Array.isArray(data.amenities) ? data.amenities : []).map((item, index) => ({ name: String(item?.name ?? '').trim(), icon: String(item?.icon ?? '').trim(), order: Number(item?.order ?? index + 1) })).filter((item) => item.name || item.icon);
  const features = (Array.isArray(data.features) ? data.features : []).map((item) => String(item ?? '').trim()).filter(Boolean);

  const payload: PropertyFormValue = {
    ...data,
    title: String(data.title ?? '').trim(),
    slug: (String(data.slug ?? '').trim() || slugify(String(data.title ?? ''))).trim(),
    propertyType: String(data.propertyType ?? '').trim(),
    status: String(data.status ?? '').trim(),
    developer: String(data.developer ?? '').trim(),
    project: String(data.project ?? '').trim(),
    location: {
      address: String(data.location?.address ?? '').trim(),
      locality: String(data.location?.locality ?? '').trim(),
      area: String(data.location?.area ?? '').trim(),
      city: String(data.location?.city ?? '').trim(),
      state: String(data.location?.state ?? '').trim(),
      pincode: String(data.location?.pincode ?? '').trim(),
      mapUrl: String(data.location?.mapUrl ?? '').trim(),
      latitude: String(data.location?.latitude ?? '').trim(),
      longitude: String(data.location?.longitude ?? '').trim()
    },
    pricing: {
      price: String(data.pricing?.price ?? '').trim(),
      priceLabel: String(data.pricing?.priceLabel ?? '').trim(),
      startingPrice: String(data.pricing?.startingPrice ?? '').trim(),
      maxPrice: String(data.pricing?.maxPrice ?? '').trim()
    },
    configuration: {
      bedrooms: String(data.configuration?.bedrooms ?? '').trim(),
      bathrooms: String(data.configuration?.bathrooms ?? '').trim(),
      balconies: String(data.configuration?.balconies ?? '').trim(),
      parking: String(data.configuration?.parking ?? '').trim(),
      carpetArea: String(data.configuration?.carpetArea ?? '').trim(),
      builtUpArea: String(data.configuration?.builtUpArea ?? '').trim(),
      superBuiltUpArea: String(data.configuration?.superBuiltUpArea ?? '').trim(),
      areaUnit: String(data.configuration?.areaUnit ?? '').trim(),
      configuration: String(data.configuration?.configuration ?? '').trim(),
      possessionDate: String(data.configuration?.possessionDate ?? '').trim()
    },
    images,
    gallery,
    shortDescription: String(data.shortDescription ?? '').trim(),
    description: String(data.description ?? '').trim(),
    highlights,
    amenities,
    features,
    additionalDetails: {
      reraNumber: String(data.additionalDetails?.reraNumber ?? '').trim(),
      possession: String(data.additionalDetails?.possession ?? '').trim(),
      propertyAge: String(data.additionalDetails?.propertyAge ?? '').trim(),
      facing: String(data.additionalDetails?.facing ?? '').trim(),
      furnishing: String(data.additionalDetails?.furnishing ?? '').trim(),
      floor: String(data.additionalDetails?.floor ?? '').trim(),
      totalFloors: String(data.additionalDetails?.totalFloors ?? '').trim(),
      maintenance: String(data.additionalDetails?.maintenance ?? '').trim(),
      ownership: String(data.additionalDetails?.ownership ?? '').trim(),
      availability: String(data.additionalDetails?.availability ?? '').trim()
    },
    seo: {
      title: String(data.seo?.title ?? '').trim(),
      description: String(data.seo?.description ?? '').trim(),
      keywords: String(data.seo?.keywords ?? '').trim()
    },
    isFeatured: Boolean(data.isFeatured),
    isPublished: data.isPublished !== false,
    publishedAt: data.publishedAt ?? ''
  };

  if (!payload.images.length && payload.gallery.length) payload.images = payload.gallery;
  if (!payload.gallery.length && payload.images.length) payload.gallery = payload.images;

  return payload;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
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
      <button type="button" aria-checked={checked} role="switch" onClick={() => onChange(!checked)} className={`relative inline-flex h-7 w-12 items-center rounded-full border transition-colors ${checked ? 'border-[#c9a227] bg-[#c9a227]' : 'border-[#c8c0b1] bg-[#e7e1d7]'}`}>
        <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}

function ArrayEditor({ label, value, onChange, placeholder }: { label: string; value: string[]; onChange: (next: string[]) => void; placeholder: string }) {
  return (
    <div className="space-y-3">
      {value.map((item, index) => (
        <div key={`${label}-${index}`} className="flex gap-2">
          <input value={item} onChange={(event) => {
            const next = [...value];
            next[index] = event.target.value;
            onChange(next);
          }} className={inputClass} placeholder={placeholder} />
          <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="inline-flex h-11 w-11 items-center justify-center border border-red-900/20 bg-[#f7f5f0] text-red-700"><Trash2Icon className="h-4 w-4" /></button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, ''])} className="inline-flex items-center gap-2 border border-[#b48c32]/30 bg-[#f7f5f0] px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#a98232]"><PlusIcon className="h-3.5 w-3.5" /> Add {label}</button>
    </div>
  );
}

function HighlightEditor({ value, onChange }: { value: PropertyHighlight[]; onChange: (next: PropertyHighlight[]) => void }) {
  const update = (index: number, field: keyof PropertyHighlight, input: string) => {
    const next = [...value];
    next[index] = { ...next[index], [field]: input };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {value.map((item, index) => (
        <div key={`highlight-${index}`} className="rounded-none border border-[#d8d0c2] bg-[#f8f6f2] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-[#151515]">Highlight {index + 1}</p>
            {value.length > 1 ? <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="inline-flex items-center gap-2 border border-red-900/20 px-2.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-red-700"><Trash2Icon className="h-3.5 w-3.5" /> Remove</button> : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Title</label>
              <input value={item.title} onChange={(event) => update(index, 'title', event.target.value)} className={inputClass} placeholder="Prime Location" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea value={item.text} onChange={(event) => update(index, 'text', event.target.value)} className={textAreaClass} placeholder="Located in one of Ahmedabad's most connected addresses..." />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, defaultHighlight()])} className="inline-flex items-center gap-2 border border-[#b48c32]/30 bg-[#f7f5f0] px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#a98232]"><PlusIcon className="h-3.5 w-3.5" /> Add Highlight</button>
    </div>
  );
}

function AmenityEditor({ value, onChange }: { value: PropertyAmenity[]; onChange: (next: PropertyAmenity[]) => void }) {
  const update = (index: number, field: keyof PropertyAmenity, input: string) => {
    const next = [...value];
    next[index] = { ...next[index], [field]: input };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {value.map((item, index) => (
        <div key={`amenity-${index}`} className="flex gap-2">
          <input value={item.name} onChange={(event) => update(index, 'name', event.target.value)} className={inputClass} placeholder="Swimming Pool" />
          <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="inline-flex h-11 w-11 items-center justify-center border border-red-900/20 bg-[#f7f5f0] text-red-700"><Trash2Icon className="h-4 w-4" /></button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, defaultAmenity()])} className="inline-flex items-center gap-2 border border-[#b48c32]/30 bg-[#f7f5f0] px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#a98232]"><PlusIcon className="h-3.5 w-3.5" /> Add Amenity</button>
    </div>
  );
}

function ImageEditor({ value, onChange, label }: { value: PropertyImage[]; onChange: (next: PropertyImage[]) => void; label: string }) {
  const update = (index: number, field: keyof PropertyImage, input: string | boolean) => {
    const next = [...value];
    next[index] = { ...next[index], [field]: input };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {value.length > 0 ? value.map((image, index) => (
          <div key={`${label}-${index}`} className="border border-[#d8d0c2] bg-[#f8f6f2] p-3">
            <div className="flex h-28 items-center justify-center overflow-hidden border border-[#d8d0c2] bg-[#f0ede9]">
              {image.url ? <img src={image.url} alt={image.alt || `${label} ${index + 1}`} className="h-full w-full object-cover" /> : <span className="text-[0.7rem] uppercase tracking-[0.18em] text-[#7a7368]"><ImageIcon className="h-5 w-5" /></span>}
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <button type="button" onClick={() => update(index, 'isFeatured', !image.isFeatured)} className={`border px-2 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] ${image.isFeatured ? 'border-[#c9a227] bg-[#c9a227]/10 text-[#111111]' : 'border-[#b48c32]/30 bg-[#f7f5f0] text-[#7a7368]'}`}>
                {image.isFeatured ? 'Featured' : 'Set Featured'}
              </button>
              <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="border border-red-900/20 px-2 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-red-700">Remove</button>
            </div>
          </div>
        )) : <div className="col-span-full border border-dashed border-[#d8d0c2] bg-[#f8f6f2] p-4 text-sm text-[#6f695f]">No {label.toLowerCase()} added yet.</div>}
      </div>

      {value.map((image, index) => (
        <div key={`${label}-entry-${index}`} className="rounded-none border border-[#d8d0c2] bg-[#f8f6f2] p-4">
          <label className={labelClass}>{label} {index + 1}</label>
          <input value={image.url} onChange={(event) => update(index, 'url', event.target.value)} className={inputClass} placeholder="/uploads/properties/image-1.jpg" />
          <div className="mt-3">
            <label className={labelClass}>Alt Text</label>
            <input value={image.alt} onChange={(event) => update(index, 'alt', event.target.value)} className={inputClass} placeholder="Luxury living room view" />
          </div>
        </div>
      ))}

      <button type="button" onClick={() => onChange([...value, defaultImage('', '', value.length === 0)])} className="inline-flex items-center gap-2 border border-[#b48c32]/30 bg-[#f7f5f0] px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#a98232]"><PlusIcon className="h-3.5 w-3.5" /> Add {label}</button>
    </div>
  );
}

export function PropertyForm({ mode, initialData, onCancel, onSubmit, submitting }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormValue>(() => normalizePropertyData(initialData));
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(normalizePropertyData(initialData));
  }, [initialData]);

  const updateField = <T extends keyof PropertyFormValue>(field: T, value: PropertyFormValue[T]) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const updateLocation = (field: keyof NonNullable<PropertyFormValue['location']>, value: string) => {
    setFormData((current) => ({ ...current, location: { ...(current.location ?? {}), [field]: value } }));
  };

  const updatePricing = (field: keyof NonNullable<PropertyFormValue['pricing']>, value: string) => {
    setFormData((current) => ({ ...current, pricing: { ...(current.pricing ?? {}), [field]: value } }));
  };

  const updateConfig = (field: keyof NonNullable<PropertyFormValue['configuration']>, value: string) => {
    setFormData((current) => ({ ...current, configuration: { ...(current.configuration ?? {}), [field]: value } }));
  };

  const updateAdditional = (field: keyof NonNullable<PropertyFormValue['additionalDetails']>, value: string) => {
    setFormData((current) => ({ ...current, additionalDetails: { ...(current.additionalDetails ?? {}), [field]: value } }));
  };

  const updateSeo = (field: keyof NonNullable<PropertyFormValue['seo']>, value: string) => {
    setFormData((current) => ({ ...current, seo: { ...(current.seo ?? {}), [field]: value } }));
  };

  const validateStep = () => {
    const nextErrors: Record<string, string> = {};
    if (stepIndex === 0) {
      if (!String(formData.title ?? '').trim()) nextErrors.title = 'Property name is required.';
      if (!String(formData.location?.address ?? '').trim() && stepIndex === 0) nextErrors.address = 'Location address is required.';
    }
    if (stepIndex === 2) {
      if (!String(formData.pricing?.price ?? '').trim()) nextErrors.price = 'Price is required.';
    }
    if (stepIndex === 4) {
      if (!String(formData.description ?? '').trim()) nextErrors.description = 'Description is required.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const save = async (saveMode: 'draft' | 'publish') => {
    const payload = sanitizePropertyPayload(formData);
    if (saveMode === 'publish') payload.isPublished = true;
    if (saveMode === 'draft') payload.isPublished = false;
    await onSubmit(payload, saveMode);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateStep()) return;
    if (stepIndex < steps.length - 1) {
      setStepIndex((current) => Math.min(current + 1, steps.length - 1));
      return;
    }

    await save('draft');
  };

  const previewProperty = () => {
    const slug = String(formData.slug || slugify(String(formData.title || '')) || 'property');
    window.open(`/properties/${slug}`, '_blank', 'noopener,noreferrer');
  };

  const stepContent = useMemo(() => {
    switch (stepIndex) {
      case 0:
        return <Section title="Basic Details"><div className="grid gap-5 md:grid-cols-2"><div className="md:col-span-2"><label className={labelClass}>Property Name *</label><input value={String(formData.title ?? '')} onChange={(event) => updateField('title', event.target.value)} className={inputClass} placeholder="Luxury 3 BHK Apartment" />{errors.title ? <p className="mt-1 text-xs text-red-700">{errors.title}</p> : null}</div><div><label className={labelClass}>Slug</label><input value={String(formData.slug ?? '')} onChange={(event) => updateField('slug', event.target.value)} className={inputClass} placeholder="luxury-3-bhk-apartment" /></div><div><label className={labelClass}>Property Type *</label><select value={String(formData.propertyType ?? 'Apartment')} onChange={(event) => updateField('propertyType', event.target.value)} className={inputClass}><option value="Apartment">Apartment</option><option value="Villa">Villa</option><option value="Penthouse">Penthouse</option><option value="Plot">Plot</option><option value="Commercial">Commercial</option><option value="Office">Office</option><option value="Shop">Shop</option><option value="Other">Other</option></select></div><div><label className={labelClass}>Status</label><select value={String(formData.status ?? 'Available')} onChange={(event) => updateField('status', event.target.value)} className={inputClass}><option value="Available">Available</option><option value="Sold">Sold</option><option value="Upcoming">Upcoming</option><option value="Under Construction">Under Construction</option><option value="Ready to Move">Ready to Move</option><option value="Resale">Resale</option></select></div><div><label className={labelClass}>Developer / Builder</label><input value={String(formData.developer ?? '')} onChange={(event) => updateField('developer', event.target.value)} className={inputClass} placeholder="Chauhan Realty" /></div><div><label className={labelClass}>Project Name</label><input value={String(formData.project ?? '')} onChange={(event) => updateField('project', event.target.value)} className={inputClass} placeholder="The Ridge Residences" /></div></div></Section>;
      case 1:
        return <Section title="Location"><div className="grid gap-5 md:grid-cols-2"><div className="md:col-span-2"><label className={labelClass}>Address</label><input value={String(formData.location?.address ?? '')} onChange={(event) => updateLocation('address', event.target.value)} className={inputClass} placeholder="Sector 84, Gurgaon" /></div><div><label className={labelClass}>Locality</label><input value={String(formData.location?.locality ?? '')} onChange={(event) => updateLocation('locality', event.target.value)} className={inputClass} placeholder="Dwarka Expressway" /></div><div><label className={labelClass}>Area</label><input value={String(formData.location?.area ?? '')} onChange={(event) => updateLocation('area', event.target.value)} className={inputClass} placeholder="Gurugram" /></div><div><label className={labelClass}>City</label><input value={String(formData.location?.city ?? '')} onChange={(event) => updateLocation('city', event.target.value)} className={inputClass} placeholder="Gurugram" /></div><div><label className={labelClass}>State</label><input value={String(formData.location?.state ?? '')} onChange={(event) => updateLocation('state', event.target.value)} className={inputClass} placeholder="Haryana" /></div><div><label className={labelClass}>Pincode</label><input value={String(formData.location?.pincode ?? '')} onChange={(event) => updateLocation('pincode', event.target.value)} className={inputClass} placeholder="122001" /></div><div className="md:col-span-2"><label className={labelClass}>Google Maps / Location URL</label><input value={String(formData.location?.mapUrl ?? '')} onChange={(event) => updateLocation('mapUrl', event.target.value)} className={inputClass} placeholder="https://maps.google.com/..." /></div><div><label className={labelClass}>Latitude</label><input value={String(formData.location?.latitude ?? '')} onChange={(event) => updateLocation('latitude', event.target.value)} className={inputClass} placeholder="28.4595" /></div><div><label className={labelClass}>Longitude</label><input value={String(formData.location?.longitude ?? '')} onChange={(event) => updateLocation('longitude', event.target.value)} className={inputClass} placeholder="77.0266" /></div></div></Section>;
      case 2:
        return <Section title="Pricing & Configuration"><div className="grid gap-5 md:grid-cols-2"><div><label className={labelClass}>Price</label><input value={String(formData.pricing?.price ?? '')} onChange={(event) => updatePricing('price', event.target.value)} className={inputClass} placeholder="₹1.75 Cr" />{errors.price ? <p className="mt-1 text-xs text-red-700">{errors.price}</p> : null}</div><div><label className={labelClass}>Price Label</label><input value={String(formData.pricing?.priceLabel ?? '')} onChange={(event) => updatePricing('priceLabel', event.target.value)} className={inputClass} placeholder="On Request" /></div><div><label className={labelClass}>Starting Price</label><input value={String(formData.pricing?.startingPrice ?? '')} onChange={(event) => updatePricing('startingPrice', event.target.value)} className={inputClass} placeholder="₹1.2 Cr" /></div><div><label className={labelClass}>Maximum Price</label><input value={String(formData.pricing?.maxPrice ?? '')} onChange={(event) => updatePricing('maxPrice', event.target.value)} className={inputClass} placeholder="₹2.4 Cr" /></div><div><label className={labelClass}>Bedrooms</label><input value={String(formData.configuration?.bedrooms ?? '')} onChange={(event) => updateConfig('bedrooms', event.target.value)} className={inputClass} placeholder="3" /></div><div><label className={labelClass}>Bathrooms</label><input value={String(formData.configuration?.bathrooms ?? '')} onChange={(event) => updateConfig('bathrooms', event.target.value)} className={inputClass} placeholder="3" /></div><div><label className={labelClass}>Balconies</label><input value={String(formData.configuration?.balconies ?? '')} onChange={(event) => updateConfig('balconies', event.target.value)} className={inputClass} placeholder="2" /></div><div><label className={labelClass}>Parking</label><input value={String(formData.configuration?.parking ?? '')} onChange={(event) => updateConfig('parking', event.target.value)} className={inputClass} placeholder="2 Car" /></div><div><label className={labelClass}>Carpet Area</label><input value={String(formData.configuration?.carpetArea ?? '')} onChange={(event) => updateConfig('carpetArea', event.target.value)} className={inputClass} placeholder="1480 sq.ft." /></div><div><label className={labelClass}>Built-up Area</label><input value={String(formData.configuration?.builtUpArea ?? '')} onChange={(event) => updateConfig('builtUpArea', event.target.value)} className={inputClass} placeholder="1720 sq.ft." /></div><div><label className={labelClass}>Super Built-up Area</label><input value={String(formData.configuration?.superBuiltUpArea ?? '')} onChange={(event) => updateConfig('superBuiltUpArea', event.target.value)} className={inputClass} placeholder="1890 sq.ft." /></div><div><label className={labelClass}>Area Unit</label><select value={String(formData.configuration?.areaUnit ?? 'sq.ft.')} onChange={(event) => updateConfig('areaUnit', event.target.value)} className={inputClass}><option value="sq.ft.">sq.ft.</option><option value="sq.yd.">sq.yd.</option><option value="sq.m.">sq.m.</option><option value="acre">acre</option><option value="other">other</option></select></div><div><label className={labelClass}>Configuration</label><input value={String(formData.configuration?.configuration ?? '')} onChange={(event) => updateConfig('configuration', event.target.value)} className={inputClass} placeholder="3 BHK" /></div><div><label className={labelClass}>Possession Date</label><input value={String(formData.configuration?.possessionDate ?? '')} onChange={(event) => updateConfig('possessionDate', event.target.value)} className={inputClass} placeholder="2028" /></div></div></Section>;
      case 3:
        return <Section title="Images & Gallery"><div className="space-y-6"><div><label className={labelClass}>Property Images</label><ImageEditor label="Image" value={Array.isArray(formData.images) ? formData.images : []} onChange={(next) => updateField('images', next)} /></div><div><label className={labelClass}>Gallery</label><ImageEditor label="Gallery" value={Array.isArray(formData.gallery) ? formData.gallery : []} onChange={(next) => updateField('gallery', next)} /></div></div></Section>;
      case 4:
        return <Section title="Description & Highlights"><div className="grid gap-5 md:grid-cols-2"><div className="md:col-span-2"><label className={labelClass}>Short Description</label><textarea value={String(formData.shortDescription ?? '')} onChange={(event) => updateField('shortDescription', event.target.value)} className={textAreaClass} placeholder="A premium residence designed around open living and natural light." /></div><div className="md:col-span-2"><label className={labelClass}>Full Description *</label><textarea value={String(formData.description ?? '')} onChange={(event) => updateField('description', event.target.value)} className={textAreaClass} placeholder="Detailed description showing lifestyle, positioning and feature narrative..." />{errors.description ? <p className="mt-1 text-xs text-red-700">{errors.description}</p> : null}</div></div><div className="pt-2"><HighlightEditor value={Array.isArray(formData.highlights) ? formData.highlights : [defaultHighlight()]} onChange={(next) => updateField('highlights', next)} /></div></Section>;
      case 5:
        return <Section title="Amenities & Features"><div className="space-y-6"><div><label className={labelClass}>Amenities</label><AmenityEditor value={Array.isArray(formData.amenities) ? formData.amenities : [defaultAmenity()]} onChange={(next) => updateField('amenities', next)} /></div><div><label className={labelClass}>Features</label><ArrayEditor label="Feature" value={Array.isArray(formData.features) ? formData.features : ['']} onChange={(next) => updateField('features', next)} placeholder="Private terrace" /></div></div></Section>;
      case 6:
        return <Section title="Additional Information"><div className="grid gap-5 md:grid-cols-2"><div><label className={labelClass}>RERA Number</label><input value={String(formData.additionalDetails?.reraNumber ?? '')} onChange={(event) => updateAdditional('reraNumber', event.target.value)} className={inputClass} placeholder="HRERA-12345" /></div><div><label className={labelClass}>Possession</label><input value={String(formData.additionalDetails?.possession ?? '')} onChange={(event) => updateAdditional('possession', event.target.value)} className={inputClass} placeholder="Ready to move / 2028" /></div><div><label className={labelClass}>Property Age</label><input value={String(formData.additionalDetails?.propertyAge ?? '')} onChange={(event) => updateAdditional('propertyAge', event.target.value)} className={inputClass} placeholder="2 years" /></div><div><label className={labelClass}>Facing</label><input value={String(formData.additionalDetails?.facing ?? '')} onChange={(event) => updateAdditional('facing', event.target.value)} className={inputClass} placeholder="South-East" /></div><div><label className={labelClass}>Furnishing</label><input value={String(formData.additionalDetails?.furnishing ?? '')} onChange={(event) => updateAdditional('furnishing', event.target.value)} className={inputClass} placeholder="Semi-furnished" /></div><div><label className={labelClass}>Floor</label><input value={String(formData.additionalDetails?.floor ?? '')} onChange={(event) => updateAdditional('floor', event.target.value)} className={inputClass} placeholder="8th Floor" /></div><div><label className={labelClass}>Total Floors</label><input value={String(formData.additionalDetails?.totalFloors ?? '')} onChange={(event) => updateAdditional('totalFloors', event.target.value)} className={inputClass} placeholder="18" /></div><div><label className={labelClass}>Maintenance</label><input value={String(formData.additionalDetails?.maintenance ?? '')} onChange={(event) => updateAdditional('maintenance', event.target.value)} className={inputClass} placeholder="₹3.5/sq.ft." /></div><div><label className={labelClass}>Ownership</label><input value={String(formData.additionalDetails?.ownership ?? '')} onChange={(event) => updateAdditional('ownership', event.target.value)} className={inputClass} placeholder="Freehold" /></div><div><label className={labelClass}>Availability</label><input value={String(formData.additionalDetails?.availability ?? '')} onChange={(event) => updateAdditional('availability', event.target.value)} className={inputClass} placeholder="Immediate / Q4 2027" /></div></div></Section>;
      case 7:
        return <Section title="SEO & Publish"><div className="grid gap-5 md:grid-cols-2"><div className="md:col-span-2"><label className={labelClass}>SEO Title</label><input value={String(formData.seo?.title ?? '')} onChange={(event) => updateSeo('title', event.target.value)} className={inputClass} placeholder="Premium 3 BHK apartment in Gurugram" /></div><div className="md:col-span-2"><label className={labelClass}>SEO Description</label><textarea value={String(formData.seo?.description ?? '')} onChange={(event) => updateSeo('description', event.target.value)} className={textAreaClass} placeholder="A premium residence with open layouts..." /></div><div className="md:col-span-2"><label className={labelClass}>SEO Keywords</label><input value={String(formData.seo?.keywords ?? '')} onChange={(event) => updateSeo('keywords', event.target.value)} className={inputClass} placeholder="3 bhk gurugram, luxury apartment, premium residences" /></div><div className="md:col-span-2"><ToggleField label="Featured Property" checked={Boolean(formData.isFeatured)} onChange={(value) => updateField('isFeatured', value)} /></div><div className="md:col-span-2"><ToggleField label="Published" checked={Boolean(formData.isPublished)} onChange={(value) => updateField('isPublished', value)} /></div></div></Section>;
      default:
        return null;
    }
  }, [errors, formData, stepIndex]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 sm:p-6">
      <form onSubmit={submit} className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-[#c9a227]/30 bg-[#f2efe8] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#d8d0c2] bg-[#f7f5f0] px-5 py-4 sm:px-7">
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#a98232]">Property CMS</p>
            <h2 className="mt-1 font-display text-2xl text-[#151515]">{mode === 'create' ? 'Add Property' : 'Edit Property'}</h2>
          </div>
          <button type="button" onClick={onCancel} aria-label="Close property form" className="inline-flex h-10 w-10 items-center justify-center border border-[#b48c32]/30 bg-[#fbfaf6] text-[#151515]"><XIcon className="h-4 w-4" /></button>
        </div>

        <div className="border-b border-[#d8d0c2] bg-[#f7f5f0] px-5 py-4 sm:px-7">
          <div className="flex flex-wrap gap-2">
            {steps.map((step, index) => (
              <button type="button" key={step} onClick={() => setStepIndex(index)} className={`inline-flex items-center justify-center border px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${index === stepIndex ? 'border-[#c9a227] bg-[#c9a227] text-[#111111]' : 'border-[#b48c32]/30 bg-[#fbfaf6] text-[#7a7368]'}`}>
                {index + 1}. {step}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-7">{stepContent}</div>

        <div className="flex flex-col gap-3 border-t border-[#d8d0c2] bg-[#f7f5f0] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex gap-3">
            <button type="button" disabled={stepIndex === 0} onClick={() => setStepIndex((current) => Math.max(current - 1, 0))} className="inline-flex items-center gap-2 border border-[#b48c32]/30 bg-[#fbfaf6] px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#151515] disabled:cursor-not-allowed disabled:opacity-40">
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            {stepIndex === steps.length - 1 ? (
              <button type="button" onClick={() => save('draft')} className="inline-flex items-center gap-2 border border-[#b48c32]/30 bg-[#fbfaf6] px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#151515]">
                <SaveIcon className="h-4 w-4" /> Save Draft
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            {stepIndex === steps.length - 1 ? (
              <>
                <button type="button" onClick={previewProperty} className="inline-flex items-center gap-2 border border-[#b48c32]/30 bg-[#fbfaf6] px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#151515]">Preview</button>
                <button type="button" onClick={() => save('publish')} className="inline-flex items-center gap-2 bg-[#c9a227] px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#111111] disabled:cursor-not-allowed disabled:opacity-60">
                  <Check className="h-4 w-4" /> Publish Property
                </button>
              </>
            ) : (
              <button type="submit" className="inline-flex items-center gap-2 bg-[#c9a227] px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#111111] disabled:cursor-not-allowed disabled:opacity-60">
                Save & Continue <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
