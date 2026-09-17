import React from 'react';
import { PhoneIcon } from 'lucide-react';
import { brand, whatsappLink, callLink } from '../data/brand';
import { founderContent } from '../data/site';
import { Reveal, GoldLine } from './Reveal';
import { WhatsAppIcon } from './WhatsAppIcon';

export function FounderSection() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="border-y border-black/10 bg-[#fafaf8] py-20 text-ink-900 sm:py-28 lg:py-32">
      
      <div className="mx-auto max-w-shell px-5 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <Reveal>
              <p className="eyebrow text-gold">{founderContent.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <GoldLine className="mt-5" width="3.5rem" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="founder-heading"
                className="mt-6 font-display text-[2rem] font-light leading-tight text-paper sm:text-[2.6rem]">
                
                {brand.founder.name}
              </h2>
              <p className="mt-2 text-[0.68rem] uppercase tracking-micro text-gold-bright">
                {brand.founder.role}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <blockquote className="relative mt-9 pl-10">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 font-display text-[4.5rem] leading-[0.7] text-gold/35">
                  
                  &ldquo;
                </span>
                <p className="font-display text-2xl font-light italic leading-snug text-paper sm:text-[1.9rem]">
                  {founderContent.quote.map((line) =>
                  <span key={line} className="block">
                      {line}
                    </span>
                  )}
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-[0.9rem] leading-relaxed text-paper/60">
                {founderContent.statement}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={callLink(brand.founder.phone)}
                  className="flex h-12 items-center justify-center gap-2 border border-gold px-6 text-[0.68rem] uppercase tracking-micro text-gold transition-colors duration-150 ease-lux hover:bg-gold hover:text-ink-900">
                  
                  <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                  Speak with the founder
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 items-center justify-center gap-2 border border-paper/20 px-6 text-[0.68rem] uppercase tracking-micro text-paper/85 transition-colors duration-150 ease-lux hover:border-gold hover:text-gold-bright">
                  
                  <WhatsAppIcon className="h-4 w-4 object-contain" />
                  WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal direction="right" className="order-1 lg:order-2">
            <figure>
              <div className="rounded-sm border border-gold/30 p-2.5 sm:p-3.5">
                <img
                  src={brand.founder.photo}
                  alt={`${brand.founder.name}, Founder of Chauhan Realtors, seated at his office desk`}
                  loading="lazy"
                  className="aspect-[3/2] w-full rounded-sm object-cover" />
                
              </div>
              <figcaption className="mt-4 text-center text-[0.62rem] uppercase tracking-micro text-paper/40">
                {brand.founder.name} · {brand.founder.designation}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>);

}