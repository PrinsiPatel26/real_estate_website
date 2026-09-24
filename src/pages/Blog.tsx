import React, { useState } from 'react';
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { blogs as fallbackBlogs } from '../data/blogs';
import { useCmsData } from '../cms/CmsDataContext';
import { BlogCard } from '../components/BlogCard';
import { Reveal } from '../components/Reveal';

export function Blog() {
  const { blogs } = useCmsData();
  const [category, setCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(blogs.map((article) => article.category).filter(Boolean)))];

  useSeo({ title: 'Real Estate Insights | Chauhan Realtors', description: 'Market perspectives, property guidance and practical insights for smarter real estate decisions.' });
  const filtered = category === 'All' ? blogs : blogs.filter((article) => article.category === category);
  const featured = filtered.find((article) => article.isFeatured) || filtered[0];
  const remaining = filtered.filter((article) => article !== featured);


  return <>
    <section className="relative flex min-h-[48svh] items-end overflow-hidden bg-[#0b0b0b] pb-14 pt-32 text-white sm:pb-20 lg:min-h-[52svh] lg:pb-24">
      <img src={blogs[0]?.image || fallbackBlogs[0].image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9),rgba(0,0,0,0.52)_65%,rgba(0,0,0,0.75))]" aria-hidden="true" />
      <div className="relative mx-auto w-[calc(100%-2rem)] max-w-[1280px] sm:w-[calc(100%-5rem)]">
        <p className="eyebrow text-[#d4af37]">Real Estate Insights</p>
        <span className="mt-5 block h-px w-16 bg-[#d4af37]" aria-hidden="true" />
        <h1 className="mt-7 max-w-4xl font-display text-[3rem] font-medium leading-[1.05] tracking-[-0.03em] !text-white sm:text-[4.5rem] lg:text-[5.5rem]">Real Estate Insights</h1>
        <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-white/75 sm:text-[1.12rem]">Market perspectives, property guidance and practical insights for smarter real estate decisions.</p>
      </div>
    </section>

    <main className="bg-[#f2efe8] py-12 text-[#151515] sm:py-20 lg:py-24">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[1280px] sm:w-[calc(100%-5rem)]">
        <nav aria-label="Blog categories" className="-mx-1 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-2 px-1">
            {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`border px-4 py-3 text-[0.7rem] font-medium uppercase tracking-[0.12em] whitespace-nowrap transition-colors ${category === item ? 'border-[#c9a227] bg-[#c9a227] text-white' : 'border-[#b48c32]/30 bg-[#f7f5f0] text-[#4e4b45] hover:border-[#c9a227] hover:text-[#151515]'}`}>{item}</button>)}
          </div>
        </nav>

        {featured ? <Reveal>
          <article className="mt-12 grid overflow-hidden border border-[#b48c32]/25 bg-[#f7f5f0] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <Link to={`/blog/${featured.slug}`} className="group block overflow-hidden"><img src={featured.image} alt={featured.title} className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></Link>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#c9a227]">{featured.category}</p>
              <h2 className="mt-5 font-display text-[2rem] font-medium leading-[1.12] text-[#151515] sm:text-[2.7rem]"><Link to={`/blog/${featured.slug}`} className="transition-colors hover:text-[#c9a227]">{featured.title}</Link></h2>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-[#4e4b45]">{featured.excerpt}</p>
              <p className="mt-6 text-[0.72rem] uppercase tracking-[0.12em] text-[#78736a]">{featured.date} <span className="px-2 text-[#c9a227]">|</span> {featured.readTime}</p>
              <Link to={`/blog/${featured.slug}`} className="mt-8 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#c9a227]">Read Article <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </article>
        </Reveal> : null}

        {remaining.length > 0 ? <section aria-labelledby="latest-insights-heading" className="mt-16 sm:mt-20">
          <div className="flex items-end justify-between gap-5 border-b border-[#b48c32]/25 pb-6">
            <div>
              <p className="eyebrow text-[#c9a227]">The Journal</p>
              <h2 id="latest-insights-heading" className="mt-4 font-display text-[2.4rem] font-medium leading-tight text-[#151515] sm:text-[3.5rem]">Latest Insights</h2>
            </div>
            <span className="hidden text-[0.7rem] uppercase tracking-[0.16em] text-[#78736a] sm:block">{remaining.length} articles</span>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {remaining.map((article) => (
                  <div key={article.slug} data-blog-card className="min-w-0">
                    <BlogCard article={article} className="h-full w-full" />
                  </div>
                ))}
            </div>
          </div>
        </section> : null}
      </div>
    </main>

    <section className="bg-[#0b0b0b] py-16 text-white sm:py-20 lg:py-24"><div className="mx-auto flex w-[calc(100%-2rem)] max-w-[1280px] flex-col justify-between gap-8 sm:w-[calc(100%-5rem)] lg:flex-row lg:items-end"><div><p className="eyebrow text-[#d4af37]">A clearer next step</p><h2 className="mt-5 max-w-3xl font-display text-[2.3rem] font-medium leading-[1.08] !text-white sm:text-[3.5rem]">Make your next property decision with clarity.</h2></div><Link to="/contact" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-[#c9a227] px-6 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#111111] transition-colors hover:bg-[#d8b968]">Talk to Chauhan Realtors <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></div></section>
  </>;
}
