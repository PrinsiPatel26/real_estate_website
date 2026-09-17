import React from 'react';
import { useSeo } from '../hooks/useSeo';
import { projects } from '../data/projects';
import { DISCLAIMER_SHORT, DISCLAIMER_VISUALS } from '../data/brand';
import { PageHeader } from '../components/PageHeader';
import { ProjectGrid } from '../components/ProjectCard';
import { ContactSection } from '../components/ContactSection';
import { Reveal } from '../components/Reveal';

export function Projects() {
  useSeo({
    title: 'Projects | Chauhan Realtors — Premium Gurgaon Residences',
    description:
    'Explore premium residential projects across Gurgaon curated by Chauhan Realtors — M3M GIC Forestia, Ganga Nine Zero, Smartworld Wellness, ATS HomeKraft and Wall Senior Living.',
    image: projects[0].card
  });

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Five addresses, each considered on its own terms."
        intro="We do not force the same level of detail onto every project. Where developer material supports a specification we present it; where a figure is a market reference, it is labelled as one."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Projects' }]}
        image={projects[0].card} />
      

      <section aria-label="All projects" className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-[90%] max-w-shell">
          <ProjectGrid projects={projects} />

          <Reveal delay={0.05}>
            <div className="mt-12 border-l border-[#c9a227] pl-5 sm:pl-6">
              <h2 className="eyebrow text-[#c9a227]">Before you rely on any detail</h2>
              <p className="mt-3 max-w-3xl text-[0.78rem] leading-relaxed text-[#666666]">
                {DISCLAIMER_SHORT}
              </p>
              <p className="mt-3 max-w-3xl text-[0.78rem] leading-relaxed text-[#666666]">
                {DISCLAIMER_VISUALS}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </>);

}