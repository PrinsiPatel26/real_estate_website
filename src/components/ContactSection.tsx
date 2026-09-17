import React from 'react';
import { PhoneIcon, MailIcon, MapPinIcon, ExternalLinkIcon } from 'lucide-react';
import { brand, callLink, mailLink, mapsDirectionsLink } from '../data/brand';
import { SectionHeading } from './SectionHeading';
import { EnquiryForm } from './EnquiryForm';
import { Reveal } from './Reveal';

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-white py-16 text-[#111111] sm:py-20 lg:py-24">
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
              <p className="font-display text-2xl font-light text-[#111111]">{brand.name}</p>
              <address className="mt-4 flex items-start gap-3 text-[0.9rem] not-italic leading-relaxed text-[#666666]">
                <MapPinIcon className="mt-1 h-4 w-4 shrink-0 text-[#c9a227]" aria-hidden="true" />
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
              <ul className="mt-8 divide-y divide-[#e8e6e0] border-y border-[#e8e6e0]">
                <li>
                  <a
                    href={callLink(brand.founder.phone)}
                    className="group flex items-center gap-4 py-4 transition-colors duration-150 ease-lux hover:text-[#c9a227]">
                    
                    <PhoneIcon className="h-4 w-4 shrink-0 text-[#c9a227]" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-[#666666]">
                        Founder — {brand.founder.name}
                      </span>
                      <span className="block text-[0.92rem] text-[#111111] group-hover:text-[#c9a227]">
                        {brand.founder.phoneDisplay}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={mailLink()}
                    className="group flex items-center gap-4 py-4 transition-colors duration-150 ease-lux hover:text-[#c9a227]">
                    
                    <MailIcon className="h-4 w-4 shrink-0 text-[#c9a227]" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-[#666666]">
                        Email Us
                      </span>
                      <span className="block break-all text-[0.92rem] text-[#111111] group-hover:text-[#c9a227]">
                        {brand.email}
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mt-8 eyebrow text-[#c9a227]">Follow</h3>
              <ul className="mt-4 space-y-2">
                {brand.social.map((item) =>
                <li key={item.label}>
                    <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-[0.85rem] text-[#666666] transition-colors duration-150 ease-lux hover:text-[#c9a227]">
                    
                      <span className="text-[#111111]">{item.label}</span>
                      {item.handle}
                      <ExternalLinkIcon className="h-3 w-3 opacity-0 transition-opacity duration-150 ease-lux group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  </li>
                )}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-8 border border-[#e8e6e0] bg-[#f8f8f6] p-5">
                <p className="text-sm leading-relaxed text-[#666666]">Visit our office at SVH Metro Street, Sector 84, Gurgaon.</p>
              </div>
              <a
                href={mapsDirectionsLink}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.2em] text-[#c9a227] transition-colors duration-150 ease-lux hover:text-[#111111]">
                
                Get directions
                <ExternalLinkIcon className="h-3 w-3" aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <EnquiryForm source="contact-section" id="enquiry" />
          </Reveal>
        </div>
      </div>
    </section>);

}