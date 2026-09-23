import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useCmsData } from '../cms/CmsDataContext';
import { useSeo } from '../hooks/useSeo';
import { PageHeader } from '../components/PageHeader';

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { blogs } = useCmsData();
  const article = blogs.find((item) => item.slug === slug);
  useSeo({ title: article ? `${article.title} | Chauhan Realtors` : 'Real Estate Insights | Chauhan Realtors', description: article?.excerpt ?? 'Real estate guidance from Chauhan Realtors.', image: article?.image });
  if (!article) return <Navigate to="/blog" replace />;
  return <><PageHeader eyebrow={article.category} title={article.title} intro={article.excerpt} image={article.image} crumbs={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: article.title }]} /><article className="bg-white py-16 text-[#111111] sm:py-24"><div className="mx-auto max-w-3xl px-5 sm:px-8"><p className="text-xs uppercase tracking-[0.16em] text-[#777777]">{article.date} · {article.readTime} · {article.author}</p><div className="mt-10 space-y-6 text-[1.05rem] leading-[1.9] text-[#555555]">{article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mt-14 border-t border-[#e7e3d8] pt-10"><p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#c9a227]">Need help finding the right property?</p><Link to="/contact" className="mt-4 inline-flex bg-[#c9a227] px-6 py-3 text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#111111]">Schedule a Visit</Link></div></div></article></>;
}
