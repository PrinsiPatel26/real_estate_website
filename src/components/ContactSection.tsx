import React from 'react';
import { PhoneIcon, MailIcon, MapPinIcon, ExternalLinkIcon } from 'lucide-react';
import { brand, whatsappLink, callLink, mailLink, mapsDirectionsLink } from '../data/brand';
import { SectionHeading } from './SectionHeading';
import { EnquiryForm } from './EnquiryForm';
import { Reveal } from './Reveal';
import { WhatsAppIcon } from './WhatsAppIcon';

export function ContactSection({ defaultProject = '' }: {defaultProject?: string;}) {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-white py-16 text-ink-900 sm:py-20 lg:py-24">
      <div className="mx-auto w-[90%] max-w-shell">
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          lines={['Let’s Find Your', 'Next Address.']}>
          
          <p>
            Tell us what you are looking for and we will respond with a considered shortlist — not
            a sales pitch.
          </p>
        </SectionHeading>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <div>
            <Reveal>
              <p className="font-display text-2xl font-light text-paper">{brand.name}</p>
              <address className="mt-4 flex items-start gap-3 text-[0.9rem] not-italic leading-relaxed text-paper/60">
                <MapPinIcon className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {brand.office.lines.map((line) =>
                  <span key={line} className="block">
                      {line}
                    </span>
                  )}
                </span>
              </address>
            </Reveal>

            <Reveal delay={0.05}>
              <ul className="mt-8 divide-y divide-gold/10 border-y border-gold/10">
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 py-4 transition-colors duration-150 ease-lux hover:text-gold-bright">
                    
                    <WhatsAppIcon className="h-4 w-4 shrink-0 object-contain" />
                    <span className="min-w-0">
                      <span className="block text-[0.6rem] uppercase tracking-micro text-paper/40">
                        WhatsApp
                      </span>
                      <span className="block text-[0.92rem] text-paper/85 group-hover:text-gold-bright">
                        {brand.whatsapp.display}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={callLink(brand.founder.phone)}
                    className="group flex items-center gap-4 py-4 transition-colors duration-150 ease-lux hover:text-gold-bright">
                    
                    <PhoneIcon className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-[0.6rem] uppercase tracking-micro text-paper/40">
                        Founder — {brand.founder.name}
                      </span>
                      <span className="block text-[0.92rem] text-paper/85 group-hover:text-gold-bright">
                        {brand.founder.phoneDisplay}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={mailLink()}
                    className="group flex items-center gap-4 py-4 transition-colors duration-150 ease-lux hover:text-gold-bright">
                    
                    <MailIcon className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-[0.6rem] uppercase tracking-micro text-paper/40">
                        Email Us
                      </span>
                      <span className="block break-all text-[0.92rem] text-paper/85 group-hover:text-gold-bright">
                        {brand.email}
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mt-8 eyebrow text-gold/80">Follow</h3>
              <ul className="mt-4 space-y-2">
                {brand.social.map((item) =>
                <li key={item.label}>
                    <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-[0.85rem] text-paper/60 transition-colors duration-150 ease-lux hover:text-gold-bright">
                    
                      <span className="text-paper/40">{item.label}</span>
                      {item.handle}
                      <ExternalLinkIcon className="h-3 w-3 opacity-0 transition-opacity duration-150 ease-lux group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  </li>
                )}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-8 border border-gold/20 p-5">
                <p className="text-sm leading-relaxed text-paper/60">Visit our office at SVH Metro Street, Sector 84, Gurgaon.</p>
              </div>
              <a
                href={mapsDirectionsLink}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-micro text-gold transition-colors duration-150 ease-lux hover:text-gold-bright">
                
                Get directions
                <ExternalLinkIcon className="h-3 w-3" aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <EnquiryForm defaultProject={defaultProject} source="contact-section" id="enquiry" />
          </Reveal>
        </div>
      </div>
    </section>);

}