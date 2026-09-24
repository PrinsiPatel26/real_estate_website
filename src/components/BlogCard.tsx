import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { blogs as fallbackBlogs, type BlogArticle } from '../data/blogs';

function fallbackImageFor(article: BlogArticle) {
  return fallbackBlogs.find((fallback) => fallback.slug === article.slug)?.image || fallbackBlogs[0].image;
}

export function BlogCard({ article, className = '' }: { article: BlogArticle; className?: string }) {
  return <article className={`group flex h-full flex-col border border-black/12 bg-[#f7f5f0] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a227]/60 hover:shadow-[0_16px_34px_rgba(17,17,17,0.1)] ${className}`}><Link to={`/blog/${article.slug}`} className="block overflow-hidden"><img src={article.image} alt={article.title} loading="lazy" onError={(event) => { const fallback = fallbackImageFor(article); if (event.currentTarget.src !== new URL(fallback, window.location.origin).href) event.currentTarget.src = fallback; }} className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></Link><div className="flex flex-1 flex-col p-5 sm:p-6"><p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[#c9a227]">{article.category}</p><p className="mt-1.5 text-[0.66rem] uppercase tracking-[0.1em] text-[#78736a]">{article.date} <span className="px-1 text-[#c9a227]">|</span> {article.readTime}</p><h2 className="mt-4 font-display text-[1.3rem] font-medium leading-[1.16] text-[#151515] sm:text-[1.45rem]"><Link to={`/blog/${article.slug}`} className="transition-colors hover:text-[#c9a227]">{article.title}</Link></h2><p className="mt-3 text-[0.86rem] leading-relaxed text-[#4e4b45]">{article.excerpt}</p><Link to={`/blog/${article.slug}`} className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[#151515] transition-colors hover:text-[#c9a227]"><span>Read Article</span><ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" /></Link></div></article>;
}
