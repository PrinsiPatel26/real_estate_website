import React from 'react';
import { useSeo } from '../hooks/useSeo';
import { brand, DISCLAIMER_SHORT } from '../data/brand';
import { developerHighlights } from '../data/projects';
import { PageHeader } from '../components/PageHeader';
import { AboutSection } from '../components/AboutSection';
import { FounderSection } from '../components/FounderSection';
import { SectionHeading } from '../components/SectionHeading';
import { ContactSection } from '../components/ContactSection';
import { Reveal } from '../components/Reveal';

export function About() {
  useSeo({
    title: 'About | Chauhan Realtors — Premium Real Estate in Gurgaon',
    description:
    'Chauhan Realtors is a founder-led real estate consultancy in Gurgaon, combining market understanding, personalised guidance and transparent communication.',
    image: brand.founder.photo
  });

  return (
    <>
      <PageHeader
          eyebrow="About Chauhan Realtors"
        title="A relationship built on trust, not a transaction."
        intro="We are a founder-led consultancy working with a deliberately short list of Gurgaon residential projects, so that every recommendation is informed and every claim is checked."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
      

      <AboutSection showLink={false} />
      <FounderSection />

      <section
        aria-labelledby="clients-heading"
        className="bg-[#f8f8f6] py-20 sm:py-24">
        
        <div className="mx-auto max-w-shell px-5 lg:px-10">
          <SectionHeading
            id="clients-heading"
            eyebrow="Client Stories"
            lines={['In Their', 'Own Words.']}
            align="center" />
          
          <Reveal delay={0.08}>
            <div className="mx-auto mt-10 max-w-xl border border-[#e8e6e0] bg-white px-6 py-12 text-center">
              <p className="font-display text-2xl font-light italic text-[#c9a227]">
                Client stories coming soon.
              </p>
              <p className="mx-auto mt-4 max-w-md text-[0.85rem] leading-relaxed text-[#666666]">
                We publish testimonials only once a client has given us their words and their
                consent. Nothing on this page is written on a buyer&rsquo;s behalf.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="developer-heading" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-shell px-5 lg:px-10">
          <SectionHeading
            id="developer-heading"
            eyebrow="Developer Highlights"
            lines={['Credentials Of The', 'Developers We Represent.']}>
            
            <p>{developerHighlights.attribution}</p>
          </SectionHeading>

          <ul className="mt-12 grid gap-px border border-[#e8e6e0] bg-[#e8e6e0] sm:grid-cols-2 lg:grid-cols-5">
            {developerHighlights.stats.map((stat, index) =>
            <Reveal as="li" key={stat.label} delay={index * 0.04} className="bg-white p-6 sm:p-7">
                <p className="font-display text-[2rem] font-light leading-none text-[#c9a227]">
                  {stat.value}
                </p>
                <p className="mt-3 text-[0.75rem] leading-relaxed text-[#666666]">{stat.label}</p>
              </Reveal>
            )}
          </ul>

          <Reveal delay={0.06}>
            <p className="mt-6 max-w-3xl text-[0.72rem] leading-relaxed text-[#666666]">
              These figures are attributed developer information presented in material supplied to
              us by M3M India. They are not achievements of Chauhan Realtors. {DISCLAIMER_SHORT}
            </p>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </>);

}