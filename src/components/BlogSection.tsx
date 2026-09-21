import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { blogs } from '../data/blogs';
import { BlogCard } from './BlogCard';

export function BlogSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(blogs.length > 1);

  const updateScrollState = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    setCanScrollLeft(carousel.scrollLeft > 4);
    setCanScrollRight(carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 4);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    updateScrollState();
    carousel.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      carousel.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const moveCarousel = (direction: number) => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector<HTMLElement>('article');
    if (!carousel || !card) return;
    const gap = Number.parseFloat(getComputedStyle(card.parentElement as HTMLElement).gap) || 0;
    carousel.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  return <section id="insights" className="bg-[#fafaf8] py-20 text-[#111111] sm:py-28 lg:py-32"><div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10"><div className="flex items-end justify-between gap-6 border-b border-[#e7e3d8] pb-10"><div><p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#c9a227]">Property Journal</p><h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">Ideas for better decisions.</h2></div><Link to="/blog" className="hidden text-[0.68rem] uppercase tracking-[0.16em] text-[#111111] hover:text-[#c9a227] sm:block">View all insights</Link></div><div className="relative mt-10"><button type="button" onClick={() => moveCarousel(-1)} disabled={!canScrollLeft} aria-label="Previous insight" className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4af37]/60 bg-[#0a0a0a] text-[#d8b968] shadow-[0_4px_14px_rgba(0,0,0,0.16)] transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-[#111111] disabled:pointer-events-none disabled:opacity-35 md:flex"><ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /></button><div ref={carouselRef} className="blog-carousel-viewport mx-0 flex items-stretch gap-5 overflow-x-auto px-0 pb-2 scroll-smooth md:mx-8">{blogs.map((article) => <BlogCard key={article.slug} article={article} className="!h-[460px] basis-full shrink-0 snap-start md:basis-[calc(50%_-_0.625rem)] md:min-w-0 md:max-w-none lg:basis-[calc(25%_-_0.9375rem)]" />)}</div><button type="button" onClick={() => moveCarousel(1)} disabled={!canScrollRight} aria-label="Next insight" className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4af37]/60 bg-[#0a0a0a] text-[#d8b968] shadow-[0_4px_14px_rgba(0,0,0,0.16)] transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-[#111111] disabled:pointer-events-none disabled:opacity-35 md:flex"><ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></button><div className="mt-3 flex justify-center gap-3 md:hidden"><button type="button" onClick={() => moveCarousel(-1)} disabled={!canScrollLeft} aria-label="Previous insight" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/60 bg-[#0a0a0a] text-[#d8b968] transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-[#111111] disabled:opacity-35"><ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /></button><button type="button" onClick={() => moveCarousel(1)} disabled={!canScrollRight} aria-label="Next insight" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/60 bg-[#0a0a0a] text-[#d8b968] transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-[#111111] disabled:opacity-35"><ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></button></div></div><Link to="/blog" className="mt-8 inline-block text-[0.68rem] uppercase tracking-[0.16em] text-[#111111] hover:text-[#c9a227] sm:hidden">View all insights</Link></div></section>;
}
