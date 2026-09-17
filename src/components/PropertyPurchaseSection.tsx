import React from 'react';
import { ClipboardListIcon, FileTextIcon, HandshakeIcon, HomeIcon, SearchIcon } from 'lucide-react';
import { Reveal } from './Reveal';

const steps = [
  {
    title: 'Understand Your Goals',
    description: 'Residential home or commercial investment? Budget analysis and requirement mapping',
    Icon: HomeIcon
  },
  {
    title: 'Curated Recommendations',
    description: 'Handpicked properties matching your criteria from our exclusive inventory',
    Icon: ClipboardListIcon
  },
  {
    title: 'Site Visits & Analysis',
    description: 'Guided property tours with complete market analysis and ROI projections',
    Icon: SearchIcon
  },
  {
    title: 'Seamless Documentation',
    description: 'End-to-end legal support, RERA verification, and booking assistance',
    Icon: FileTextIcon
  },
  {
    title: 'Possession & Beyond',
    description: 'Handover support and rental assistance',
    Icon: HandshakeIcon
  }
];

export function PropertyPurchaseSection() {
  return (
    <section className="bg-white py-20 text-[#111111] sm:py-24 lg:py-28">
      <div className="mx-auto max-w-shell px-5 lg:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-[#c9a227]">Our Approach</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl">
            How We Make <span className="text-[#c9a227]">Property Purchase Simple</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-[#666666]">
            Experience unparalleled service with our comprehensive suite of real estate solutions
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {steps.map(({ title, description, Icon }, index) => (
            <Reveal key={title} delay={index * 0.05}>
              <article className="group flex h-full flex-col border border-[#e5e1d8] bg-white p-5 transition-all duration-300 ease-lux hover:-translate-y-1 hover:border-[#c9a227] hover:shadow-[0_10px_24px_rgba(17,17,17,0.07)] sm:p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#c9a227] text-white transition-transform duration-300 ease-lux group-hover:scale-105">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-xl font-light leading-tight text-[#111111]">{title}</h3>
                <p className="mt-3 text-[0.82rem] leading-relaxed text-[#666666]">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
