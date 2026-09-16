import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon, MapPinIcon } from 'lucide-react';
import { projects } from '../data/projects';
import { gurgaonCorridors } from '../data/site';
import { SectionHeading } from './SectionHeading';
import { Reveal, LUX } from './Reveal';

/** Stylised corridor geometry — a diagram of the Gurgaon belt, not a survey map. */
const ROUTES = [
'M 4 26 C 26 18, 48 14, 74 8',
'M 6 72 C 28 58, 52 46, 92 30',
'M 88 20 C 80 40, 72 58, 64 88',
'M 34 92 C 44 74, 52 56, 58 30'];


export function LocationSection() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const reduce = useReducedMotion();
  const active = projects.find((project) => project.id === activeId) ?? projects[0];

  return (
    <section id="location" aria-labelledby="location-heading" className="bg-ink-900 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-[90%] max-w-shell">
        <SectionHeading
          id="location-heading"
          eyebrow="Explore Gurgaon"
          lines={['Connected To', 'What Matters.']}>
          
          <p>
            Our projects sit across the corridors that define residential Gurgaon. Select a marker
            to see where each address sits within the city.
          </p>
        </SectionHeading>

        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-10">
          <Reveal className="h-full">
            <div className="relative h-[460px] w-full overflow-hidden border border-gold/20 bg-ink-800 sm:h-[560px] md:h-[660px] lg:h-full lg:min-h-[760px]">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full">
                
                <defs>
                  <pattern id="cr-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#C9A24D" strokeWidth="0.12" opacity="0.18" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#cr-grid)" />
                {ROUTES.map((d, index) =>
                <motion.path
                  key={d}
                  d={d}
                  fill="none"
                  stroke="#C9A24D"
                  strokeWidth="0.35"
                  strokeLinecap="round"
                  opacity="0.6"
                  initial={reduce ? undefined : { pathLength: 0 }}
                  whileInView={reduce ? undefined : { pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: LUX }} />

                )}
              </svg>

              <span className="absolute bottom-4 left-4 z-10 text-[0.55rem] uppercase tracking-micro text-paper/30">
                Indicative diagram — not to scale
              </span>

              <ul>
                {projects.map((project) => {
                  const isActive = project.id === activeId;
                  return (
                    <li
                      key={project.id}
                      className="absolute"
                      style={{ left: `${project.map.x}%`, top: `${project.map.y}%` }}>
                      
                      <button
                        type="button"
                        onMouseEnter={() => setActiveId(project.id)}
                        onFocus={() => setActiveId(project.id)}
                        onClick={() => setActiveId(project.id)}
                        aria-pressed={isActive}
                        className="group relative -translate-x-1/2 -translate-y-1/2 p-2">
                        
                        <span className="sr-only">
                          {project.name}, {project.map.sector}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`relative block h-3 w-3 rotate-45 border transition-colors duration-150 ease-lux ${
                          isActive ?
                          'border-gold-bright bg-gold-bright' :
                          'border-gold bg-ink-900 group-hover:bg-gold'}`
                          } />
                        
                        {isActive && !reduce ?
                        <motion.span
                          aria-hidden="true"
                          className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/50"
                          animate={{ opacity: [0.6, 0], scale: [0.6, 1.4] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }} /> :

                        null}
                        <span
                          className={`pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-[0.55rem] uppercase tracking-micro transition-colors duration-150 ease-lux ${
                          isActive ? 'text-gold-bright' : 'text-paper/45'}`
                          }>
                          
                          {project.map.sector}
                        </span>
                      </button>
                    </li>);

                })}
              </ul>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal delay={0.06}>
              <motion.article
                key={active.id}
                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: LUX }}
                className="border border-gold/25 bg-ink-800 p-7 sm:p-8">
                
                <p className="text-[0.6rem] uppercase tracking-micro text-paper/45">{active.developer}</p>
                <h3 className="mt-3 font-display text-[1.75rem] font-light leading-tight text-paper">
                  {active.name}
                </h3>
                <p className="mt-3 flex items-start gap-1.5 text-[0.78rem] text-gold">
                  <MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {active.location}
                </p>
                <p className="mt-4 text-[0.85rem] leading-relaxed text-paper/55">{active.tagline}</p>
                <p className="mt-5 border-t border-gold/10 pt-4 text-[0.62rem] uppercase tracking-micro text-paper/40">
                  Corridor · <span className="text-paper/70">{active.map.corridor}</span>
                </p>
                <Link
                  to={`/projects/${active.slug}`}
                  className="group mt-6 inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-micro text-gold transition-colors duration-150 ease-lux hover:text-gold-bright">
                  
                  Explore Project
                  <ArrowRightIcon
                    className="h-3.5 w-3.5 transition-transform duration-150 ease-lux group-hover:translate-x-1"
                    aria-hidden="true" />
                  
                </Link>
              </motion.article>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="eyebrow text-gold/80">Corridors &amp; Areas We Cover</h3>
              <ul className="mt-5 grid gap-px bg-gold/10 sm:grid-cols-2 lg:grid-cols-1">
                {gurgaonCorridors.map((corridor) =>
                <li key={corridor.name} className="bg-ink-900 px-4 py-3.5">
                    <p className="text-[0.82rem] text-paper/85">{corridor.name}</p>
                    <p className="mt-1 text-[0.7rem] text-paper/40">{corridor.note}</p>
                  </li>
                )}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>);

}