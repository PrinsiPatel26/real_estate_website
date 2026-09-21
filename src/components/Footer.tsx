import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon } from
'lucide-react';
import { brand, navigation, callLink, mailLink, DISCLAIMER_SHORT } from '../data/brand';
import { projects } from '../data/projects';

const socialIcon: Record<string, typeof FacebookIcon> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedinIcon
};

const legalLinks = [
{ label: 'Privacy Policy', to: '/legal/privacy' },
{ label: 'Terms & Conditions', to: '/legal/terms' },
{ label: 'Disclaimer', to: '/legal/disclaimer' }];


export function Footer() {
  return (
    <footer className="border-t border-[#d4af37]/30 bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-shell px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="inline-flex h-12 w-fit items-center justify-center rounded-sm border border-[#d4af37]/20 bg-[#050505]/40 px-2 shadow-sm sm:h-14 lg:h-16">
              <img
                src="/logo_c-removebg-preview.png"
                alt={`${brand.name} logo`}
                className="h-full w-auto max-w-[132px] object-contain sm:max-w-[158px] lg:max-w-[180px]" />
              
            </span>
            <p className="mt-5 font-display text-lg text-[#c9a227]">{brand.tagline}</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Premium residential guidance across Gurgaon — curated opportunities, transparent
              information and personal assistance from the first conversation to possession.
            </p>
            <ul className="mt-6 flex items-center gap-3">
              {brand.social.map((item) => {
                const Icon = socialIcon[item.label];
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${brand.name} on ${item.label} — ${item.handle}`}
                      className="flex h-10 w-10 items-center justify-center border border-[#d4af37]/30 text-[#d8b968] transition-colors duration-150 ease-lux hover:border-[#d4af37] hover:bg-[#c9a24a] hover:text-[#0a0a0a]">
                      
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>);

              })}
            </ul>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="eyebrow text-[#c9a227]">Navigation</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) =>
              <li key={item.to}>
                  <Link
                  to={item.to}
                  className="text-sm text-white/60 transition-colors duration-150 ease-lux hover:text-[#d8b968]">
                  
                    {item.label}
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <nav aria-label="Projects">
            <h2 className="eyebrow text-[#c9a227]">Projects</h2>
            <ul className="mt-5 space-y-3">
              {projects.map((project) =>
              <li key={project.slug}>
                  <Link
                  to={`/projects/${project.slug}`}
                  className="text-sm text-white/60 transition-colors duration-150 ease-lux hover:text-[#d8b968]">
                  
                    {project.name}
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-[#c9a227]">Contact</h2>
            <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed text-white/60">
              {brand.office.lines.map((line) =>
              <span key={line} className="block">
                  {line}
                </span>
              )}
            </address>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={callLink(brand.founder.phone)}
                  className="inline-flex items-center gap-2 text-white/80 transition-colors duration-150 ease-lux hover:text-[#d8b968]">
                  
                  <PhoneIcon className="h-4 w-4 text-[#c9a227]" aria-hidden="true" />
                  {brand.founder.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mailLink()}
                  className="inline-flex items-start gap-2 break-all text-white/80 transition-colors duration-150 ease-lux hover:text-[#d8b968]">
                  
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a227]" aria-hidden="true" />
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-[#d4af37]/25 pt-8">
          <p className="max-w-4xl text-[0.7rem] leading-relaxed text-white/45">{DISCLAIMER_SHORT}</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.7rem] text-white/45">© 2026 Chauhan Realtors. All Rights Reserved.</p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalLinks.map((item) =>
              <li key={item.to}>
                  <Link
                  to={item.to}
                  className="text-[0.7rem] text-white/45 transition-colors duration-150 ease-lux hover:text-[#d8b968]">
                  
                    {item.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>);

}