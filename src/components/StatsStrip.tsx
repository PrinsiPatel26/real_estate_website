import React from 'react';
import { LayersIcon, MapPinIcon, UserCheckIcon, CarFrontIcon } from 'lucide-react';
import { heroStats } from '../data/site';
import { Reveal } from './Reveal';

const icons = [LayersIcon, MapPinIcon, UserCheckIcon, CarFrontIcon];

export function StatsStrip() {
  return (
    <section aria-label="How we work" className="relative z-10 border-y border-[#d4af37]/25 bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-shell px-5 lg:px-10">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {heroStats.map((stat, index) => {
            const Icon = icons[index];
            return (
              <Reveal
                as="li"
                key={stat.title}
                delay={index * 0.05}
                className={`flex gap-4 border-gold/10 py-7 lg:py-9 ${
                index !== 0 ? 'border-t sm:pl-6 lg:border-t-0 lg:border-l' : ''} ${
                index === 1 ? 'sm:border-t-0 sm:border-l' : ''} ${index === 2 ? 'sm:pl-0 lg:pl-6' : ''} ${
                index === 3 ? 'sm:border-l' : ''}`
                }>
                
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#c9a24a]" aria-hidden="true" />
                <div className="min-w-0 pr-4">
                  <h3 className="font-display text-lg leading-snug text-white">{stat.title}</h3>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-white/55">{stat.text}</p>
                </div>
              </Reveal>);

          })}
        </ul>
      </div>
    </section>);

}