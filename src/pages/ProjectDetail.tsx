import React, { useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  MapPinIcon,
  PhoneIcon,
  DownloadIcon,
  CalendarCheckIcon,
  CheckIcon,
  ArrowRightIcon,
  InfoIcon } from
'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { projectBySlug, projects } from '../data/projects';
import {
  brand,
  whatsappLink,
  callLink,
  projectWhatsappMessage,
  siteVisitMessage,
  brochureMessage,
  DISCLAIMER_VISUALS } from
'../data/brand';
import type { Confidence } from '../types/project';
import { PageHeader } from '../components/PageHeader';
import { EnquiryForm } from '../components/EnquiryForm';
import { ProjectGallery } from '../components/Lightbox';
import { MobileBottomCTA } from '../components/MobileBottomCTA';
import { Reveal, GoldLine } from '../components/Reveal';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

const confidenceLabel: Record<Confidence, string> = {
  verified: 'Confirmed in supplied material',
  reference: 'Reference figure - verify',
  onRequest: 'On request'
};

const confidenceClass: Record<Confidence, string> = {
  verified: 'text-gold-bright',
  reference: 'text-paper/45',
  onRequest: 'text-paper/45'
};

function Block({
  title,
  children,
  id




}: {title: string;children: React.ReactNode;id?: string;}) {
  return (
    <section id={id} aria-labelledby={id ? id + '-h' : undefined} className="scroll-mt-24">
      <Reveal>
        <h2 id={id ? id + '-h' : undefined} className="eyebrow text-gold">
          {title}
        </h2>
        <GoldLine className="mt-4" width="2.5rem" />
      </Reveal>
      <div className="mt-6">{children}</div>
    </section>);

}

export function ProjectDetail() {
  const { slug } = useParams<{slug: string;}>();
  const project = slug ? projectBySlug(slug) : undefined;
  const formRef = useRef<HTMLDivElement>(null);

  // Hooks must run unconditionally, so SEO is applied before the redirect guard.
  useSeo({
    title: project ?
    project.name + ' | Chauhans Realtors, Gurgaon' :
    'Project | Chauhans Realtors',
    description: project ? project.tagline : 'Premium residential projects across Gurgaon.',
    image: project ? project.card : undefined
  });

  if (!project) return <Navigate to="/projects" replace />;

  const enquireMessage = projectWhatsappMessage(project.name);
  const others = projects.filter((item) => item.id !== project.id).slice(0, 3);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <PageHeader
        eyebrow={project.developer}
        title={project.name}
        intro={project.tagline}
        image={project.card}
        crumbs={[
        { label: 'Home', to: '/' },
        { label: 'Projects', to: '/projects' },
        { label: project.name }]
        } />
      

      <div className="border-b border-gold/10 bg-ink-800">
        <div className="mx-auto flex max-w-shell flex-col gap-5 px-5 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="flex items-start gap-2 text-[0.85rem] text-gold">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {project.location}
            </p>
            {project.registeredAs ?
            <p className="mt-2 text-[0.72rem] leading-relaxed text-paper/45">
                Also identified as: {project.registeredAs}
              </p> :
            null}
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappLink(enquireMessage)}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 items-center justify-center gap-2 bg-gold px-6 text-[0.66rem] uppercase tracking-micro text-ink-900 transition-colors duration-150 ease-lux hover:bg-gold-bright">
              
              <WhatsAppIcon className="h-4 w-4 object-contain" />
              Enquire Now
            </a>
            <a
              href={whatsappLink(siteVisitMessage(project.name))}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 items-center justify-center gap-2 border border-gold/40 px-6 text-[0.66rem] uppercase tracking-micro text-gold transition-colors duration-150 ease-lux hover:bg-gold hover:text-ink-900">
              
              <CalendarCheckIcon className="h-4 w-4" aria-hidden="true" />
              Schedule Site Visit
            </a>
            {project.brochure ?
            <a
              href={project.brochure}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 items-center justify-center gap-2 border border-paper/20 px-6 text-[0.66rem] uppercase tracking-micro text-paper/85 transition-colors duration-150 ease-lux hover:border-gold hover:text-gold-bright">
              
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                Download Brochure
              </a> :

            <a
              href={whatsappLink(brochureMessage(project.name))}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 items-center justify-center gap-2 border border-paper/20 px-6 text-[0.66rem] uppercase tracking-micro text-paper/85 transition-colors duration-150 ease-lux hover:border-gold hover:text-gold-bright">
              
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                Brochure Available On Request
              </a>
            }
          </div>
        </div>
      </div>

      <div className="bg-ink-900 pb-24 pt-16 sm:pb-28 sm:pt-20">
        <div className="mx-auto max-w-shell px-5 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-14">
            <div className="space-y-16">
              <Block title="Overview" id="overview">
                <div className="space-y-4">
                  {project.overview.map((paragraph) =>
                  <p key={paragraph.slice(0, 32)} className="text-[0.95rem] leading-relaxed text-paper/65">
                      {paragraph}
                    </p>
                  )}
                </div>
              </Block>

              <Block title="Highlights" id="highlights">
                <ul className="grid gap-px border border-gold/10 bg-gold/10 sm:grid-cols-2">
                  {project.highlights.map((item, index) =>
                  <Reveal as="li" key={item.title} delay={index * 0.04} className="bg-ink-900 p-6">
                      <h3 className="font-display text-xl font-light text-paper">{item.title}</h3>
                      <p className="mt-2 text-[0.82rem] leading-relaxed text-paper/55">{item.text}</p>
                    </Reveal>
                  )}
                </ul>
              </Block>

              <Block title="Configuration and project facts" id="configuration">
                <dl className="divide-y divide-gold/10 border-y border-gold/10">
                  {project.facts.map((fact) =>
                  <div key={fact.label} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                      <dt className="text-[0.62rem] uppercase tracking-micro text-paper/40">
                        {fact.label}
                      </dt>
                      <dd>
                        <span className="block text-[0.9rem] text-paper/85">{fact.value}</span>
                        <span className={'mt-1 block text-[0.62rem] ' + confidenceClass[fact.confidence]}>
                          {confidenceLabel[fact.confidence]}
                        </span>
                      </dd>
                    </div>
                  )}
                </dl>
              </Block>

              <Block title="Amenities" id="amenities">
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                  {project.amenities.map((amenity) =>
                  <li key={amenity} className="flex items-start gap-2.5 text-[0.85rem] text-paper/65">
                      <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                      {amenity}
                    </li>
                  )}
                </ul>
              </Block>

              <Block title="Floor plans" id="floor-plans">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.floorPlans.map((plan) =>
                  <li key={plan.label} className="border border-gold/15 bg-ink-800 p-5">
                      <p className="font-display text-lg text-paper">{plan.label}</p>
                      <p className="mt-1.5 text-[0.75rem] text-paper/45">{plan.note}</p>
                    </li>
                  )}
                </ul>
                <p className="mt-4 text-[0.75rem] leading-relaxed text-paper/40">
                  Carpet area, super area and room dimensions must be read from the latest official
                  floor plan for the specific tower and unit.
                </p>
              </Block>

              <Block title="Gallery" id="gallery">
                <ProjectGallery images={project.gallery} />
                <p className="mt-4 text-[0.75rem] leading-relaxed text-paper/40">
                  {DISCLAIMER_VISUALS}
                </p>
              </Block>

              <Block title="Location and connectivity" id="location">
                <p className="flex items-start gap-2 text-[0.95rem] text-paper/70">
                  <MapPinIcon className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {project.location}
                </p>
                <ul className="mt-6 grid gap-px border border-gold/10 bg-gold/10 sm:grid-cols-2">
                  {project.connectivity.map((item) =>
                  <li key={item} className="bg-ink-900 px-5 py-4 text-[0.85rem] text-paper/70">
                      {item}
                    </li>
                  )}
                </ul>
                <p className="mt-4 text-[0.75rem] leading-relaxed text-paper/40">
                  Corridors and landmarks are listed by name only. We do not publish travel times
                  or distances that have not been confirmed.
                </p>
                <div className="mt-6 border border-gold/20">
                  <iframe
                    title={'Map showing the area around ' + project.name}
                    src={
                    'https://www.google.com/maps?q=' +
                    encodeURIComponent(project.location) +
                    '&output=embed'
                    }
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-64 w-full grayscale-[0.4] sm:h-80" />
                  
                </div>
              </Block>

              <Reveal>
                <aside className="border-l border-gold/40 bg-ink-800/60 p-6">
                  <h2 className="flex items-center gap-2 eyebrow text-gold">
                    <InfoIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    Verification note
                  </h2>
                  <p className="mt-4 text-[0.82rem] leading-relaxed text-paper/55">
                    {project.verificationNote}
                  </p>
                </aside>
              </Reveal>

              <div ref={formRef} className="scroll-mt-24">
                <Block title="Enquire about this project" id="enquire">
                  <EnquiryForm
                    defaultProject={project.name}
                    source={'project-detail:' + project.slug}
                    id={'enquiry-' + project.slug} />
                  
                </Block>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-gold/20 bg-ink-800 p-6">
                <p className="text-[0.6rem] uppercase tracking-micro text-paper/40">At a glance</p>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-[0.6rem] uppercase tracking-micro text-paper/40">
                      Configuration
                    </dt>
                    <dd className="mt-1 text-[0.88rem] text-paper/85">{project.configuration}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6rem] uppercase tracking-micro text-paper/40">Size</dt>
                    <dd className="mt-1 text-[0.88rem] text-paper/85">{project.area}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6rem] uppercase tracking-micro text-paper/40">Price</dt>
                    <dd className="mt-1 text-[0.88rem] text-gold-bright">{project.price}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6rem] uppercase tracking-micro text-paper/40">Corridor</dt>
                    <dd className="mt-1 text-[0.88rem] text-paper/85">{project.map.corridor}</dd>
                  </div>
                </dl>

                <div className="mt-7 space-y-3 border-t border-gold/10 pt-6">
                  <a
                    href={whatsappLink(enquireMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 items-center justify-center gap-2 bg-gold text-[0.66rem] uppercase tracking-micro text-ink-900 transition-colors duration-150 ease-lux hover:bg-gold-bright">
                    
                    <WhatsAppIcon className="h-4 w-4 object-contain" />
                    WhatsApp Us
                  </a>
                  <a
                    href={callLink(brand.founder.phone)}
                    className="flex h-12 items-center justify-center gap-2 border border-gold/40 text-[0.66rem] uppercase tracking-micro text-gold transition-colors duration-150 ease-lux hover:bg-gold hover:text-ink-900">
                    
                    <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                    {brand.founder.phoneDisplay}
                  </a>
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="flex h-12 w-full items-center justify-center border border-paper/20 text-[0.66rem] uppercase tracking-micro text-paper/85 transition-colors duration-150 ease-lux hover:border-gold hover:text-gold-bright">
                    
                    Request a Callback
                  </button>
                </div>
              </div>
            </aside>
          </div>

          <section aria-labelledby="other-projects" className="mt-20 border-t border-gold/10 pt-14">
            <Reveal>
              <h2 id="other-projects" className="eyebrow text-gold">
                Other projects
              </h2>
            </Reveal>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {others.map((item, index) =>
              <Reveal as="li" key={item.id} delay={index * 0.04}>
                  <Link
                  to={'/projects/' + item.slug}
                  className="group block overflow-hidden border border-transparent bg-ink-800 transition-colors duration-200 ease-lux hover:border-gold/40">
                  
                    <span className="block aspect-[16/10] overflow-hidden">
                      <img
                      src={item.card}
                      alt={item.name + ' - ' + item.location}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 ease-lux group-hover:scale-[1.05]" />
                    
                    </span>
                    <span className="block p-5">
                      <span className="block text-[0.6rem] uppercase tracking-micro text-paper/40">
                        {item.developer}
                      </span>
                      <span className="mt-2 block font-display text-xl font-light text-paper">
                        {item.name}
                      </span>
                      <span className="mt-3 inline-flex items-center gap-2 text-[0.64rem] uppercase tracking-micro text-gold">
                        View Details
                        <ArrowRightIcon
                        className="h-3.5 w-3.5 transition-transform duration-150 ease-lux group-hover:translate-x-1"
                        aria-hidden="true" />
                      
                      </span>
                    </span>
                  </Link>
                </Reveal>
              )}
            </ul>
          </section>
        </div>
      </div>

      <MobileBottomCTA
        projectName={project.name}
        message={enquireMessage}
        onEnquire={scrollToForm} />
      
    </>);

}