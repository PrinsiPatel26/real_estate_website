import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircleIcon,
  PhoneIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon } from
'lucide-react';
import { brand, navigation, whatsappLink, callLink, mailLink, DISCLAIMER_SHORT } from '../data/brand';
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
    <footer className="border-t border-gold/15 bg-ink-900">
      <div className="mx-auto max-w-shell px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="inline-flex items-center rounded-sm bg-ink-800 px-3 py-2 ring-1 ring-gold/20">
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-14 w-auto max-w-[170px] object-contain" />
              
            </span>
            <p className="mt-5 font-display text-lg italic text-gold-bright">{brand.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/55">
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
                      className="flex h-10 w-10 items-center justify-center border border-gold/25 text-gold transition-colors duration-150 ease-lux hover:border-gold hover:bg-gold hover:text-ink-900">
                      
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>);

              })}
            </ul>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="eyebrow text-gold/80">Navigation</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) =>
              <li key={item.to}>
                  <Link
                  to={item.to}
                  className="text-sm text-paper/60 transition-colors duration-150 ease-lux hover:text-gold-bright">
                  
                    {item.label}
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <nav aria-label="Projects">
            <h2 className="eyebrow text-gold/80">Projects</h2>
            <ul className="mt-5 space-y-3">
              {projects.map((project) =>
              <li key={project.slug}>
                  <Link
                  to={`/projects/${project.slug}`}
                  className="text-sm text-paper/60 transition-colors duration-150 ease-lux hover:text-gold-bright">
                  
                    {project.name}
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-gold/80">Contact</h2>
            <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed text-paper/60">
              {brand.office.lines.map((line) =>
              <span key={line} className="block">
                  {line}
                </span>
              )}
            </address>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-paper/70 transition-colors duration-150 ease-lux hover:text-gold-bright">
                  
                  <MessageCircleIcon className="h-4 w-4 text-gold" aria-hidden="true" />
                  WhatsApp {brand.whatsapp.display}
                </a>
              </li>
              <li>
                <a
                  href={callLink(brand.founder.phone)}
                  className="inline-flex items-center gap-2 text-paper/70 transition-colors duration-150 ease-lux hover:text-gold-bright">
                  
                  <PhoneIcon className="h-4 w-4 text-gold" aria-hidden="true" />
                  {brand.founder.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mailLink()}
                  className="inline-flex items-start gap-2 break-all text-paper/70 transition-colors duration-150 ease-lux hover:text-gold-bright">
                  
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-gold/10 pt-8">
          <p className="max-w-4xl text-[0.7rem] leading-relaxed text-paper/40">{DISCLAIMER_SHORT}</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.7rem] text-paper/45">© 2026 Chauhans Realtors. All Rights Reserved.</p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalLinks.map((item) =>
              <li key={item.to}>
                  <Link
                  to={item.to}
                  className="text-[0.7rem] text-paper/45 transition-colors duration-150 ease-lux hover:text-gold">
                  
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