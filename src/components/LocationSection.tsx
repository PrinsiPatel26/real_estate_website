import React from 'react';
import { MapPinIcon } from 'lucide-react';
import { gurgaonCorridors } from '../data/site';
import { Reveal } from './Reveal';

export function LocationSection() {
  return (
    <section id="location" aria-labelledby="location-heading" className="bg-white py-20 text-[#111111] sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        <Reveal>
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#c9a227]">Gurgaon / Gurugram</p>
          <h2 id="location-heading" className="mt-4 font-display text-4xl font-light sm:text-5xl">A focused footprint across the city.</h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#666666]">Our work is centred on the residential corridors that define Gurgaon. We publish areas by name and keep every project detail verification-dependent.</p>
        </Reveal>
        <ul className="mt-12 grid gap-x-10 border-t border-[#e7e3d8] sm:grid-cols-2 lg:grid-cols-4">
          {gurgaonCorridors.map((corridor) => (
            <li key={corridor.name} className="border-b border-[#e7e3d8] py-5">
              <p className="flex items-center gap-2 text-sm font-medium"><MapPinIcon className="h-4 w-4 text-[#c9a227]" aria-hidden="true" />{corridor.name}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#666666]">{corridor.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
