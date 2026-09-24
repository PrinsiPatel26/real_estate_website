import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeftIcon, PencilIcon, PlusIcon, SaveIcon, Trash2Icon, XIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { createAdminRecord, deleteAdminRecord, getAdminCollection, updateAdminRecord } from '../../services/api';
import { useAdminAuth } from '../../admin/AdminAuthContext';
import { ConfirmDialog, ProjectForm, normalizeProjectRecord, type ProjectFormValue } from './ProjectForm';
import { normalizePropertyData, PropertyForm, sanitizePropertyPayload, type PropertyFormValue } from './PropertyForm';
import { BlogForm, normalizeBlogRecord } from './BlogForm';
import { EnquiryForm } from './EnquiryForm';

type RecordValue = Record<string, unknown> & { _id?: string; id?: string; name?: string; title?: string; slug?: string; email?: string; status?: string; updatedAt?: string };

const labels: Record<string, string> = { projects: 'Projects', properties: 'Properties', blogs: 'Blogs', enquiries: 'Enquiries' };

function displayName(record: RecordValue) {
  return String(record.name || record.title || record.slug || record.email || record._id || 'Untitled record');
}

function blogStatus(record: RecordValue) {
  return record.isPublished === false ? 'Draft' : 'Published';
}

function formatDate(value: unknown) {
  return value ? new Date(String(value)).toLocaleDateString() : '-';
}

function initialRecord(resource: string): RecordValue {
  if (resource === 'enquiries') return { name: '', email: '', phone: '', message: '', status: 'New', source: 'admin' };
  if (resource === 'blogs') return { title: '', slug: '', category: '', excerpt: '', author: 'Chauhan Realtors', content: [], image: '', isFeatured: false, isPublished: true };
  return { name: '', title: '', slug: '', location: '', developer: '', tagline: '', description: '', card: '', isPublished: false, isFeatured: false };
}

const defaultPropertyDraft = (): PropertyFormValue => normalizePropertyData({
  title: '',
  slug: '',
  propertyType: 'Apartment',
  status: 'Available',
  developer: 'Chauhan Realtors',
  project: '',
  location: { address: '', locality: '', area: '', city: '', state: '', pincode: '', mapUrl: '', latitude: '', longitude: '' },
  pricing: { price: '', priceLabel: '', startingPrice: '', maxPrice: '' },
  configuration: {
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    parking: '',
    carpetArea: '',
    builtUpArea: '',
    superBuiltUpArea: '',
    areaUnit: 'sq.ft.',
    configuration: '',
    possessionDate: ''
  },
  images: [],
  gallery: [],
  shortDescription: '',
  description: '',
  highlights: [{ title: '', text: '' }],
  amenities: [{ name: '', icon: '' }],
  features: [''],
  additionalDetails: {
    reraNumber: '',
    possession: '',
    propertyAge: '',
    facing: '',
    furnishing: '',
    floor: '',
    totalFloors: '',
    maintenance: '',
    ownership: '',
    availability: ''
  },
  seo: { title: '', description: '', keywords: '' },
  isFeatured: false,
  isPublished: false
});

const defaultProjectDraft = (): ProjectFormValue => normalizeProjectRecord({
  name: '',
  slug: '',
  developer: '',
  location: '',
  city: '',
  projectType: 'Residential',
  status: 'Upcoming',
  price: '',
  priceLabel: '',
  minimumPrice: '',
  maximumPrice: '',
  shortDescription: '',
  description: '',
  configuration: '',
  area: '',
  possession: '',
  address: '',
  highlights: [{ title: '', text: '' }],
  amenities: [''],
  features: [''],
  images: [],
  gallery: [],
  isFeatured: false,
  isPublished: true,
  seoTitle: '',
  seoDescription: '',
  seoKeywords: ''
});

export function AdminResourcePage({ resource: resourceOverride }: { resource?: 'projects' | 'blogs' }) {
  const params = useParams<{ resource: string }>();
  const resource = resourceOverride || params.resource || 'projects';
  const { token } = useAdminAuth();
  const navigate = useNavigate();
  const [records, setRecords] = useState<RecordValue[]>([]);
  const [blogDraft, setBlogDraft] = useState<RecordValue | null>(null);
  const [enquiryDraft, setEnquiryDraft] = useState<RecordValue | null>(null);
  const [projectDraft, setProjectDraft] = useState<ProjectFormValue | null>(null);
  const [propertyDraft, setPropertyDraft] = useState<PropertyFormValue | null>(null);
  const [projectDeleteTarget, setProjectDeleteTarget] = useState<RecordValue | null>(null);
  const [propertyDeleteTarget, setPropertyDeleteTarget] = useState<RecordValue | null>(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const label = labels[resource] || 'Content';
  const filteredRecords = useMemo(() => records.filter((record) => {
    const search = query.toLowerCase();
    return displayName(record).toLowerCase().includes(search)
      || String(record.slug || '').toLowerCase().includes(search)
      || (resource === 'blogs' && (String(record.category || '').toLowerCase().includes(search) || String(record.author || '').toLowerCase().includes(search)));
  }), [records, query, resource]);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await getAdminCollection<RecordValue>(resource, token);
      setRecords(response.data);
      setError('');
    } catch {
      setError(`Unable to load ${label.toLowerCase()}.`);
    } finally {
      setLoading(false);
    }
  }, [label, resource, token]);

  useEffect(() => { load(); }, [load]);

  const startEdit = (record: RecordValue) => {
    if (resource === 'projects') {
      setProjectDraft(normalizeProjectRecord(record as Partial<ProjectFormValue>));
      setError('');
      setNotice('');
      return;
    }

    if (resource === 'properties') {
      setPropertyDraft(normalizePropertyData(record as Partial<PropertyFormValue>));
      setError('');
      setNotice('');
      return;
    }

    if (resource === 'blogs') setBlogDraft(normalizeBlogRecord(record));
    if (resource === 'enquiries') setEnquiryDraft(record);
    setError('');
  };

  const startCreate = () => {
    if (resource === 'projects') {
      setProjectDraft(defaultProjectDraft());
      setError('');
      setNotice('');
      return;
    }

    if (resource === 'properties') {
      setPropertyDraft(defaultPropertyDraft());
      setError('');
      setNotice('');
      return;
    }

    const record = initialRecord(resource);
    if (resource === 'blogs') setBlogDraft(normalizeBlogRecord(record));
    if (resource === 'enquiries') setEnquiryDraft(record);
    setError('');
  };

  const saveStructured = async (payload: Record<string, unknown>, id?: string) => {
    if (!token) return;
    setSaving(true);
    setError('');
    try {
      if (id) await updateAdminRecord(resource, id, payload, token);
      else await createAdminRecord(resource, payload, token);
      setBlogDraft(null);
      setEnquiryDraft(null);
      setNotice(`${label.slice(0, -1)} saved successfully.`);
      await load();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : `Unable to save ${label.toLowerCase()}.`);
    } finally {
      setSaving(false);
    }
  };

  const handleProjectSubmit = async (payload: ProjectFormValue) => {
    if (!token) return;

    setSaving(true);
    setError('');
    try {
      if (payload._id) {
        await updateAdminRecord('projects', payload._id, payload, token);
        setNotice('Project updated successfully.');
      } else {
        await createAdminRecord('projects', payload, token);
        setNotice('Project created successfully.');
      }

      setProjectDraft(null);
      await load();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handlePropertySubmit = async (payload: PropertyFormValue, mode: 'draft' | 'publish' = 'draft') => {
    if (!token) return;

    setSaving(true);
    setError('');
    try {
      const normalized = sanitizePropertyPayload(payload);
      normalized.isPublished = mode === 'publish';

      if (normalized._id) {
        await updateAdminRecord('properties', normalized._id, normalized, token);
        setNotice('Property updated successfully.');
      } else {
        await createAdminRecord('properties', normalized, token);
        setNotice('Property created successfully.');
      }

      setPropertyDraft(null);
      await load();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save property.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (record: RecordValue) => {
    if (!token || !record._id) return;

    if (resource === 'projects') {
      setProjectDeleteTarget(record);
      return;
    }

    if (resource === 'properties') {
      setPropertyDeleteTarget(record);
      return;
    }

    if (!window.confirm(`Delete ${displayName(record)}?`)) return;

    try {
      await deleteAdminRecord(resource, record._id, token);
      setNotice(`${displayName(record)} deleted successfully.`);
      await load();
    } catch {
      setError(`Unable to delete ${label.toLowerCase()}.`);
    }
  };

  const confirmProjectDelete = async () => {
    if (!token || !projectDeleteTarget?._id) return;

    try {
      await deleteAdminRecord('projects', projectDeleteTarget._id, token);
      setProjectDeleteTarget(null);
      setNotice('Project deleted successfully.');
      await load();
    } catch {
      setError('Unable to delete project.');
    }
  };

  const confirmPropertyDelete = async () => {
    if (!token || !propertyDeleteTarget?._id) return;

    try {
      await deleteAdminRecord('properties', propertyDeleteTarget._id, token);
      setPropertyDeleteTarget(null);
      setNotice('Property deleted successfully.');
      await load();
    } catch {
      setError('Unable to delete property.');
    }
  };

  return <div className="min-h-screen bg-[#f2efe8] text-[#151515]">
    <header className="border-b border-[#b48c32]/25 bg-[#f7f5f0] px-5 py-5 sm:px-8 lg:px-12">
      <button type="button" onClick={() => navigate('/admin/dashboard')} className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-[#a98232]"><ArrowLeftIcon className="h-4 w-4" />Dashboard</button>
    </header>
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#a98232]">Admin CMS</p><h1 className="mt-3 font-display text-4xl font-medium">{resource === 'blogs' ? 'Blogs' : label}</h1>{resource === 'blogs' ? <p className="mt-3 max-w-xl text-sm text-[#6f695f]">Manage website articles, insights and real-estate content.</p> : null}</div><button type="button" onClick={startCreate} className="inline-flex h-11 items-center justify-center gap-2 bg-[#c9a227] px-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em]"><PlusIcon className="h-4 w-4" />{resource === 'blogs' ? 'Add Blog' : `Add ${label.slice(0, -1)}`}</button></div>
      <div className="mt-8 flex gap-3"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${label.toLowerCase()}...`} className="h-11 w-full max-w-md border border-[#b48c32]/30 bg-[#f7f5f0] px-4 text-sm outline-none focus:border-[#c9a227]" /></div>
      {error ? <p role="alert" className="mt-5 border border-red-900/20 bg-red-50 p-3 text-sm text-red-800">{error}</p> : null}
      {notice ? <p className="mt-5 border border-emerald-900/20 bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</p> : null}
      {loading ? <p className="mt-10 text-sm text-[#6f695f]">Loading {label.toLowerCase()}...</p> : resource === 'blogs' ? <div className="mt-8 overflow-x-auto border border-[#b48c32]/25 bg-[#f7f5f0]"><table className="w-full min-w-[820px] text-left text-sm"><thead className="border-b border-[#b48c32]/25 text-[0.66rem] uppercase tracking-[0.16em] text-[#857d70]"><tr><th className="px-5 py-4">Blog</th><th className="px-5 py-4">Category</th><th className="px-5 py-4">Author</th><th className="px-5 py-4">Published</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Updated</th><th className="px-5 py-4 text-right">Actions</th></tr></thead><tbody>{filteredRecords.map((record) => <tr key={String(record._id || record.id)} className="border-b border-[#e8e2d6] last:border-0"><td className="max-w-[260px] px-5 py-4"><p className="truncate font-medium">{displayName(record)}</p><p className="mt-1 truncate text-xs text-[#857d70]">/{String(record.slug || '')}</p></td><td className="px-5 py-4 text-[#6f695f]">{String(record.category || 'Uncategorised')}</td><td className="px-5 py-4 text-[#6f695f]">{String(record.author || 'Chauhan Realtors')}</td><td className="px-5 py-4 text-[#6f695f]">{formatDate(record.publishedAt)}</td><td className="px-5 py-4"><span className={record.isPublished === false ? 'text-[#857d70]' : 'text-[#a98232]'}>{blogStatus(record)}</span></td><td className="px-5 py-4 text-[#6f695f]">{formatDate(record.updatedAt)}</td><td className="px-5 py-4"><div className="flex justify-end gap-2"><button type="button" onClick={() => startEdit(record)} aria-label={`Edit ${displayName(record)}`} className="border border-[#b48c32]/30 p-2 text-[#a98232]"><PencilIcon className="h-4 w-4" /></button><button type="button" onClick={() => remove(record)} aria-label={`Delete ${displayName(record)}`} className="border border-red-900/20 p-2 text-red-700"><Trash2Icon className="h-4 w-4" /></button></div></td></tr>)}</tbody></table>{filteredRecords.length === 0 ? <p className="p-8 text-sm text-[#6f695f]">No blogs found.</p> : null}</div> : <div className="mt-8 overflow-x-auto border border-[#b48c32]/25 bg-[#f7f5f0]"><table className="w-full min-w-[620px] text-left text-sm"><thead className="border-b border-[#b48c32]/25 text-[0.66rem] uppercase tracking-[0.16em] text-[#857d70]"><tr><th className="px-5 py-4">Record</th><th className="px-5 py-4">Slug / Status</th><th className="px-5 py-4">Updated</th><th className="px-5 py-4 text-right">Actions</th></tr></thead><tbody>{filteredRecords.map((record) => <tr key={String(record._id || record.id)} className="border-b border-[#e8e2d6] last:border-0"><td className="px-5 py-4 font-medium">{displayName(record)}</td><td className="px-5 py-4 text-[#6f695f]">{String(record.slug || record.status || 'Published')}</td><td className="px-5 py-4 text-[#6f695f]">{record.updatedAt ? new Date(String(record.updatedAt)).toLocaleDateString() : '-'}</td><td className="px-5 py-4"><div className="flex justify-end gap-2"><button type="button" onClick={() => startEdit(record)} aria-label={`Edit ${displayName(record)}`} className="border border-[#b48c32]/30 p-2 text-[#a98232]"><PencilIcon className="h-4 w-4" /></button><button type="button" onClick={() => remove(record)} aria-label={`Delete ${displayName(record)}`} className="border border-red-900/20 p-2 text-red-700"><Trash2Icon className="h-4 w-4" /></button></div></td></tr>)}</tbody></table>{filteredRecords.length === 0 ? <p className="p-8 text-sm text-[#6f695f]">No {label.toLowerCase()} found.</p> : null}</div>}
    </main>

    {resource === 'projects' && projectDraft ? <ProjectForm mode={projectDraft._id ? 'edit' : 'create'} initialData={projectDraft} onCancel={() => setProjectDraft(null)} onSubmit={handleProjectSubmit} submitting={saving} /> : null}

    {resource === 'properties' && propertyDraft ? <PropertyForm mode={propertyDraft._id ? 'edit' : 'create'} initialData={propertyDraft} onCancel={() => setPropertyDraft(null)} onSubmit={handlePropertySubmit} submitting={saving} /> : null}

    {resource === 'blogs' && blogDraft ? <BlogForm initialData={blogDraft} onCancel={() => setBlogDraft(null)} onSubmit={(payload) => saveStructured(payload, blogDraft._id)} submitting={saving} /> : null}
    {resource === 'enquiries' && enquiryDraft ? <EnquiryForm initialData={enquiryDraft} onCancel={() => setEnquiryDraft(null)} onSubmit={(payload) => saveStructured(payload, enquiryDraft._id)} submitting={saving} /> : null}

    {resource === 'projects' && projectDeleteTarget ? <ConfirmDialog open={Boolean(projectDeleteTarget)} title="Delete Project" message={`Are you sure you want to delete:\n"${displayName(projectDeleteTarget)}"?\n\nThis action cannot be undone.`} confirmText="Delete Project" onCancel={() => setProjectDeleteTarget(null)} onConfirm={confirmProjectDelete} /> : null}
    {resource === 'properties' && propertyDeleteTarget ? <ConfirmDialog open={Boolean(propertyDeleteTarget)} title="Delete Property" message={`Are you sure you want to delete:\n"${displayName(propertyDeleteTarget)}"?\n\nThis action cannot be undone.`} confirmText="Delete Property" onCancel={() => setPropertyDeleteTarget(null)} onConfirm={confirmPropertyDelete} /> : null}
  </div>;
}
