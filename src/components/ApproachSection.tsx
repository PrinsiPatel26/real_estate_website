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
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-2 sm:gap-4 lg:gap-6">
            {steps.map((_, index) => (
              <React.Fragment key={index}>
                <span className="h-2.5 w-2.5 rounded-full bg-[#d4af37] shadow-[0_0_0_4px_rgba(212,175,55,0.12)]" aria-hidden="true" />
                {index < steps.length - 1 && <span className="hidden h-px flex-1 bg-[#d4af37]/35 lg:block" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
          <ol className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {steps.map(([title, text], index) => (
              <Reveal as="li" key={title} delay={index * 0.06} className="relative border border-white/12 bg-white/[0.02] p-5 text-left lg:p-6">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d4af37]" aria-hidden="true" />
                  <span className="h-px flex-1 bg-[#d4af37]/30" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium !text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
