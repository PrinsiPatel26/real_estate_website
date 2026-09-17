import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { brand } from '../data/brand';
import { aboutContent } from '../data/site';
import { SectionHeading } from './SectionHeading';
import { Reveal, GoldLine } from './Reveal';

export function AboutSection({ showLink = true }: {showLink?: boolean;}) {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-white py-20 text-[#111111] sm:py-28 lg:py-32">
      <div className="mx-auto max-w-shell px-5 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal direction="left">
            <figure>
              <div className="border border-[#e8e6e0] bg-[#f8f8f6] p-2.5 sm:p-3">
                <img
                  src={brand.founder.photo}
                  alt={`${brand.founder.name}, ${brand.founder.designation} of Chauhan Realtors, at the company office`}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-sm object-cover" />
                
              </div>
              <figcaption className="mt-5 flex items-baseline gap-4">
                <span className="block h-px w-8 shrink-0 bg-[#c9a227]" aria-hidden="true" />
                <span className="text-[0.78rem] leading-relaxed text-[#666666]">
                  <span className="block text-[#111111]">{brand.founder.name}</span>
                  {brand.founder.role}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <SectionHeading
              id="about-heading"
              eyebrow={aboutContent.eyebrow}
              lines={aboutContent.headingLines}>
              
              <p>{aboutContent.body}</p>
            </SectionHeading>

            <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {aboutContent.pillars.map((pillar, index) =>
              <Reveal as="li" key={pillar.title} delay={index * 0.04}>
                  <GoldLine width="1.75rem" />
                  <h3 className="mt-4 text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a227]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-[#666666]">{pillar.text}</p>
                </Reveal>
              )}
            </ul>

            {showLink ?
            <Reveal delay={0.1}>
                <Link
                to="/about"
                className="group mt-10 inline-flex items-center gap-2 border-b border-[#d4af37]/60 pb-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a227] transition-colors duration-150 ease-lux hover:border-[#c9a227] hover:text-[#111111]">
                
                  More about the firm
                  <ArrowRightIcon
                  className="h-3.5 w-3.5 transition-transform duration-150 ease-lux group-hover:translate-x-1"
                  aria-hidden="true" />
                
                </Link>
              </Reveal> :
            null}
          </div>
        </div>
      </div>
    </section>);

}