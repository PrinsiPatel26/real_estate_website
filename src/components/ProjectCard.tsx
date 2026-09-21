import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import type { Project } from '../types/project';
import { Reveal } from './Reveal';

interface ProjectCardProps { project: Project; delay?: number; }

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const navigate = useNavigate();

  const openProject = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('a')) return;
    navigate(`/projects/${project.slug}`);
  };

  return (
    <Reveal as="article" delay={delay} onClick={openProject} role="link" tabIndex={0} onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        navigate(`/projects/${project.slug}`);
      }
    }} className="group flex h-full min-w-[84vw] shrink-0 snap-start cursor-pointer flex-col border border-[#d4af37]/25 bg-[#151515] text-white transition-all duration-300 ease-lux hover:-translate-y-1 hover:border-[#c9a24a] hover:shadow-[0_18px_36px_rgba(0,0,0,0.18)] md:min-w-0 md:shrink">
      <Link to={`/projects/${project.slug}`} className="relative block aspect-[16/7.5] overflow-hidden" aria-label={`View details for ${project.name}`}>
        <img src={project.card} alt={`${project.name} — ${project.location}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 ease-lux group-hover:scale-[1.03]" />
        <span aria-hidden="true" className="absolute inset-0 bg-black/5" />
        <span className="absolute left-3 top-3 border border-[#d4af37]/60 bg-[#0a0a0a]/85 px-2 py-1 text-[0.58rem] uppercase tracking-[0.08em] text-[#d8b968]">Residential</span>
      </Link>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-[0.58rem] uppercase tracking-[0.12em] text-[#d8b968]">{project.eyebrow}</p>
        <h3 className="mt-1.5 font-display text-2xl font-light leading-tight text-white"><Link to={`/projects/${project.slug}`} className="transition-colors hover:text-[#d8b968]">{project.name}</Link></h3>
        <p className="mt-2.5 text-[0.86rem] leading-relaxed text-white/65">{project.tagline}</p>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#d4af37]/25 pt-4">
          <p className="text-[0.75rem] text-white/55"><span className="block text-[0.58rem] uppercase tracking-[0.12em]">Base Price</span><strong className="mt-1 block font-medium text-[#d8b968]">{project.price || 'Price on Request'}</strong></p>
          <Link to={`/projects/${project.slug}`} className="group/link inline-flex shrink-0 items-center gap-2 text-[0.66rem] uppercase tracking-[0.16em] text-white transition-colors hover:text-[#d8b968]">View Details <ArrowRightIcon className="h-3.5 w-3.5 text-[#c9a24a] transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true" /></Link>
        </div>
      </div>
    </Reveal>
  );
}

export function ProjectGrid({ projects, featured = false }: { projects: Project[]; featured?: boolean }) {
  return <div className={`mx-auto flex w-full ${featured ? 'max-w-[78rem]' : 'max-w-[62rem]'} snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:pb-0 md:snap-none ${featured ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>{projects.map((project, index) => <ProjectCard key={project.slug} project={project} delay={index * 0.04} />)}</div>;
}
