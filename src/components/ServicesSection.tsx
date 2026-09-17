import React from 'react';
import { ArrowUpRightIcon, Building2Icon, ClipboardCheckIcon, CompassIcon, HandCoinsIcon, HomeIcon, MapPinIcon, PanelsTopLeftIcon, SearchCheckIcon, StoreIcon } from 'lucide-react';
import { Reveal } from './Reveal';

const services = [
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
  return (
    <section id="services" className="bg-white py-20 text-[#111111] sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-6 border-b border-[#e7e3d8] pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#c9a227]">What We Do</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl">Guidance for the decisions that matter.</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#666666]">Practical, personal assistance from first conversation to a clearer property decision.</p>
        </div>
        <div className="mt-10 grid gap-px border border-[#e7e3d8] bg-[#e7e3d8] sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([title, text, Icon], index) => (
            <Reveal as="article" key={title} delay={index * 0.04} className="group bg-white p-7 transition-colors duration-200 hover:bg-[#fafaf8] sm:p-8">
              <Icon className="h-5 w-5 text-[#c9a227] transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="mt-8 text-sm font-medium tracking-wide text-[#111111]">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#666666]">{text}</p>
              <ArrowUpRightIcon className="mt-8 h-4 w-4 text-[#c9a227] opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
