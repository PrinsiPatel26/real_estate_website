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
    <section className="relative isolate overflow-hidden border-b border-[#e8e6e0] bg-white pb-12 pt-28 text-[#111111] sm:pb-16 sm:pt-32 lg:pt-36">
      {image ?
      <>
          <img src={image} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.30) 45%, rgba(0,0,0,0.12) 100%)'
            }} />
        </> :
      null}

      <div className="relative z-10 mx-auto w-[90%] max-w-shell">
        {crumbs?.length ?
        <nav aria-label="Breadcrumb">
            <ol className={`flex flex-wrap items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.2em] ${image ? 'text-white/75' : 'text-[#666666]'}`}>
              {crumbs.map((crumb, index) =>
            <li key={crumb.label} className="flex items-center gap-1.5">
                  {crumb.to ?
              <Link to={crumb.to} className="transition-colors duration-150 ease-lux hover:text-[#c9a227]">
                      {crumb.label}
                    </Link> :

              <span className="text-[#c9a227]">{crumb.label}</span>
              }
                  {index < crumbs.length - 1 ?
              <ChevronRightIcon className={`h-3 w-3 ${image ? 'text-white/55' : 'text-[#111111]/40'}`} aria-hidden="true" /> :
              null}
                </li>
            )}
            </ol>
          </nav> :
        null}

        <Reveal>
          <p className={`eyebrow text-[#c9a227] ${crumbs?.length ? 'mt-7' : ''}`}>{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <GoldLine className="mt-5" width="3.5rem" />
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className={`mt-6 max-w-3xl font-display text-[2.3rem] font-light leading-[1.02] tracking-[-0.03em] ${image ? 'text-white' : 'text-[#111111]'} sm:text-[3.2rem] lg:text-[4rem]`}>
            {title}
          </h1>
        </Reveal>
        {intro ?
        <Reveal delay={0.12}>
            <p
              className={`mt-6 max-w-2xl text-[0.95rem] leading-relaxed ${image ? 'text-white' : 'text-[#666666]'}`}
              style={image ? { color: 'rgba(255,255,255,0.88)' } : undefined}>
              {intro}
            </p>
          </Reveal> :
        null}
      </div>
    </section>);

}