import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { Reveal } from './Reveal';

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];
  const move = (direction: number) => setActive((value) => (value + direction + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="bg-white py-20 text-[#111111] sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-8 border-b border-[#e7e3d8] pb-10 lg:flex-row lg:items-end">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#c9a227]">Trust Signals</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl">From Our Clients, In Their Words.</h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#666666]"><span className="flex gap-0.5 text-[#c9a227]" aria-label="5 out of 5 stars">{[1, 2, 3, 4, 5].map((star) => <StarIcon key={star} className="h-4 w-4 fill-current" aria-hidden="true" />)}</span> 5.0 · Client Reviews</div>
        </div>
        <div className="mt-10 lg:hidden">
          <TestimonialCard item={current} />
          <div className="mt-6 flex justify-end gap-2"><ArrowButton label="Previous testimonial" onClick={() => move(-1)}><ChevronLeftIcon /></ArrowButton><ArrowButton label="Next testimonial" onClick={() => move(1)}><ChevronRightIcon /></ArrowButton></div>
        </div>
        <div className="mt-10 hidden gap-px border border-[#e7e3d8] bg-[#e7e3d8] lg:grid lg:grid-cols-3">
          {testimonials.slice(0, 3).map((item, index) => <Reveal key={item.id} delay={index * 0.06}><TestimonialCard item={item} /></Reveal>)}
        </div>
        <p className="mt-8 text-xs text-[#777777]">Client stories are published only after the client has shared their words and consented to publication.</p>
      </div>
    </section>
  );
}

function TestimonialCard({ item }: { item: (typeof testimonials)[number] }) {
  return <article className="h-full bg-white p-7 sm:p-9"><div className="flex gap-0.5 text-[#c9a227]">{[1, 2, 3, 4, 5].map((star) => <StarIcon key={star} className="h-4 w-4 fill-current" aria-hidden="true" />)}</div><p className="mt-8 font-display text-2xl font-light leading-snug text-[#222222]">“{item.review}”</p><div className="mt-8 border-t border-[#e7e3d8] pt-5 text-xs uppercase tracking-[0.12em] text-[#666666]"><strong className="block font-medium text-[#111111]">{item.name}</strong><span className="mt-2 block">{item.clientType} · {item.location}</span></div></article>;
}

function ArrowButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-label={label} onClick={onClick} className="flex h-10 w-10 items-center justify-center border border-[#c9a227] text-[#c9a227] transition-colors hover:bg-[#c9a227] hover:text-white">{React.cloneElement(children as React.ReactElement<{ className?: string }>, { className: 'h-4 w-4' })}</button>;
}
