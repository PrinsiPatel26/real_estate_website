import React from 'react';
import { Reveal } from './Reveal';

const steps = [
  ['01', 'Understand', "Understand the client's requirement, objective and budget."],
  ['02', 'Shortlist', 'Identify relevant property opportunities.'],
  ['03', 'Evaluate', 'Review location, property details and suitability.'],
  ['04', 'Visit', 'Coordinate site visits and on-ground exploration.'],
  ['05', 'Decide', 'Move forward with clarity and professional assistance.']
];

export function ApproachSection() {
  return (
    <section id="approach" className="bg-[#0b0b0b] py-16 text-white sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#c9a227]">Our Approach</p>
          <h2 className="mt-4 font-display text-[2.5rem] font-medium leading-[1.08] !text-white sm:text-[3.5rem]">A clearer way forward.</h2>
        </div>
        <ol className="mt-12 grid border-l border-[#c9a227]/40 md:grid-cols-2 lg:grid-cols-5 lg:border-l-0 lg:border-t">
          {steps.map(([number, title, text], index) => (
            <Reveal as="li" key={number} delay={index * 0.06} className="relative border-b border-white/12 py-7 pl-7 lg:border-b-0 lg:border-r lg:border-white/12 lg:pl-6 lg:pr-6 lg:pt-8">
              <span className="absolute -left-[6px] top-7 h-3 w-3 rounded-full bg-[#c9a227] lg:-top-[6px] lg:left-6" aria-hidden="true" />
              <span className="text-sm tracking-[0.18em] text-[#c9a227]">{number}</span>
              <h3 className="mt-5 font-display text-2xl font-medium !text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
