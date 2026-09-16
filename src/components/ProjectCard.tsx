import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, MapPinIcon } from 'lucide-react';
import type { Project } from '../types/project';
import { whatsappLink, projectWhatsappMessage } from '../data/brand';
import { Reveal } from './Reveal';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  delay?: number;
}

export function ProjectCard({ project, featured = false, delay = 0 }: ProjectCardProps) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`group relative flex flex-col overflow-hidden bg-ink-800 ${
      featured ? 'lg:col-span-2 lg:flex-row' : ''}`
      }>
      
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 border border-transparent transition-colors duration-200 ease-lux group-hover:border-gold/45" />
      

      <Link
        to={`/projects/${project.slug}`}
        className={`relative block overflow-hidden ${
        featured ? 'aspect-[16/10] lg:aspect-auto lg:w-[58%]' : 'aspect-[4/3]'}`
        }
        aria-label={`View details for ${project.name}`}>
        
        <img
          src={project.card}
          alt={`${project.name} — ${project.location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 ease-lux group-hover:scale-[1.05]" />
        
        <span aria-hidden="true" className="absolute inset-0 bg-ink-900/25" />
        <span className="absolute left-0 top-5 bg-ink-900/85 py-1.5 pl-4 pr-5 text-[0.58rem] uppercase tracking-micro text-gold">
          {project.eyebrow}
        </span>
      </Link>

      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${featured ? 'lg:justify-center lg:p-10' : ''}`}>
        <p className="text-[0.62rem] uppercase tracking-micro text-paper/45">{project.developer}</p>
        <h3
          className={`mt-3 font-display font-light leading-tight text-paper ${
          featured ? 'text-3xl lg:text-[2.6rem]' : 'text-2xl'}`
          }>
          
          <Link
            to={`/projects/${project.slug}`}
            className="transition-colors duration-150 ease-lux hover:text-gold-bright">
            
            {project.name}
          </Link>
        </h3>

        <p className="mt-3 flex items-start gap-1.5 text-[0.78rem] text-gold/85">
          <MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {project.location}
        </p>

        <p className={`mt-4 text-[0.85rem] leading-relaxed text-paper/55 ${featured ? 'max-w-lg lg:text-[0.95rem]' : ''}`}>
          {project.tagline}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-gold/10 pt-5">
          <div>
            <dt className="text-[0.58rem] uppercase tracking-micro text-paper/40">Configuration</dt>
            <dd className="mt-1.5 text-[0.82rem] text-paper/85">{project.configuration}</dd>
          </div>
          <div>
            <dt className="text-[0.58rem] uppercase tracking-micro text-paper/40">Price</dt>
            <dd className="mt-1.5 text-[0.82rem] text-gold-bright">{project.price}</dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
          <Link
            to={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-micro text-paper transition-colors duration-150 ease-lux hover:text-gold-bright">
            
            View Details
            <ArrowUpRightIcon
              className="h-3.5 w-3.5 transition-transform duration-150 ease-lux group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              aria-hidden="true" />
            
          </Link>
          <a
            href={whatsappLink(projectWhatsappMessage(project.name))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-micro text-gold transition-colors duration-150 ease-lux hover:text-gold-bright">
            
            <WhatsAppIcon className="h-3.5 w-3.5 object-contain" />
            Enquire Now
          </a>
        </div>
      </div>
    </Reveal>);

}

interface ProjectGridProps {
  projects: Project[];
  /** The first project is given a wide feature panel — it carries the most verified detail. */
  featureFirst?: boolean;
}

export function ProjectGrid({ projects, featureFirst = true }: ProjectGridProps) {
  const [first, ...rest] = projects;
  if (!first) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
      <ProjectCard project={first} featured={featureFirst} />
      {rest.map((project, index) =>
      <ProjectCard key={project.slug} project={project} delay={(index + 1) * 0.04} />
      )}
    </div>);

}