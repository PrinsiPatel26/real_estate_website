import React from 'react';
import { PhoneIcon } from 'lucide-react';
import { brand, callLink } from '../data/brand';
import { founderContent } from '../data/site';
import { Reveal, GoldLine } from './Reveal';

export function FounderSection() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="border-y border-[#e8e6e0] bg-[#f8f8f6] py-20 text-[#111111] sm:py-28 lg:py-32">
      
      <div className="mx-auto max-w-shell px-5 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <Reveal>
              <p className="eyebrow text-[#c9a227]">{founderContent.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <GoldLine className="mt-5" width="3.5rem" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="founder-heading"
                className="mt-6 font-display text-[2rem] font-light leading-tight text-[#111111] sm:text-[2.6rem]">
                
                {brand.founder.name}
              </h2>
              <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a227]">
                {brand.founder.role}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <blockquote className="relative mt-9 pl-10">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 font-display text-[4.5rem] leading-[0.7] text-[#c9a227]/35">
                  
                  &ldquo;
                </span>
                <p className="font-display text-2xl font-light italic leading-snug text-[#111111] sm:text-[1.9rem]">
                  {founderContent.quote.map((line) =>
                  <span key={line} className="block">
                      {line}
                    </span>
                  )}
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-[0.9rem] leading-relaxed text-[#666666]">
                {founderContent.statement}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={callLink(brand.founder.phone)}
                  className="flex h-12 items-center justify-center gap-2 border border-[#c9a227] px-6 text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a227] transition-colors duration-150 ease-lux hover:bg-[#c9a227] hover:text-[#111111]">
                  
                  <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                  Speak with the founder
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal direction="right" className="order-1 lg:order-2">
            <figure>
              <div className="rounded-sm border border-[#e8e6e0] bg-white p-2.5 sm:p-3.5">
                <img
                  src={brand.founder.photo}
                  alt={`${brand.founder.name}, Founder of Chauhan Realtors, seated at his office desk`}
                  loading="lazy"
                  className="aspect-[3/2] w-full rounded-sm object-cover" />
                
              </div>
              <figcaption className="mt-4 text-center text-[0.62rem] uppercase tracking-[0.2em] text-[#666666]">
                {brand.founder.name} · {brand.founder.designation}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>);

}