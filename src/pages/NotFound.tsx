import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';

export function NotFound() {
  useSeo({
    title: 'Page not found | Chauhan Realtors',
    description: 'The page you were looking for is not available.'
  });

  return (
    <main className="flex min-h-[70svh] w-full items-center justify-center bg-white px-5 py-32">
      <div className="max-w-md text-center">
        <p className="eyebrow text-[#c9a227]">404</p>
        <h1 className="mt-6 font-display text-[2.4rem] font-light leading-tight text-[#111111]">
          This page is not available.
        </h1>
        <p className="mt-5 text-[0.9rem] leading-relaxed text-[#666666]">
          The address you followed may have changed. Our current projects are all listed together.
        </p>
        <Link
          to="/projects"
          className="group mt-9 inline-flex h-12 items-center gap-2 bg-[#c9a227] px-7 text-[0.68rem] uppercase tracking-[0.2em] text-[#111111] transition-colors duration-150 ease-lux hover:bg-[#d4af37]">
          
          View Projects
          <ArrowRightIcon
            className="h-4 w-4 transition-transform duration-150 ease-lux group-hover:translate-x-1"
            aria-hidden="true" />
          
        </Link>
      </div>
    </main>);

}