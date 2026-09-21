import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, Building2Icon, ClipboardCheckIcon, CompassIcon, HandCoinsIcon, HomeIcon, MapPinIcon, PanelsTopLeftIcon, SearchCheckIcon, StoreIcon } from 'lucide-react';

export const services = [
  ['Property Buying Assistance', 'A considered shortlist shaped around your requirement.', SearchCheckIcon],
  ['Property Selling Assistance', 'Clear positioning and support through the selling process.', HandCoinsIcon],
  ['Investment Advisory', 'Context for comparing opportunity, suitability and timing.', CompassIcon],
  ['Residential Properties', 'Guidance across selected Gurgaon residential addresses.', HomeIcon],
  ['Commercial Properties', 'Support for evaluating commercial opportunities and use cases.', StoreIcon],
  ['Luxury Properties', 'A discreet approach to premium homes and developments.', Building2Icon],
  ['Land & Plot Assistance', 'Help understanding location, fit and available information.', MapPinIcon],
  ['Site Visit Assistance', 'End-to-end coordination for useful on-ground visits.', ClipboardCheckIcon],
  ['Property Shortlisting', 'Less noise, clearer comparisons and relevant options.', PanelsTopLeftIcon]
] as const;

export function ServicesSection() {
  const primaryServices = services.slice(0, 3);
  const primaryCarousel = useCarousel(primaryServices.length);

  return (
    <section id="services" className="overflow-hidden bg-white py-20 text-[#071a3d] sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f4b400]"><span>What We Do</span><span className="h-px w-16 bg-[#f4b400]" aria-hidden="true" /></div>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">Guidance for the decisions that matter.</h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#64748b] lg:mb-1">Personal assistance from first conversation to a clear property decision.</p>
        </div>

        <ServiceRail
          label="Featured services"
          items={primaryServices}
          carousel={primaryCarousel}
          cardClassName="basis-[calc(100%-1rem)] sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]"
          featured />

      </div>
    </section>
  );
}

type Service = (typeof services)[number];

function useCarousel(itemCount: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(itemCount > 1);

  const updateState = () => {
    const carousel = ref.current;
    if (!carousel) return;
    setCanScrollLeft(carousel.scrollLeft > 4);
    setCanScrollRight(carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 4);
    const card = carousel.querySelector<HTMLElement>('[data-service-card]');
    const step = (card?.offsetWidth || carousel.clientWidth) + (Number.parseFloat(getComputedStyle(carousel).columnGap) || 0);
    setActivePage(step ? Math.round(carousel.scrollLeft / step) : 0);
  };

  useEffect(() => {
    const carousel = ref.current;
    if (!carousel) return;
    updateState();
    carousel.addEventListener('scroll', updateState, { passive: true });
    window.addEventListener('resize', updateState);
    return () => {
      carousel.removeEventListener('scroll', updateState);
      window.removeEventListener('resize', updateState);
    };
  }, []);

  const move = (direction: number) => {
    const carousel = ref.current;
    if (!carousel) return;
    const card = carousel.querySelector<HTMLElement>('[data-service-card]');
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0;
    carousel.scrollBy({ left: direction * ((card?.offsetWidth || carousel.clientWidth) + gap), behavior: 'smooth' });
  };

  const goTo = (page: number) => {
    const carousel = ref.current;
    const card = carousel?.querySelector<HTMLElement>('[data-service-card]');
    if (!carousel || !card) return;
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0;
    carousel.scrollTo({ left: page * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  return { ref, activePage, canScrollLeft, canScrollRight, move, goTo, pages: Array.from({ length: Math.max(1, itemCount) }, (_, index) => index) };
}

function ServiceRail({ label, items, carousel, cardClassName, featured = false }: { label: string; items: Service[]; carousel: ReturnType<typeof useCarousel>; cardClassName: string; featured?: boolean }) {
  return <div className={`${featured ? 'mt-12' : 'mt-8'} relative`}>
    <div className="mb-4"><h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#64748b]">{label}</h3></div>
    <div className="relative">
      <button type="button" onClick={() => carousel.move(-1)} disabled={!carousel.canScrollLeft} aria-label={`Previous ${label.toLowerCase()}`} className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#071a3d] shadow-[0_4px_16px_rgba(7,26,61,0.08)] transition hover:scale-105 hover:border-[#f4b400] disabled:pointer-events-none disabled:opacity-0 lg:flex"><ArrowLeftIcon className="h-5 w-5" aria-hidden="true" /></button>
      <div ref={carousel.ref} className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6">
        {items.map(([title, text, Icon], index) => <ServiceCard key={title} title={title} text={text} Icon={Icon} index={index} featured={featured} className={cardClassName} />)}
      </div>
      <button type="button" onClick={() => carousel.move(1)} disabled={!carousel.canScrollRight} aria-label={`Next ${label.toLowerCase()}`} className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#071a3d] shadow-[0_4px_16px_rgba(7,26,61,0.08)] transition hover:scale-105 hover:border-[#f4b400] disabled:pointer-events-none disabled:opacity-0 lg:flex"><ArrowRightIcon className="h-5 w-5" aria-hidden="true" /></button>
    </div>
    {items.length > 1 && <div className="mt-4 flex justify-center gap-2 lg:hidden">{carousel.pages.map((page) => <button key={page} type="button" onClick={() => carousel.goTo(page)} aria-label={`Go to ${label.toLowerCase()} page ${page + 1}`} className={`h-2 w-2 rounded-full transition-colors ${page === carousel.activePage ? 'bg-[#f4b400]' : 'bg-[#dbe2ea]'}`} />)}</div>}
    <div className="mt-3 flex justify-center gap-2 lg:hidden"><CarouselButton direction="left" onClick={() => carousel.move(-1)} disabled={!carousel.canScrollLeft} /><CarouselButton direction="right" onClick={() => carousel.move(1)} disabled={!carousel.canScrollRight} /></div>
  </div>;
}

function CarouselButton({ direction, onClick, disabled }: { direction: 'left' | 'right'; onClick: () => void; disabled: boolean }) {
  const Icon = direction === 'left' ? ArrowLeftIcon : ArrowRightIcon;
  return <button type="button" onClick={onClick} disabled={disabled} aria-label={`${direction === 'left' ? 'Previous' : 'Next'} services`} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#071a3d] transition hover:border-[#f4b400] hover:shadow-sm disabled:pointer-events-none disabled:opacity-35"><Icon className="h-4 w-4" aria-hidden="true" /></button>;
}

function ServiceCard({ title, text, Icon, index, featured, className }: { title: string; text: string; Icon: Service[2]; index: number; featured: boolean; className: string }) {
  return <article data-service-card className={`group flex shrink-0 snap-start flex-col rounded-[16px] border border-[#e5e7eb] bg-white p-7 shadow-[0_4px_16px_rgba(7,26,61,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_26px_rgba(7,26,61,0.1)] ${featured ? `min-h-[340px] ${className} sm:p-8` : `min-h-[170px] ${className} p-5 sm:p-6`}`}>
    <div className="flex items-start justify-between"><span className={`flex items-center justify-center rounded-xl bg-[#fff5d6] text-[#071a3d] transition-transform duration-300 group-hover:scale-105 ${featured ? 'h-14 w-14' : 'h-10 w-10'}`}><Icon className={featured ? 'h-7 w-7' : 'h-5 w-5'} strokeWidth={1.6} aria-hidden="true" /></span>{featured && <span className="border-b border-[#f4b400]/40 pb-2 text-sm font-medium text-[#f4b400]">{String(index + 1).padStart(2, '0')}</span>}</div>
    <h4 className={`font-display font-semibold leading-tight text-[#071a3d] ${featured ? 'mt-7 max-w-[15rem] text-2xl uppercase sm:text-[1.7rem]' : 'mt-4 text-base uppercase'}`}>{title}</h4>
    <p className={`leading-relaxed text-[#64748b] ${featured ? 'mt-4 text-sm' : 'mt-2 text-xs'}`}>{text}</p>
    {!featured && <ArrowUpRightIcon className="mt-auto pt-4 h-6 w-6 text-[#f4b400]" aria-hidden="true" />}
  </article>;
}
