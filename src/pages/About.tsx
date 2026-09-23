import React from 'react';
import { Building2Icon, ClipboardListIcon, HandshakeIcon, PhoneCallIcon, Settings2Icon, UsersIcon } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { brand, callLink, DISCLAIMER_SHORT } from '../data/brand';
import { developerHighlights } from '../data/projects';
import { FounderSection } from '../components/FounderSection';
import { ContactSection } from '../components/ContactSection';
import { Reveal, GoldLine } from '../components/Reveal';
import { TrustedDeveloperNetwork } from '../components/TrustedDeveloperNetwork';
import { aboutContent, founderContent } from '../data/site';

const teamMembers = [
  {
    name: 'Pratyaksh Sharma',
    role: 'Sales Manager',
    image: '/image111.jpeg',
    imagePosition: 'center 20%',
    alt: 'Pratyaksh Sharma - Sales Manager at Chauhan Realtors',
    description: 'Pratyaksh leads sales operations and helps clients explore the right residential opportunities. With a focus on clear communication and understanding client requirements, he supports a smooth and transparent property-buying journey.',
    responsibilities: [
      ['Client Consultation', 'Understanding client requirements and preferences.', PhoneCallIcon],
      ['Project Guidance', 'Helping clients evaluate relevant residential opportunities.', Building2Icon],
      ['End-to-End Support', 'Supporting clients throughout the enquiry and site-visit journey.', HandshakeIcon]
    ]
  },
  {
    name: 'Sonali Sharma',
    role: 'HR & Operation',
    image: '/image122.jpeg',
    imagePosition: 'center 18%',
    alt: 'Sonali Sharma - HR & Operation at Chauhan Realtors',
    description: 'Sonali manages HR and operational coordination at Chauhan Realtors, ensuring an organized workflow and a seamless experience across internal and client-facing processes. She focuses on team coordination, process efficiency and reliable support across key touchpoints.',
    responsibilities: [
      ['Team Management', 'Supporting coordination and a structured team environment.', UsersIcon],
      ['Operations Coordination', 'Helping maintain smooth and efficient day-to-day processes.', Settings2Icon],
      ['Client Support', 'Ensuring reliable coordination and timely operational assistance.', ClipboardListIcon]
    ]
  }
] as const;

const guidanceCards = [
  {
    number: '01',
    image: '/c-1.png',
    title: 'Curated Opportunities',
    description: 'Relevant residential opportunities selected around your requirements, priorities and lifestyle.',
    alt: 'Premium residential property representing curated opportunities'
  },
  {
    number: '02',
    image: '/c-2.jpeg',
    title: 'Transparent Guidance',
    description: 'Clear project information and practical guidance to help you understand your options before taking the next step.',
    alt: 'Modern residential development representing transparent guidance'
  },
  {
    number: '03',
    image: '/c-3.jpeg',
    title: 'Local Market Knowledge',
    description: 'A focused understanding of residential locations, connectivity, developments and the factors that matter when evaluating a property.',
    alt: 'Luxury residential community representing local market knowledge'
  },
  {
    number: '04',
    image: '/c-4.jpeg',
    title: 'Client-First Support',
    description: 'Personalized assistance from your first enquiry through project exploration, site visits and the next stage of your property journey.',
    alt: 'Premium residential architecture representing client-first support'
  }
] as const;

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
            <img src="/building.png" alt="Premium residential building - Chauhan Realtors" className="h-full w-full object-cover object-center" />
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

      <section aria-labelledby="team-heading" className="border-b border-[#e8e6e0] bg-[#f3f0e9] py-16 text-[#111111] sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <Reveal className="mx-auto max-w-[780px] text-center">
            <p className="eyebrow text-[#c9a227]">Our Team</p>
            <GoldLine className="mx-auto mt-5" width="3.5rem" />
            <h2 id="team-heading" className="mt-7 font-display text-[2.7rem] font-medium leading-[0.98] text-[#151515] sm:text-[4rem] lg:text-[4.6rem]">A Dedicated Team,<span className="block text-[#c9a227]">A Stronger Tomorrow.</span></h2>
            <p className="mx-auto mt-6 max-w-[700px] text-[1rem] leading-[1.8] text-[#5f5a52] sm:text-[1.08rem]">Our team works with a shared vision - to help you find the right residential opportunities with clarity, honesty and personalized support.</p>
          </Reveal>

          <div className="mt-12 space-y-10 lg:space-y-12">
            {teamMembers.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.08} className={`flex flex-col gap-6 border-t border-[#b48c32]/30 pt-8 lg:flex-row lg:items-start lg:gap-10 ${index === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`${index === 1 ? 'lg:pl-0' : 'lg:pr-0'} w-full lg:w-[38%]`}>
                  <img src={member.image} alt={member.alt} loading="lazy" style={{ objectPosition: member.imagePosition }} className="h-[340px] w-full object-cover sm:h-[430px] lg:h-[460px]" />
                </div>

                <div className="flex-1 self-center lg:self-stretch">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#c9a227]">{member.role}</p>
                  <h3 className="mt-4 font-display text-[2.2rem] font-medium leading-[1.02] text-[#151515] sm:text-[2.8rem] lg:text-[3.4rem]">{member.name}</h3>
                  <p className="mt-5 max-w-[680px] text-[0.98rem] leading-[1.8] text-[#5f5a52]">{member.description}</p>

                  <div className="mt-8 space-y-5">
                    {member.responsibilities.map(([title, text, Icon], responsibilityIndex) => (
                      <div key={title} className="flex gap-4 border-t border-[#c9a227]/20 pt-4 first:border-t-0 first:pt-0">
                        <span className="pt-1 font-display text-[1.7rem] leading-none text-[#c9a227]">{String(responsibilityIndex + 1).padStart(2, '0')}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-[#c9a227]" strokeWidth={1.5} aria-hidden="true" />
                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#151515]">{title}</p>
                          </div>
                          <p className="mt-2 text-[0.9rem] leading-[1.6] text-[#5f5a52]">{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="guidance-heading" className="bg-[#f3f0e9] py-20 text-[#111111] sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
          <Reveal className="mx-auto max-w-[760px] text-center">
            <p className="eyebrow text-[#c9a227]">Your Next Move</p>
            <h2 id="guidance-heading" className="mt-6 font-display text-[2.4rem] font-light leading-[1.02] tracking-[-0.03em] text-[#111111] sm:text-[3.2rem] lg:text-[4.4rem]">
              Guidance That Goes
              <span className="block text-[#c9a227]">Beyond The Transaction.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[700px] text-[0.98rem] leading-[1.8] text-[#4e4b45] sm:text-[1.06rem]">
              At Chauhan Realtors, we focus on making every property decision clearer — from discovering the right opportunity to understanding the project and taking the next step with confidence.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {guidanceCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.05} className="group overflow-hidden border border-[#b48c32]/35 bg-[#f7f4ed] transition-all duration-400 hover:border-[#c9a227]/70">
                <div className="overflow-hidden bg-[#e7e0d2]">
                  <img src={card.image} alt={card.alt} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-400 group-hover:scale-[1.02]" />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-[0.88rem] font-semibold uppercase tracking-[0.18em] text-[#111111]">{card.title}</h3>
                  <p className="mt-3 text-[0.92rem] leading-[1.7] text-[#4e4b45]">{card.description}</p>
                </div>
              </Reveal>
            ))}
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
