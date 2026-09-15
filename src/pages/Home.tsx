import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { projects, HERO_IMAGE } from '../data/projects';
import { DISCLAIMER_VISUALS } from '../data/brand';
import { Hero } from '../components/Hero';
import { StatsStrip } from '../components/StatsStrip';
import { AboutSection } from '../components/AboutSection';
import { ProjectGrid } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { FounderSection } from '../components/FounderSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { LocationSection } from '../components/LocationSection';
import { ContactSection } from '../components/ContactSection';
import { Reveal } from '../components/Reveal';

export function Home() {
  useSeo({
    title: 'Chauhans Realtors | Premium Real Estate in Gurgaon',
    description:
    'Chauhans Realtors helps you discover premium residential properties and investment opportunities across Gurgaon with trusted, personalised real estate guidance.',
    image: HERO_IMAGE
  });

  return (
    <>
      <Hero />
      <StatsStrip />
      <AboutSection />

      <section
        id="featured-projects"
        aria-labelledby="featured-heading"
        className="border-t border-gold/10 bg-ink-800 py-20 sm:py-28 lg:py-32">
        
        <div className="mx-auto max-w-shell px-5 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="featured-heading"
              eyebrow="Featured Projects"
              lines={['A Short List,', 'Carefully Chosen.']}>
              
              <p>
                Five residential addresses across Gurgaon. Where developer material confirms a
                detail we present it; where it does not, we say so.
              </p>
            </SectionHeading>
            <Reveal delay={0.1}>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 border border-gold/40 px-6 py-3.5 text-[0.68rem] uppercase tracking-micro text-gold transition-colors duration-150 ease-lux hover:bg-gold hover:text-ink-900">
                
                All Projects
                <ArrowRightIcon
                  className="h-3.5 w-3.5 transition-transform duration-150 ease-lux group-hover:translate-x-1"
                  aria-hidden="true" />
                
              </Link>
            </Reveal>
          </div>

          <div className="mt-14">
            <ProjectGrid projects={projects} />
          </div>

          <Reveal delay={0.05}>
            <p className="mt-8 max-w-3xl text-[0.7rem] leading-relaxed text-paper/40">
              {DISCLAIMER_VISUALS}
            </p>
          </Reveal>
        </div>
      </section>

      <FounderSection />
      <WhyChooseUs />
      <LocationSection />
      <ContactSection />
    </>);

}