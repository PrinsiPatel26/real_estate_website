import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { BlogCard } from './BlogCard';

export function BlogSection() {
  return <section id="insights" className="bg-[#fafaf8] py-20 text-[#111111] sm:py-28 lg:py-32"><div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10"><div className="flex items-end justify-between gap-6 border-b border-[#e7e3d8] pb-10"><div><p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#c9a227]">Property Journal</p><h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">Ideas for better decisions.</h2></div><Link to="/blog" className="hidden text-[0.68rem] uppercase tracking-[0.16em] text-[#111111] hover:text-[#c9a227] sm:block">View all insights</Link></div><div className="mt-10 grid gap-6 md:grid-cols-3">{blogs.slice(0, 3).map((article) => <BlogCard key={article.slug} article={article} />)}</div><Link to="/blog" className="mt-8 inline-block text-[0.68rem] uppercase tracking-[0.16em] text-[#111111] hover:text-[#c9a227] sm:hidden">View all insights</Link></div></section>;
}
