import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { Reveal, GoldLine } from './Reveal';

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  image?: string;
}

/** Compact page masthead used on every route other than Home. */
export function PageHeader({ eyebrow, title, intro, crumbs, image }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-black/10 bg-white pb-12 pt-28 text-ink-900 sm:pb-16 sm:pt-32 lg:pt-36">
      {image ?
      <>
          <img src={image} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white/80" />
        </> :
      null}

      <div className="mx-auto w-[90%] max-w-shell">
        {crumbs?.length ?
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.62rem] uppercase tracking-micro text-ink-900/50">
              {crumbs.map((crumb, index) =>
            <li key={crumb.label} className="flex items-center gap-1.5">
                  {crumb.to ?
              <Link to={crumb.to} className="transition-colors duration-150 ease-lux hover:text-gold">
                      {crumb.label}
                    </Link> :

              <span className="text-gold/80">{crumb.label}</span>
              }
                  {index < crumbs.length - 1 ?
              <ChevronRightIcon className="h-3 w-3 text-paper/25" aria-hidden="true" /> :
              null}
                </li>
            )}
            </ol>
          </nav> :
        null}

        <Reveal>
          <p className={`eyebrow text-gold ${crumbs?.length ? 'mt-7' : ''}`}>{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <GoldLine className="mt-5" width="3.5rem" />
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-3xl font-display text-[2.3rem] font-light leading-[1.05] tracking-tight text-ink-900 sm:text-[3.2rem] lg:text-[3.8rem]">
            {title}
          </h1>
        </Reveal>
        {intro ?
        <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-ink-900/60">{intro}</p>
          </Reveal> :
        null}
      </div>
    </section>);

}