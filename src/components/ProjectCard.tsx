import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, MapPinIcon } from 'lucide-react';
import type { Project } from '../types/project';
import { whatsappLink, projectWhatsappMessage } from '../data/brand';
import { Reveal } from './Reveal';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ProjectCardProps { project: Project; featured?: boolean; delay?: number; }

export function ProjectCard({ project, featured = false, delay = 0 }: ProjectCardProps) {
  return (
    <Reveal as="article" delay={delay} className={`group relative flex flex-col overflow-hidden border border-[#e7e3d8] bg-white ${featured ? 'lg:col-span-2 lg:flex-row' : ''}`}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 border border-transparent transition-colors duration-200 group-hover:border-[#c9a227]" />
      <Link to={`/projects/${project.slug}`} className={`relative block overflow-hidden ${featured ? 'aspect-[16/10] lg:aspect-auto lg:w-[58%]' : 'aspect-[4/3]'}`} aria-label={`View details for ${project.name}`}>
        <img src={project.card} alt={`${project.name} — ${project.location}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        <span aria-hidden="true" className="absolute inset-0 bg-black/10" />
        <span className="absolute left-0 top-5 bg-white/90 py-1.5 pl-4 pr-5 text-[0.58rem] uppercase tracking-micro text-[#c9a227]">{project.eyebrow}</span>
      </Link>
      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${featured ? 'lg:justify-center lg:p-10' : ''}`}>
        <p className="text-[0.62rem] uppercase tracking-micro text-ink-900/50">{project.developer}</p>
        <h3 className={`mt-3 font-display font-light leading-tight text-ink-900 ${featured ? 'text-3xl lg:text-[2.6rem]' : 'text-2xl'}`}><Link to={`/projects/${project.slug}`} className="transition-colors hover:text-[#c9a227]">{project.name}</Link></h3>
        <p className="mt-3 flex items-start gap-1.5 text-[0.78rem] text-[#c9a227]"><MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />{project.location}</p>
        <p className={`mt-4 text-[0.85rem] leading-relaxed text-ink-900/60 ${featured ? 'max-w-lg lg:text-[0.95rem]' : ''}`}>{project.tagline}</p>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-black/10 pt-5">
          <div><dt className="text-[0.58rem] uppercase tracking-micro text-ink-900/45">Configuration</dt><dd className="mt-1.5 text-[0.82rem] text-ink-900/80">{project.configuration}</dd></div>
          <div><dt className="text-[0.58rem] uppercase tracking-micro text-ink-900/45">Price</dt><dd className="mt-1.5 text-[0.82rem] text-[#a98232]">{project.price}</dd></div>
        </dl>
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
          <Link to={`/projects/${project.slug}`} className="group/link inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-micro text-ink-900 transition-colors hover:text-[#c9a227]">View Details <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden="true" /></Link>
          <a href={whatsappLink(projectWhatsappMessage(project.name))} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-micro text-[#a98232] hover:text-[#c9a227]"><WhatsAppIcon className="h-3.5 w-3.5 object-contain" />Enquire Now</a>
        </div>
      </div>
    </Reveal>
  );
}

export function ProjectGrid({ projects, featureFirst = true }: { projects: Project[]; featureFirst?: boolean }) {
  const [first, ...rest] = projects;
  if (!first) return null;
  return <div className="grid gap-5 lg:grid-cols-2 lg:gap-6"><ProjectCard project={first} featured={featureFirst} />{rest.map((project, index) => <ProjectCard key={project.slug} project={project} delay={(index + 1) * 0.04} />)}</div>;
}
