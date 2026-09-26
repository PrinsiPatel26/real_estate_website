import React from 'react';
import { useSeo } from '../hooks/useSeo';
import { ExternalLinkIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { brand, callLink, mailLink, mapsDirectionsLink, siteVisitMessage, whatsappLink } from '../data/brand';
import { projects } from '../data/projects';
import { EnquiryForm } from '../components/EnquiryForm';
import { Reveal } from '../components/Reveal';

export function Contact() {
  useSeo({
    title: 'Contact | Chauhan Realtors, Sector 84 Gurgaon',
    description:
    'Speak with Chauhan Realtors about premium residential opportunities in Gurgaon. WhatsApp, call or email us, or request a callback from our office in Sector 84.'
  });

  return <>
    <section className="relative flex min-h-[48svh] items-end overflow-hidden bg-[#0b0b0b] pb-14 pt-32 text-white sm:pb-20 lg:min-h-[52svh] lg:pb-24">
      <img src={projects[0].card} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <div className="image-overlay image-overlay-left" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-[calc(100%-2rem)] max-w-[1280px] sm:w-[calc(100%-5rem)]">
        <p className="eyebrow text-[#d4af37]">Contact</p>
        <span className="mt-5 block h-px w-16 bg-[#d4af37]" aria-hidden="true" />
        <h1 className="mt-7 max-w-4xl font-display text-[3rem] font-medium leading-[1.05] tracking-[-0.03em] !text-white sm:text-[4.5rem] lg:text-[5.5rem]">Let&apos;s Find Your <span className="text-[#d4af37]">Next Address.</span></h1>
        <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-white/75 sm:text-[1.12rem]">Tell us what you are looking for and we will respond with a considered shortlist, current availability and verified project information.</p>
      </div>
    </section>

    <section id="contact" className="bg-[#f2efe8] py-14 text-[#151515] sm:py-20 lg:py-24">
      <div className="mx-auto grid w-[calc(100%-2rem)] max-w-[1280px] gap-10 sm:w-[calc(100%-5rem)] lg:grid-cols-2 lg:gap-16">
        <div id="contact-info">
          <p className="eyebrow text-[#c9a227]">Get In Touch</p>
          <span className="mt-5 block h-px w-14 bg-[#c9a227]" aria-hidden="true" />
          <h2 className="mt-6 max-w-xl font-display text-[2.5rem] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[3.7rem]">Let&apos;s Find Your <span className="block text-[#c9a227]">Next Address.</span></h2>
          <p className="mt-6 max-w-xl text-[1rem] leading-[1.75] text-[#4e4b45] sm:text-[1.08rem]">Tell us what you are looking for and we will respond with a considered shortlist — not a sales pitch.</p>

          <div className="mt-8 divide-y divide-[#b48c32]/25 border-y border-[#b48c32]/25">
            <div className="flex gap-4 py-6"><MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-[#c9a227]" aria-hidden="true" /><div><p className="eyebrow text-[#c9a227]">Location</p><address className="mt-3 text-[1rem] not-italic leading-relaxed text-[#4e4b45]">{brand.office.lines.map((line) => <span key={line} className="block">{line}</span>)}</address></div></div>
            <a href={callLink(brand.founder.phone)} className="group flex gap-4 py-6"><PhoneIcon className="mt-1 h-5 w-5 shrink-0 text-[#c9a227]" aria-hidden="true" /><div><p className="eyebrow text-[#c9a227]">Phone</p><p className="mt-3 text-[1rem] text-[#151515] transition-colors group-hover:text-[#c9a227]">{brand.founder.phoneDisplay}</p></div></a>
            <a href={mailLink()} className="group flex gap-4 py-6"><MailIcon className="mt-1 h-5 w-5 shrink-0 text-[#c9a227]" aria-hidden="true" /><div><p className="eyebrow text-[#c9a227]">Email</p><p className="mt-3 break-all text-[1rem] text-[#151515] transition-colors group-hover:text-[#c9a227]">{brand.email}</p></div></a>
          </div>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow text-[#c9a227]">Follow Us</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">{brand.social.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="text-[0.82rem] text-[#4e4b45] transition-colors hover:text-[#c9a227]">{item.label}</a>)}</div></div><a href={mapsDirectionsLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#c9a227]">Get Directions <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" /></a></div>
        </div>

        <Reveal delay={0.08} className="self-start border border-black/12 bg-[#f7f5f0] p-5 shadow-[0_18px_45px_rgba(17,17,17,0.08)] sm:p-8 lg:p-10"><EnquiryForm source="contact-page" id="enquiry" /></Reveal>
      </div>
    </section>

    <section className="bg-[#f7f5f0] pb-16 sm:pb-24"><div className="mx-auto w-[calc(100%-2rem)] max-w-[1280px] sm:w-[calc(100%-5rem)]"><div className="border border-[#b48c32]/25 bg-[#f2efe8] p-7 sm:p-10"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-center"><div><p className="eyebrow text-[#c9a227]">Visit Us</p><p className="mt-4 text-[1rem] leading-relaxed text-[#4e4b45]">Visit our office at {brand.office.lines.join(', ')}.</p></div><a href={mapsDirectionsLink} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 border border-[#c9a227] px-6 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#c9a227] transition-colors hover:bg-[#c9a227] hover:text-[#111111]">Get Directions <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" /></a></div></div></div></section>

    <section className="bg-[#0b0b0b] py-16 text-white sm:py-20 lg:py-24"><div className="mx-auto flex w-[calc(100%-2rem)] max-w-[1280px] flex-col justify-between gap-8 sm:w-[calc(100%-5rem)] lg:flex-row lg:items-end"><div><p className="eyebrow text-[#d4af37]">Ready To Take The Next Step?</p><h2 className="mt-5 max-w-2xl font-display text-[2.3rem] font-medium leading-[1.08] !text-white sm:text-[3.5rem]">Let&apos;s make your next property decision clearer.</h2></div><div className="flex flex-col gap-3 sm:flex-row"><a href={whatsappLink(siteVisitMessage('a property'))} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center bg-[#c9a227] px-6 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#111111] transition-colors hover:bg-[#d8b968]">Schedule A Visit</a><a href="#contact-info" className="inline-flex h-12 items-center justify-center border border-white/25 px-6 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#c9a227] hover:text-[#d8b968]">Contact Us</a></div></div></section>
  </>;

}