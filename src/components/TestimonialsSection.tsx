import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, StarIcon } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { Reveal } from './Reveal';

interface TestimonialsSectionProps {
  fullPage?: boolean;
}

export function TestimonialsSection({ fullPage = false }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="bg-[#f8f7f3] py-20 text-[#111111] sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-8 border-b border-[#e5e1d8] pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#d4af37]">Client Experiences</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">What Our Clients Say</h2>
            <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-[#4a4a4a]">Real stories. Genuine experiences. Trusted guidance.</p>
          </div>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center lg:items-end">
            <ReviewSummary />
            {!fullPage && <Link to="/reviews" className="group inline-flex items-center gap-2 border border-[#c9a227] px-5 py-3 text-[0.66rem] uppercase tracking-[0.2em] text-[#c9a227] transition-colors duration-200 hover:bg-[#c9a227] hover:text-[#111111]">View All Reviews <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>}
          </div>
        </div>

        <div className="mt-10 grid gap-px border border-[#e5e1d8] bg-[#e5e1d8] md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, index) => <Reveal key={item.id} delay={(index % 3) * 0.05}><TestimonialCard item={item} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function ReviewSummary() {
  return <div className="flex items-center gap-3 text-sm text-[#4a4a4a]"><span className="flex gap-0.5 text-[#c9a227]" aria-label="5 out of 5 stars">{[1, 2, 3, 4, 5].map((star) => <StarIcon key={star} className="h-4 w-4 fill-current" aria-hidden="true" />)}</span><span>5.0 · Based on {testimonials.length} client reviews</span></div>;
}

function TestimonialCard({ item }: { item: (typeof testimonials)[number] }) {
  return <article className="flex h-full flex-col bg-white p-7 sm:p-9"><span className="font-display text-5xl leading-none text-[#c9a227]/80" aria-hidden="true">“</span><div className="mt-3 flex gap-0.5 text-[#c9a227]" aria-label={`${item.rating} out of 5 stars`}>{[1, 2, 3, 4, 5].map((star) => <StarIcon key={star} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />)}</div><p className="mt-6 flex-1 text-[0.95rem] leading-relaxed text-[#4a4a4a]">{item.review}</p><div className="mt-8 border-t border-[#e5e1d8] pt-5"><span className="block h-px w-10 bg-[#c9a227]" /><strong className="mt-4 block text-[0.78rem] font-medium uppercase tracking-[0.16em] text-[#111111]">{item.name}</strong><span className="mt-2 block text-[0.62rem] uppercase tracking-[0.18em] text-[#777777]">{[item.clientType, item.location].filter(Boolean).join(' · ')}</span></div></article>;
}
