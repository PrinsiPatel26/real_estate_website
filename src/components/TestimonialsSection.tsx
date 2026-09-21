import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from 'lucide-react';
import { testimonials } from '../data/testimonials';

interface TestimonialsSectionProps {
  fullPage?: boolean;
}

export function TestimonialsSection({ fullPage = false }: TestimonialsSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(testimonials.length > 1);

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
    if (!carousel) return;

    const card = carousel.querySelector<HTMLElement>('[data-testimonial-card]');
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0;
    carousel.scrollBy({ left: direction * ((card?.offsetWidth || carousel.clientWidth) + gap), behavior: 'smooth' });
  };

  return (
    <section id="testimonials" className="overflow-hidden bg-[#f5f3ee] py-20 text-[#111827] sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-[#f4b400]">Client Experiences</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">What Our Clients Say</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-[#6b7280]">Real stories. Genuine experiences. Trusted guidance.</p>
        </div>

        <div className="relative mt-10 sm:mt-12">
          <button type="button" onClick={() => moveCarousel(-1)} disabled={!canScrollLeft} aria-label="Previous testimonials" className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#111827] shadow-[0_3px_12px_rgba(0,0,0,0.06)] transition hover:scale-105 hover:shadow-[0_5px_16px_rgba(0,0,0,0.1)] disabled:pointer-events-none disabled:opacity-0 md:flex">
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          <div ref={carouselRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6">
            {testimonials.map((item) => <TestimonialCard key={item.id} item={item} />)}
          </div>
          <button type="button" onClick={() => moveCarousel(1)} disabled={!canScrollRight} aria-label="Next testimonials" className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#111827] shadow-[0_3px_12px_rgba(0,0,0,0.06)] transition hover:scale-105 hover:shadow-[0_5px_16px_rgba(0,0,0,0.1)] disabled:pointer-events-none disabled:opacity-0 md:flex">
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-2 flex justify-center gap-3 md:hidden">
          <button type="button" onClick={() => moveCarousel(-1)} disabled={!canScrollLeft} aria-label="Previous testimonials" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#111827] shadow-[0_3px_12px_rgba(0,0,0,0.06)] transition disabled:opacity-35"><ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /></button>
          <button type="button" onClick={() => moveCarousel(1)} disabled={!canScrollRight} aria-label="Next testimonials" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#111827] shadow-[0_3px_12px_rgba(0,0,0,0.06)] transition disabled:opacity-35"><ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item }: { item: (typeof testimonials)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const initials = item.name.split(' ').map((part) => part[0]).slice(0, 2).join('');
  return <article data-testimonial-card className="flex min-h-[300px] shrink-0 snap-start basis-[calc(100%-1rem)] flex-col rounded-[14px] border border-[#e5e7eb] bg-white p-6 shadow-[0_3px_14px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(0,0,0,0.09)] sm:basis-[calc(50%-0.75rem)] xl:basis-[calc(33.333%-1rem)] sm:p-7">
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff7d6] text-xs font-semibold text-[#b98200]">{initials}</span><div className="min-w-0"><strong className="block truncate text-sm font-semibold text-[#111827]">{item.name}</strong><span className="mt-0.5 block truncate text-xs text-[#6b7280]">{[item.clientType, item.location].filter(Boolean).join(' · ')}</span></div></div>
      <div className="flex shrink-0 gap-0.5 text-[#f4b400]" aria-label={`${item.rating} out of 5 stars`}>{[1, 2, 3, 4, 5].map((star) => <StarIcon key={star} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />)}</div>
    </div>
    <p className={`mt-6 flex-1 text-sm leading-[1.65] text-[#4b5563] ${expanded ? '' : 'line-clamp-5'}`}>{item.review}</p>
    <div className="mt-5 flex items-center justify-between border-t border-[#e5e7eb] pt-4"><span className="h-0.5 w-9 bg-[#f4b400]" /><div className="flex items-center gap-3"><span className="text-[0.68rem] uppercase tracking-[0.12em] text-[#9ca3af]">Client review</span><button type="button" onClick={() => setExpanded((value) => !value)} className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#b98200] transition-colors hover:text-[#111827]">{expanded ? 'Read less' : 'Read more'}</button></div></div>
  </article>;
}
