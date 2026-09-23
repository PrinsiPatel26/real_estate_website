import React, { useEffect, useState } from 'react';
import { SaveIcon, XIcon } from 'lucide-react';
import { useAdminAuth } from '../../admin/AdminAuthContext';
import { uploadProjectImage } from '../../services/api';

export type BlogFormValue = Record<string, unknown> & {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  readTime: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  isPublished: boolean;
  publishedAt?: string;
};

const inputClass = 'h-11 w-full border border-[#b48c32]/30 bg-[#fbfaf6] px-3 text-sm outline-none focus:border-[#c9a227]';
const areaClass = 'min-h-[150px] w-full resize-y border border-[#b48c32]/30 bg-[#fbfaf6] px-3 py-3 text-sm outline-none focus:border-[#c9a227]';
const labelClass = 'mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#7a7368]';

export function normalizeBlogRecord(record: Record<string, unknown> = {}): BlogFormValue {
  const content = Array.isArray(record.content)
    ? record.content.map((item) => typeof item === 'string' ? item : String((item as Record<string, unknown>)?.text ?? '')).filter(Boolean).join('\n\n')
    : String(record.content ?? record.body ?? '');
  return {
    ...record,
    _id: typeof record._id === 'string' ? record._id : undefined,
    title: String(record.title ?? ''),
    slug: String(record.slug ?? ''),
    category: String(record.category ?? ''),
    author: String(record.author ?? 'Chauhan Realtors'),
    excerpt: String(record.excerpt ?? ''),
    content,
    readTime: String(record.readTime ?? ''),
    image: String(record.image ?? ''),
    seoTitle: String(record.seoTitle ?? ''),
    seoDescription: String(record.seoDescription ?? ''),
    seoKeywords: String(record.seoKeywords ?? ''),
    isPublished: record.isPublished === undefined ? true : record.isPublished === true,
    publishedAt: typeof record.publishedAt === 'string' ? record.publishedAt.slice(0, 10) : ''
  };
}

export function sanitizeBlogPayload(value: BlogFormValue): Record<string, unknown> {
  return {
    ...value,
    title: value.title.trim(),
    slug: value.slug.trim(),
    category: value.category.trim(),
    author: value.author.trim(),
    excerpt: value.excerpt.trim(),
    content: value.content.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean),
    readTime: value.readTime.trim(),
    image: value.image.trim(),
    seoTitle: value.seoTitle.trim(),
    seoDescription: value.seoDescription.trim(),
    seoKeywords: value.seoKeywords.trim(),
    publishedAt: value.publishedAt || undefined
  };
}

export function BlogForm({ initialData, onCancel, onSubmit, submitting }: { initialData?: Record<string, unknown>; onCancel: () => void; onSubmit: (value: Record<string, unknown>) => void | Promise<void>; submitting?: boolean }) {
  const [form, setForm] = useState(() => normalizeBlogRecord(initialData));
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const { token } = useAdminAuth();

  useEffect(() => setForm(normalizeBlogRecord(initialData)), [initialData]);

  const update = (field: keyof BlogFormValue, value: string | boolean) => setForm((current) => ({ ...current, [field]: value }));
  const uploadImage = async (file: File) => {
    if (!token) return;
    setUploading(true);
    try {
      const response = await uploadProjectImage(file, token);
      update('image', response.data.url);
      setError('');
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Unable to upload image.');
    } finally {
      setUploading(false);
    }
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.slug.trim() || !form.category.trim()) {
      setError('Title, slug and category are required.');
      return;
    }
    setError('');
    await onSubmit(sanitizeBlogPayload(form));
  };

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6">
    <form onSubmit={submit} className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-[#c9a227]/30 bg-[#f2efe8] shadow-2xl">
      <header className="flex items-center justify-between border-b border-[#d8d0c2] bg-[#f7f5f0] px-5 py-4 sm:px-7"><div><p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#a98232]">Blog CMS</p><h2 className="mt-1 font-display text-2xl">{form._id ? 'Edit Blog' : 'Add Blog'}</h2></div><button type="button" onClick={onCancel} aria-label="Close blog editor" className="inline-flex h-10 w-10 items-center justify-center border border-[#b48c32]/30"><XIcon className="h-4 w-4" /></button></header>
      <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-7">
        <section className="border border-[#d8d0c2] bg-[#f7f5f0] p-4 sm:p-6"><h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#a98232]">Blog Basic Information</h3><div className="mt-5 grid gap-5 md:grid-cols-2"><label><span className={labelClass}>Blog Title *</span><input value={form.title} onChange={(event) => update('title', event.target.value)} className={inputClass} /></label><label><span className={labelClass}>Slug *</span><input value={form.slug} onChange={(event) => update('slug', event.target.value)} className={inputClass} /></label><label><span className={labelClass}>Category *</span><input value={form.category} onChange={(event) => update('category', event.target.value)} className={inputClass} /></label><label><span className={labelClass}>Author</span><input value={form.author} onChange={(event) => update('author', event.target.value)} className={inputClass} /></label><label><span className={labelClass}>Read Time</span><input value={form.readTime} onChange={(event) => update('readTime', event.target.value)} className={inputClass} placeholder="5 min read" /></label><label><span className={labelClass}>Published Date</span><input type="date" value={form.publishedAt ?? ''} onChange={(event) => update('publishedAt', event.target.value)} className={inputClass} /></label><label className="md:col-span-2"><span className={labelClass}>Excerpt</span><textarea value={form.excerpt} onChange={(event) => update('excerpt', event.target.value)} className={areaClass} /></label><div className="md:col-span-2"><span className={labelClass}>Featured Image</span>{form.image ? <img src={form.image} alt="Featured blog preview" className="mb-3 h-40 w-full object-cover" /> : null}<div className="flex flex-wrap items-center gap-3"><label className="inline-flex cursor-pointer items-center border border-[#b48c32]/30 px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a98232]"><input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadImage(file); event.target.value = ''; }} />{uploading ? 'Uploading...' : 'Upload Image'}</label><input value={form.image} onChange={(event) => update('image', event.target.value)} className={`${inputClass} max-w-xl`} placeholder="Or paste an existing image path" /></div></div></div></section>
        <section className="border border-[#d8d0c2] bg-[#f7f5f0] p-4 sm:p-6"><h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#a98232]">Blog Content</h3><div className="mt-5"><label className={labelClass}>Content</label><textarea value={form.content} onChange={(event) => update('content', event.target.value)} className="min-h-[280px] w-full resize-y border border-[#b48c32]/30 bg-[#fbfaf6] px-3 py-3 text-sm leading-relaxed outline-none focus:border-[#c9a227]" placeholder="Write the blog content in paragraphs." /></div></section>
        <section className="border border-[#d8d0c2] bg-[#f7f5f0] p-4 sm:p-6"><h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#a98232]">SEO</h3><div className="mt-5 grid gap-5 md:grid-cols-2"><label><span className={labelClass}>SEO Title</span><input value={form.seoTitle} onChange={(event) => update('seoTitle', event.target.value)} className={inputClass} /></label><label><span className={labelClass}>SEO Keywords</span><input value={form.seoKeywords} onChange={(event) => update('seoKeywords', event.target.value)} className={inputClass} /></label><label className="md:col-span-2"><span className={labelClass}>SEO Description</span><textarea value={form.seoDescription} onChange={(event) => update('seoDescription', event.target.value)} className={areaClass} /></label></div></section>
        <label className="flex items-center justify-between border border-[#d8d0c2] bg-[#f7f5f0] px-4 py-3"><span className="text-sm">Published</span><input type="checkbox" checked={form.isPublished} onChange={(event) => update('isPublished', event.target.checked)} className="h-5 w-5 accent-[#c9a227]" /></label>
        {error ? <p role="alert" className="border border-red-900/20 bg-red-50 p-3 text-sm text-red-800">{error}</p> : null}
      </div>
      <footer className="flex justify-end gap-3 border-t border-[#d8d0c2] bg-[#f7f5f0] px-5 py-4 sm:px-7"><button type="button" onClick={onCancel} className="border border-[#b48c32]/30 px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em]">Cancel</button><button type="submit" disabled={submitting} className="inline-flex items-center gap-2 bg-[#c9a227] px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] disabled:opacity-60"><SaveIcon className="h-4 w-4" />{submitting ? 'Saving...' : 'Save Blog'}</button></footer>
    </form>
  </div>;
}