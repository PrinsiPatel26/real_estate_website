import React from 'react';
import { whyChauhans } from '../data/site';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

export function WhyChooseUs() {
  return (
    <section
      id="why-chauhans"
      aria-labelledby="why-heading"
      className="bg-ink-800 py-20 sm:py-28 lg:py-32">
      
      <div className="mx-auto max-w-shell px-5 lg:px-10">
        <SectionHeading
          id="why-heading"
          eyebrow="Why Chauhans Realtors"
          lines={['Why Choose', 'Chauhans Realtors?']}>
          
          <p>
            We work with a small number of projects at a time so that every recommendation is
            informed, every claim is checked and every buyer is looked after personally.
          </p>
        </SectionHeading>

        <ol className="mt-14 grid gap-px border border-gold/10 bg-gold/10 sm:grid-cols-2 lg:grid-cols-3">
          {whyChauhans.map((item, index) =>
          <Reveal
            as="li"
            key={item.number}
            delay={index * 0.04}
            className="group bg-ink-800 p-7 transition-colors duration-200 ease-lux hover:bg-ink-700 sm:p-9">
            
              <span className="font-display text-[2.4rem] font-light leading-none text-gold/45 transition-colors duration-200 ease-lux group-hover:text-gold">
                {item.number}
              </span>
              <h3 className="mt-6 text-[0.7rem] uppercase tracking-micro text-paper">{item.title}</h3>
              <span
              aria-hidden="true"
              className="mt-4 block h-px w-8 bg-gold/40 transition-all duration-200 ease-lux group-hover:w-14 group-hover:bg-gold" />
            
              <p className="mt-4 text-[0.85rem] leading-relaxed text-paper/55">{item.text}</p>
            </Reveal>
          )}
        </ol>
      </div>
    </section>);

}