import React from 'react';
import { useSeo } from '../hooks/useSeo';
import { ApproachSection } from '../components/ApproachSection';
import { ContactSection } from '../components/ContactSection';
import { PremiumServicesLayout } from '../components/PremiumServicesLayout';
import { projects } from '../data/projects';

export function Services() {
  useSeo({ title: 'Services | Chauhan Realtors', description: 'Personalised property buying, selling, investment and site visit assistance across Gurgaon.' });
  return <>
    <section className="relative flex min-h-[72svh] items-end overflow-hidden bg-[#0b0b0b] pb-16 pt-32 text-white sm:pb-20 lg:min-h-[78svh] lg:pb-24">
      <div className="absolute inset-0 opacity-100" style={{ backgroundImage: `url(${projects[0].card})`, backgroundPosition: 'center', backgroundSize: 'cover' }} aria-hidden="true" />
      <div className="image-overlay image-overlay-left" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-shell px-5 lg:px-10">

        <p className="eyebrow text-[#d4af37]">Services</p>
        <span className="mt-5 block h-px w-16 bg-[#d4af37]" aria-hidden="true" />
        <h1 className="mt-7 max-w-4xl font-display text-[3rem] font-medium leading-[1.02] tracking-[-0.03em] !text-white sm:text-[4.5rem] lg:text-[5.5rem]">Guidance for the <span className="text-[#d4af37]">decisions that matter.</span></h1>
        <p className="mt-7 max-w-xl text-[1rem] leading-relaxed text-white/75 sm:text-[1.12rem]">Practical, personal assistance from first conversation to a clearer property decision.</p>
      </div>
    </section>
    <PremiumServicesLayout />
    <ApproachSection />
    <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#0b0b0b] py-20 text-center text-white sm:min-h-[360px]">
      <div className="absolute inset-0" style={{ backgroundImage: `url(${projects[1].card})`, backgroundPosition: 'center', backgroundSize: 'cover' }} aria-hidden="true" />
      <div className="image-overlay image-overlay-center" aria-hidden="true" />
      <div className="relative z-10 px-5"><p className="eyebrow text-[#d4af37]">The next address</p><h2 className="mt-5 max-w-2xl font-display text-[2.2rem] font-medium leading-tight !text-white sm:text-[3.3rem]">The right property decision starts with the right guidance.</h2></div>
    </section>
    <ContactSection />
  </>;
}
