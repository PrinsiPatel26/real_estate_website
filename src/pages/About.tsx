import React from 'react';
import { useSeo } from '../hooks/useSeo';
import { brand, callLink, DISCLAIMER_SHORT } from '../data/brand';
import { developerHighlights } from '../data/projects';
import { FounderSection } from '../components/FounderSection';
import { ContactSection } from '../components/ContactSection';
import { Reveal, GoldLine } from '../components/Reveal';
import { TrustedDeveloperNetwork } from '../components/TrustedDeveloperNetwork';
import { aboutContent, founderContent } from '../data/site';

export function About() {
  useSeo({
    title: 'About | Chauhan Realtors — Premium Real Estate in Gurgaon',
    description:
    'Chauhan Realtors is a founder-led real estate consultancy in Gurgaon, combining market understanding, personalised guidance and transparent communication.',
    image: brand.founder.photo
  });

  return (
    <>
      <section className="bg-[#efeee9] pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32">
        <div className="mx-auto grid max-w-shell items-stretch lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="flex flex-col justify-center px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
            <Reveal>
              <p className="eyebrow text-[#c9a227]">About Chauhan Realtors</p>
            </Reveal>
            <Reveal delay={0.05}>
              <span className="mt-5 block h-px w-14 bg-[#c9a227]" aria-hidden="true" />
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 max-w-xl font-display text-[2.75rem] font-light leading-[0.98] tracking-[-0.035em] text-[#111111] sm:text-[4rem] lg:text-[5rem]">
                A relationship built on trust, <span className="text-[#c9a227]">not a transaction.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-[1rem] leading-relaxed text-[#4e4b45] sm:text-[1.08rem]">
                We are a founder-led consultancy working with a deliberately short list of Gurgaon residential projects, so that every recommendation is informed and every claim is checked.
              </p>
            </Reveal>
          </div>
          <Reveal direction="right" className="min-h-[22rem] lg:min-h-[34rem]">
            <img src={brand.founder.photo} alt={`${brand.founder.name}, founder of Chauhan Realtors`} className="h-full w-full object-cover object-top" />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="company-introduction-heading" className="bg-[#f3f0e9] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-shell px-5 lg:px-10">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal>
              <p className="eyebrow text-[#c9a227]">{aboutContent.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <GoldLine className="mx-auto mt-5" width="3.5rem" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="company-introduction-heading" className="mt-6 font-display text-[2.5rem] font-medium leading-[1.08] tracking-[-0.03em] text-[#151515] sm:text-[3.4rem] lg:text-[4.5rem]">
                <span className="block">More Than Property.</span>
                <span className="block text-[#c9a227]">A Relationship Built On Trust.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-6 max-w-[750px] text-[1rem] leading-[1.7] text-[#4e4b45] sm:text-[1.08rem]">{aboutContent.body}</p>
            </Reveal>
          </div>

          <div className="mx-auto mt-10 grid max-w-[1200px] gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {aboutContent.pillars.slice(0, 4).map((pillar, index) =>
            <Reveal key={pillar.title} delay={index * 0.04} className="min-h-[160px] border border-[#b48c32]/25 bg-[#efeee9] p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-[#c9a227]/60 sm:p-7">
                <span className="mb-5 inline-flex h-4 w-4 rotate-45 items-center justify-center border border-[#c9a227]/70 bg-[#c9a227]/10" aria-hidden="true" />
                <h3 className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#151515]">{pillar.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-[1.6] text-[#4e4b45]">{pillar.text}</p>
              </Reveal>)}
          </div>
        </div>
      </section>

      <FounderSection />

      <section aria-labelledby="guidance-heading" className="relative overflow-hidden bg-[#111111] py-14 text-white sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url(${brand.founder.photo})`, backgroundPosition: 'center', backgroundSize: 'cover' }} aria-hidden="true" />
        <div className="absolute inset-0 bg-[#111111]/55" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-shell gap-12 px-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end lg:px-10">
          <div>
            <p className="eyebrow text-[#d4af37]">Your Next Move</p>
            <span className="mt-5 block h-px w-14 bg-[#d4af37]" aria-hidden="true" />
            <h2 id="guidance-heading" className="mt-6 max-w-3xl font-display text-[2.7rem] font-light leading-[1.02] !text-white sm:text-[4rem] lg:text-[4.75rem]">Every address deserves <span className="text-[#d4af37]">the right guidance.</span></h2>
            <p className="mt-7 max-w-2xl text-[1rem] leading-relaxed text-white/70 sm:text-[1.08rem]">{founderContent.statement}</p>
            <a href={callLink(brand.founder.phone)} className="mt-9 inline-flex h-12 items-center bg-[#c9a227] px-6 text-[0.68rem] uppercase tracking-[0.2em] text-[#111111] transition-colors hover:bg-[#d8b968]">Speak with the founder <span className="ml-3">→</span></a>
          </div>
          <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {aboutContent.pillars.slice(1, 4).map((pillar) =>
            <div key={pillar.title}>
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-[#d4af37]">{pillar.title}</p>
                <p className="mt-3 text-[0.78rem] leading-relaxed text-white/65">{pillar.text}</p>
              </div>)}
          </div>
        </div>
      </section>

      <TrustedDeveloperNetwork />

      <section aria-labelledby="developer-heading" className="bg-[#0d0d0d] py-16 text-white sm:py-24 lg:py-28">
        <div className="mx-auto max-w-shell px-5 lg:px-10">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow text-[#c9a227]">Developer Highlights</p>
            </Reveal>
            <Reveal delay={0.05}>
              <GoldLine className="mt-5" width="3.5rem" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="developer-heading" className="mt-6 font-display text-[2.2rem] font-light leading-[1.02] tracking-[-0.03em] !text-white sm:text-[2.9rem] lg:text-[3.5rem]">
                <span className="block">Credentials Of The</span>
                <span className="block text-[#c9a227]">Developers We Represent.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-[0.95rem] leading-relaxed text-white/70">{developerHighlights.attribution}</p>
            </Reveal>
          </div>

          <ul className="mt-12 grid overflow-hidden border border-[#333333] bg-[#151515] md:grid-cols-3 lg:grid-cols-5">
            {developerHighlights.stats.map((stat, index) =>
            <Reveal as="li" key={stat.label} delay={index * 0.04} className={`border-[#333333] bg-[#151515] p-6 transition-colors duration-300 hover:bg-[#1b1b1b] hover:shadow-[inset_0_0_24px_rgba(201,162,39,0.06)] sm:p-7 lg:border-r lg:last:border-r-0 ${index < developerHighlights.stats.length - 1 ? 'border-b sm:border-b-0 sm:[&:nth-child(-n+3)]:border-b' : ''} sm:[&:nth-child(odd)]:border-r-0 sm:[&:nth-child(even)]:border-r lg:[&:nth-child(odd)]:border-r lg:[&:nth-child(even)]:border-r`}>
                <p className="font-display text-[2.45rem] font-light leading-none text-[#c9a227] sm:text-[2.8rem]">
                  {stat.value}
                </p>
                <p className="mt-4 text-[0.8rem] leading-relaxed text-white/70">{stat.label}</p>
              </Reveal>
            )}
          </ul>

          <Reveal delay={0.06}>
            <p className="mt-6 max-w-3xl text-[0.72rem] leading-relaxed text-white/55">
              These figures are attributed developer information presented in material supplied to
              us by M3M India. They are not achievements of Chauhan Realtors. {DISCLAIMER_SHORT}
            </p>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </>);

}