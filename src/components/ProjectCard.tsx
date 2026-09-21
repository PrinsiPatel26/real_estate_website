import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
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
    <Reveal as="article" data-project-card delay={delay} onClick={openProject} role="link" tabIndex={0} onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        navigate(`/projects/${project.slug}`);
      }
    }} className="group box-border flex h-[360px] w-full min-w-0 max-w-none shrink-0 basis-full snap-start cursor-pointer flex-col break-words overflow-hidden border border-[#d4af37]/25 bg-[#151515] text-white transition-all duration-300 ease-lux hover:-translate-y-1 hover:border-[#c9a24a] hover:shadow-[0_18px_36px_rgba(0,0,0,0.18)] sm:basis-[calc(50%-0.5rem)] md:h-[384px] lg:basis-[calc(25%-0.75rem)]">
      <Link to={`/projects/${project.slug}`} className="relative block aspect-[16/7.5] overflow-hidden" aria-label={`View details for ${project.name}`}>
        <img src={project.card} alt={`${project.name} — ${project.location}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 ease-lux group-hover:scale-[1.03]" />
        <span aria-hidden="true" className="absolute inset-0 bg-black/5" />
        <span className="absolute left-3 top-3 border border-[#d4af37]/60 bg-[#0a0a0a]/85 px-2 py-1 text-[0.58rem] uppercase tracking-[0.08em] text-[#d8b968]">Residential</span>
      </Link>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-[0.58rem] uppercase tracking-[0.12em] text-[#d8b968]">{project.eyebrow}</p>
        <h3 className="mt-1.5 min-w-0 break-words font-display text-2xl font-light leading-tight text-white"><Link to={`/projects/${project.slug}`} className="transition-colors hover:text-[#d8b968]">{project.name}</Link></h3>
        <p className="mt-2.5 min-w-0 break-words text-[0.86rem] leading-relaxed text-white/65 [overflow-wrap:anywhere]">{project.tagline}</p>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#d4af37]/25 pt-4">
          <p className="text-[0.75rem] text-white/55"><span className="block text-[0.58rem] uppercase tracking-[0.12em]">Base Price</span><strong className="mt-1 block font-medium text-[#d8b968]">{project.price || 'Price on Request'}</strong></p>
          <Link to={`/projects/${project.slug}`} className="group/link inline-flex shrink-0 items-center gap-2 text-[0.66rem] uppercase tracking-[0.16em] text-white transition-colors hover:text-[#d8b968]">View Details <ArrowRightIcon className="h-3.5 w-3.5 text-[#c9a24a] transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true" /></Link>
        </div>
      </div>
    </Reveal>
  );
}

export function ProjectGrid({ projects, featured = false }: { projects: Project[]; featured?: boolean }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(projects.length > 1);

  const updateScrollState = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setCanScrollLeft(viewport.scrollLeft > 4);
    setCanScrollRight(viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 4);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    updateScrollState();
    viewport.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      viewport.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [projects.length]);

  const move = (direction: number) => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector<HTMLElement>('article');
    if (!viewport || !card) return;
    const gap = Number.parseFloat(getComputedStyle(card.parentElement as HTMLElement).gap) || 0;
    viewport.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  return (
    <div className={`relative mx-auto w-full ${featured ? 'max-w-[78rem]' : 'max-w-[62rem]'}`}>
      <button type="button" onClick={() => move(-1)} disabled={!canScrollLeft} aria-label="Previous properties" className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4af37]/60 bg-[#0a0a0a] text-[#d8b968] shadow-[0_5px_16px_rgba(0,0,0,0.18)] transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-[#111111] disabled:pointer-events-none disabled:opacity-35 md:flex"><ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /></button>
      <div ref={viewportRef} className="project-carousel-viewport overflow-x-auto px-0 scroll-smooth md:px-6">
        <div className="flex items-stretch gap-4">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} delay={index * 0.04} />)}
        </div>
      </div>
      <button type="button" onClick={() => move(1)} disabled={!canScrollRight} aria-label="Next properties" className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4af37]/60 bg-[#0a0a0a] text-[#d8b968] shadow-[0_5px_16px_rgba(0,0,0,0.18)] transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-[#111111] disabled:pointer-events-none disabled:opacity-35 md:flex"><ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></button>
      <div className="mt-3 flex justify-center gap-3 md:hidden">
        <button type="button" onClick={() => move(-1)} disabled={!canScrollLeft} aria-label="Previous properties" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/60 bg-[#0a0a0a] text-[#d8b968] transition hover:bg-[#d4af37] hover:text-[#111111] disabled:pointer-events-none disabled:opacity-35"><ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /></button>
        <button type="button" onClick={() => move(1)} disabled={!canScrollRight} aria-label="Next properties" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/60 bg-[#0a0a0a] text-[#d8b968] transition hover:bg-[#d4af37] hover:text-[#111111] disabled:opacity-35"><ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></button>
      </div>
    </div>);
}
