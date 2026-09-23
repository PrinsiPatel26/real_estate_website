import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SearchIcon, XIcon } from 'lucide-react';
import { useCmsData } from '../cms/CmsDataContext';
import { LUX } from './Reveal';

interface NavbarProjectSearchProps {
  onNavigate?: () => void;
}

function searchableText(project: (typeof projects)[number]) {
  return [
    project.name,
    project.registeredAs,
    project.developer,
    project.location,
    project.eyebrow,
    project.tagline,
    project.configuration,
    project.area,
    project.overview.join(' '),
    project.highlights.map(({ title, text }) => `${title} ${text}`).join(' '),
    project.amenities.join(' '),
    project.connectivity.join(' '),
    project.facts.map(({ label, value }) => `${label} ${value}`).join(' ')
  ].filter(Boolean).join(' ').toLowerCase();
}

export function NavbarProjectSearch({ onNavigate }: NavbarProjectSearchProps) {
  const { projects } = useCmsData();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();
  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return projects.filter((project) => searchableText(project).includes(normalizedQuery));
  }, [normalizedQuery]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const resultsPanel = open && normalizedQuery ? (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: -6 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: LUX }}
      className="absolute right-0 top-[calc(100%+10px)] z-[60] w-[min(360px,calc(100vw-2.5rem))] border border-[#e8e6e0] bg-white shadow-[0_20px_60px_rgba(17,17,17,0.08)]">
      {results.length > 0 ? (
        <div className="max-h-[min(60vh,360px)] overflow-y-auto">
          {results.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              onClick={() => {
                close();
                onNavigate?.();
              }}
              className="flex gap-3 border-b border-[#e8e6e0] p-3 last:border-b-0 transition-colors hover:bg-[#f8f8f6]">
              <img
                src={project.card}
                alt=""
                className="h-12 w-16 shrink-0 object-cover"
              />
              <span className="min-w-0">
                <span className="block truncate font-display text-lg leading-tight text-[#111111]">
                  {project.name}
                </span>
                <span className="mt-1 block truncate text-[0.62rem] uppercase tracking-[0.2em] text-[#c9a227]">
                  {project.location}
                </span>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="px-4 py-5">
          <p className="font-display text-xl text-[#111111]">No projects found</p>
          <p className="mt-1 text-xs text-[#666666]">Try another project name or location.</p>
        </div>
      )}
    </motion.div>
  ) : null;

  return (
    <>
      <div className="relative hidden items-center gap-2 sm:flex">
        <motion.div
          initial={false}
          animate={{ width: open ? 260 : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.25, ease: LUX }}
          className="overflow-hidden">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, locations..."
            aria-label="Search projects and locations"
            className="h-10 w-[260px] border-0 bg-white px-3 text-xs text-[#111111] placeholder:text-[#666666] focus:outline-none"
          />
        </motion.div>
        <button
          type="button"
          onClick={() => (open ? close() : setOpen(true))}
          aria-expanded={open}
          aria-label={open ? 'Close project search' : 'Search projects'}
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 text-gold transition-colors duration-150 ease-lux hover:border-gold hover:bg-gold hover:text-ink-900">
          {open ? <XIcon className="h-4 w-4" aria-hidden="true" /> : <SearchIcon className="h-4 w-4" aria-hidden="true" />}
        </button>
        <AnimatePresence>{resultsPanel}</AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close project search' : 'Search projects'}
        className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 text-gold transition-colors duration-150 ease-lux hover:border-gold hover:bg-gold hover:text-ink-900 sm:hidden">
        {open ? <XIcon className="h-4 w-4" aria-hidden="true" /> : <SearchIcon className="h-4 w-4" aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: -8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: LUX }}
            className="absolute inset-x-0 top-full border-t border-[#e8e6e0] bg-white p-4 shadow-[0_20px_60px_rgba(17,17,17,0.08)] sm:hidden">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c9a227]" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, locations..."
                aria-label="Search projects and locations"
                className="h-11 w-full border-0 bg-[#f8f8f6] pl-10 pr-3 text-sm text-[#111111] placeholder:text-[#666666] focus:outline-none"
              />
              <AnimatePresence>{resultsPanel}</AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
