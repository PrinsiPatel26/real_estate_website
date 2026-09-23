import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon, PlusIcon, SaveIcon, Trash2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../services/api';
import { useAdminAuth } from '../../admin/AdminAuthContext';

type Pair = { title: string; text: string };
type WebsiteForm = {
  heroContent: { eyebrow: string; supporting: string; headingLines: string[] };
  aboutContent: { eyebrow: string; headingLines: string[]; body: string; pillars: Pair[] };
  founderContent: { eyebrow: string; statement: string; quote: string[] };
  heroStats: Pair[];
  whyChauhan: Pair[];
  gurgaonCorridors: Pair[];
};

const inputClass = 'h-11 w-full border border-[#b48c32]/30 bg-[#fbfaf6] px-3 text-sm outline-none focus:border-[#c9a227]';
const areaClass = 'min-h-[130px] w-full resize-y border border-[#b48c32]/30 bg-[#fbfaf6] px-3 py-3 text-sm outline-none focus:border-[#c9a227]';
const labelClass = 'mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#7a7368]';
const emptyPair = (): Pair => ({ title: '', text: '' });

function normalizePairs(value: unknown): Pair[] {
  if (!Array.isArray(value)) return [emptyPair()];
  const pairs = value.map((item) => {
    const record = item && typeof item === 'object' ? item as Record<string, unknown> : {};
    return { title: String(record.title ?? record.name ?? ''), text: String(record.text ?? record.note ?? '') };
  }).filter((item) => item.title || item.text);
  return pairs.length ? pairs : [emptyPair()];
}

function normalizeContent(data: Record<string, unknown>): WebsiteForm {
  const hero = (data.heroContent && typeof data.heroContent === 'object' ? data.heroContent : {}) as Record<string, unknown>;
  const about = (data.aboutContent && typeof data.aboutContent === 'object' ? data.aboutContent : {}) as Record<string, unknown>;
  const founder = (data.founderContent && typeof data.founderContent === 'object' ? data.founderContent : {}) as Record<string, unknown>;
  return {
    heroContent: { eyebrow: String(hero.eyebrow ?? ''), supporting: String(hero.supporting ?? ''), headingLines: Array.isArray(hero.headingLines) ? hero.headingLines.map(String) : ['', ''] },
    aboutContent: { eyebrow: String(about.eyebrow ?? ''), headingLines: Array.isArray(about.headingLines) ? about.headingLines.map(String) : ['', ''], body: String(about.body ?? ''), pillars: normalizePairs(about.pillars) },
    founderContent: { eyebrow: String(founder.eyebrow ?? ''), statement: String(founder.statement ?? ''), quote: Array.isArray(founder.quote) ? founder.quote.map(String) : ['', ''] },
    heroStats: normalizePairs(data.heroStats),
    whyChauhan: normalizePairs(data.whyChauhan),
    gurgaonCorridors: normalizePairs(data.gurgaonCorridors)
  };
}

function PairManager({ value, onChange, title }: { value: Pair[]; onChange: (value: Pair[]) => void; title: string }) {
  return <section className="border border-[#d8d0c2] bg-[#f7f5f0] p-4 sm:p-6"><h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#a98232]">{title}</h2><div className="mt-5 space-y-4">{value.map((item, index) => <div key={`${title}-${index}`} className="grid gap-3 border border-[#d8d0c2] bg-[#f8f6f2] p-4 md:grid-cols-2"><label><span className={labelClass}>Title / Name</span><input value={item.title} onChange={(event) => { const next = [...value]; next[index] = { ...item, title: event.target.value }; onChange(next); }} className={inputClass} /></label><label><span className={labelClass}>Description / Note</span><textarea value={item.text} onChange={(event) => { const next = [...value]; next[index] = { ...item, text: event.target.value }; onChange(next); }} className={areaClass} /></label><button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="inline-flex h-10 w-10 items-center justify-center border border-red-900/20 text-red-700" aria-label={`Remove ${title} ${index + 1}`}><Trash2Icon className="h-4 w-4" /></button></div>)}<button type="button" onClick={() => onChange([...value, emptyPair()])} className="inline-flex items-center gap-2 border border-[#b48c32]/30 px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#a98232]"><PlusIcon className="h-3.5 w-3.5" /> Add Item</button></div></section>;
}

export function AdminContentPage() {
  const navigate = useNavigate();
  const { token } = useAdminAuth();
  const [form, setForm] = useState<WebsiteForm>(() => normalizeContent({}));
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE_URL}/content`).then((response) => response.json()).then((body) => setForm(normalizeContent(body.data || {}))).catch(() => setStatus('Unable to load website content.'));
  }, [token]);

  const save = async () => {
    if (!token) return;
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/content`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error();
      setStatus('Website content saved successfully.');
    } catch {
      setStatus('Unable to save website content.');
    } finally {
      setSaving(false);
    }
  };

  const updateHero = (field: 'eyebrow' | 'supporting', value: string) => setForm((current) => ({ ...current, heroContent: { ...current.heroContent, [field]: value } }));
  const updateAbout = (field: 'eyebrow' | 'body', value: string) => setForm((current) => ({ ...current, aboutContent: { ...current.aboutContent, [field]: value } }));

  return <main className="min-h-screen bg-[#f2efe8] px-5 py-10 text-[#151515] sm:px-8 lg:px-12"><button type="button" onClick={() => navigate('/admin/dashboard')} className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-[#a98232]"><ArrowLeftIcon className="h-4 w-4" />Dashboard</button><div className="mx-auto mt-8 max-w-6xl"><p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#a98232]">Admin CMS</p><h1 className="mt-3 font-display text-4xl">Website Content</h1><p className="mt-3 text-sm text-[#6f695f]">Manage public website sections with structured fields.</p><div className="mt-8 space-y-6"><section className="border border-[#d8d0c2] bg-[#f7f5f0] p-4 sm:p-6"><h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#a98232]">Home Hero</h2><div className="mt-5 grid gap-5 md:grid-cols-2"><label><span className={labelClass}>Eyebrow</span><input value={form.heroContent.eyebrow} onChange={(event) => updateHero('eyebrow', event.target.value)} className={inputClass} /></label><label><span className={labelClass}>Heading Line 1</span><input value={form.heroContent.headingLines[0] ?? ''} onChange={(event) => setForm((current) => ({ ...current, heroContent: { ...current.heroContent, headingLines: [event.target.value, current.heroContent.headingLines[1] ?? ''] } }))} className={inputClass} /></label><label><span className={labelClass}>Heading Line 2</span><input value={form.heroContent.headingLines[1] ?? ''} onChange={(event) => setForm((current) => ({ ...current, heroContent: { ...current.heroContent, headingLines: [current.heroContent.headingLines[0] ?? '', event.target.value] } }))} className={inputClass} /></label><label className="md:col-span-2"><span className={labelClass}>Supporting Text</span><textarea value={form.heroContent.supporting} onChange={(event) => updateHero('supporting', event.target.value)} className={areaClass} /></label></div></section><section className="border border-[#d8d0c2] bg-[#f7f5f0] p-4 sm:p-6"><h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#a98232]">About Section</h2><div className="mt-5 grid gap-5 md:grid-cols-2"><label><span className={labelClass}>Eyebrow</span><input value={form.aboutContent.eyebrow} onChange={(event) => updateAbout('eyebrow', event.target.value)} className={inputClass} /></label><label><span className={labelClass}>Heading</span><input value={form.aboutContent.headingLines.join(' ')} onChange={(event) => setForm((current) => ({ ...current, aboutContent: { ...current.aboutContent, headingLines: [event.target.value] } }))} className={inputClass} /></label><label className="md:col-span-2"><span className={labelClass}>Description</span><textarea value={form.aboutContent.body} onChange={(event) => updateAbout('body', event.target.value)} className={areaClass} /></label></div></section><PairManager title="About Pillars" value={form.aboutContent.pillars} onChange={(pillars) => setForm((current) => ({ ...current, aboutContent: { ...current.aboutContent, pillars } }))} /><PairManager title="Hero Stats" value={form.heroStats} onChange={(heroStats) => setForm((current) => ({ ...current, heroStats }))} /><PairManager title="Why Chauhan" value={form.whyChauhan} onChange={(whyChauhan) => setForm((current) => ({ ...current, whyChauhan }))} /><PairManager title="Gurgaon Corridors" value={form.gurgaonCorridors} onChange={(gurgaonCorridors) => setForm((current) => ({ ...current, gurgaonCorridors }))} /><section className="border border-[#d8d0c2] bg-[#f7f5f0] p-4 sm:p-6"><h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#a98232]">Founder Section</h2><div className="mt-5 space-y-5"><label><span className={labelClass}>Eyebrow</span><input value={form.founderContent.eyebrow} onChange={(event) => setForm((current) => ({ ...current, founderContent: { ...current.founderContent, eyebrow: event.target.value } }))} className={inputClass} /></label><label><span className={labelClass}>Statement</span><textarea value={form.founderContent.statement} onChange={(event) => setForm((current) => ({ ...current, founderContent: { ...current.founderContent, statement: event.target.value } }))} className={areaClass} /></label></div></section></div><div className="mt-7 flex justify-end"><button type="button" onClick={save} disabled={saving} className="inline-flex h-12 items-center gap-2 bg-[#c9a227] px-6 text-[0.68rem] font-semibold uppercase tracking-[0.16em] disabled:opacity-60"><SaveIcon className="h-4 w-4" />{saving ? 'Saving...' : 'Save Content'}</button></div>{status ? <p role="status" className="mt-4 text-sm text-[#6f695f]">{status}</p> : null}</div></main>;
}
