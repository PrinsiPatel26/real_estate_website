import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, MapPinIcon } from 'lucide-react';
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
    }} className="group flex h-full cursor-pointer flex-col border border-[#e5e1d8] bg-white transition-all duration-200 ease-lux hover:-translate-y-1 hover:border-[#c9a227] hover:shadow-[0_12px_28px_rgba(17,17,17,0.08)]">
      <Link to={`/projects/${project.slug}`} className="relative block aspect-[16/9] overflow-hidden" aria-label={`View details for ${project.name}`}>
        <img src={project.card} alt={`${project.name} — ${project.location}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 ease-lux group-hover:scale-[1.03]" />
        <span aria-hidden="true" className="absolute inset-0 bg-black/5" />
        <span className="absolute left-4 top-4 bg-white/95 px-2.5 py-1.5 text-[0.58rem] uppercase tracking-[0.08em] text-[#111111]">Residential</span>
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[0.58rem] uppercase tracking-[0.12em] text-[#a98232]">{project.eyebrow}</p>
        <h3 className="mt-2 font-display text-2xl font-light leading-tight text-[#111111]"><Link to={`/projects/${project.slug}`} className="transition-colors hover:text-[#c9a227]">{project.name}</Link></h3>
        <p className="mt-3 text-[0.86rem] leading-relaxed text-[#666666]">{project.tagline}</p>
        <div className="mt-5 space-y-3 border-t border-[#e5e1d8] pt-5 text-[0.78rem] text-[#4a4a4a]">
          <p className="flex items-start gap-2"><MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a227]" aria-hidden="true" /><span><strong className="font-medium text-[#333333]">Address:</strong> {project.location}</span></p>
          <p><strong className="font-medium text-[#333333]">Developed By:</strong> {project.developer}</p>
          <p><strong className="font-medium text-[#333333]">Configuration:</strong> {project.configuration}</p>
        </div>
        <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#e5e1d8] pt-5">
          <p className="text-[0.75rem] text-[#555555]"><span className="block text-[0.58rem] uppercase tracking-[0.12em]">Base Price</span><strong className="mt-1 block font-medium text-[#c9a227]">{project.price || 'Price on Request'}</strong></p>
          <Link to={`/projects/${project.slug}`} className="group/link inline-flex shrink-0 items-center gap-2 text-[0.66rem] uppercase tracking-[0.16em] text-[#111111] transition-colors hover:text-[#c9a227]">View Details <ArrowRightIcon className="h-3.5 w-3.5 text-[#c9a227] transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true" /></Link>
        </div>
      </div>
    </Reveal>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} delay={index * 0.04} />)}</div>;
}
