import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import type { BlogArticle } from '../data/blogs';

export function BlogCard({ article }: { article: BlogArticle }) {
  return <article className="group border border-[#e7e3d8] bg-white"><Link to={`/blog/${article.slug}`} className="block overflow-hidden"><img src={article.image} alt={article.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" /></Link><div className="p-6"><p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#c9a227]">{article.category} · {article.date}</p><h2 className="mt-4 font-display text-2xl font-light leading-tight"><Link to={`/blog/${article.slug}`}>{article.title}</Link></h2><p className="mt-3 text-sm leading-relaxed text-[#666666]">{article.excerpt}</p><Link to={`/blog/${article.slug}`} className="mt-6 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-[#111111] transition-colors hover:text-[#c9a227]">Read Article <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" /></Link></div></article>;
}
