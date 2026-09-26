import React from 'react';
import { Reveal } from './Reveal';

const steps = [
  ['Understand', "Understand the client's requirement, objective and budget."],
  ['Shortlist', 'Identify relevant property opportunities.'],
  ['Evaluate', 'Review location, property details and suitability.'],
  ['Visit', 'Coordinate site visits and on-ground exploration.'],
  ['Decide', 'Move forward with clarity and professional assistance.']
] as const;

export function ApproachSection() {
  return (
    <section id="approach" className="bg-[#0b0b0b] py-14 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#c9a227]">Our Approach</p>
          <h2 className="mt-4 font-display text-[2.5rem] font-medium leading-[1.08] !text-white sm:text-[3.5rem]">A clearer way forward.</h2>
        </div>
        <div className="mt-10 flex flex-col gap-6 md:gap-8 lg:gap-0">
          <ol className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
            {steps.map(([title, text], index) => (
              <Reveal as="li" key={title} delay={index * 0.06} className="group relative border border-white/15 bg-[#121212] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-[#c9a227]/70 hover:bg-[#171717] lg:p-6">
                <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-[#c9a227]">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-0 font-display text-2xl font-medium !text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
