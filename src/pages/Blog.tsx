import React, { useState } from 'react';
import { useSeo } from '../hooks/useSeo';
import { blogs } from '../data/blogs';
import { BlogCard } from '../components/BlogCard';
import { PageHeader } from '../components/PageHeader';

const categories = ['All', 'Property Guide', 'Gurgaon', 'Investment', 'Home Buying', 'Market Insights', 'Legal & Documentation'];

export function Blog() {
  const [category, setCategory] = useState('All');
  useSeo({ title: 'Real Estate Insights | Chauhan Realtors', description: 'Market perspectives, property guidance and practical insights for smarter real estate decisions.' });
  const filtered = category === 'All' ? blogs : blogs.filter((article) => article.category === category);
  return <><PageHeader eyebrow="Property Journal" title="Real Estate Insights" intro="Market perspectives, property guidance and practical insights for smarter real estate decisions." crumbs={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} /><main className="bg-white py-16 text-[#111111] sm:py-24"><div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10"><div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`border px-4 py-2 text-xs transition-colors ${category === item ? 'border-[#c9a227] bg-[#c9a227] text-white' : 'border-[#e7e3d8] text-[#666666] hover:border-[#c9a227] hover:text-[#111111]'}`}>{item}</button>)}</div><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.map((article) => <BlogCard key={article.slug} article={article} />)}</div></div></main></>;
}
