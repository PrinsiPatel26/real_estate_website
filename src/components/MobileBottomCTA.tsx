import React from 'react';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { brand, mailLink, whatsappLink, callLink } from '../data/brand';
import { WhatsAppIcon } from './WhatsAppIcon';

interface MobileBottomCTAProps { message?: string; }

export function MobileBottomCTA({ message }: MobileBottomCTAProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] border-t border-gold/25 bg-ink-900/98 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_rgba(0,0,0,0.3)] md:hidden">
      <div className="mx-auto grid h-[72px] max-w-xl grid-cols-3">
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noreferrer"
          className="flex h-16 flex-col items-center justify-center gap-1 border-r border-gold/15 text-gold"
          aria-label="Chat with Chauhan Realtors on WhatsApp">

          <WhatsAppIcon className="h-4 w-4 object-contain" />
          <span className="text-[0.6rem] uppercase tracking-micro">WhatsApp</span>
        </a>
        <a
          href={mailLink()}
          aria-label="Email Chauhan Realtors"
          className="flex h-16 flex-col items-center justify-center gap-1 border-r border-gold/15 text-gold">

          <MailIcon className="h-4 w-4" aria-hidden="true" />
          <span className="text-[0.6rem] uppercase tracking-micro">Email</span>
        </a>
        <a
          href={callLink(brand.founder.phone)}
          aria-label="Call Chauhan Realtors"
          className="flex h-16 flex-col items-center justify-center gap-1 text-paper/85">
          
          <PhoneIcon className="h-4 w-4" aria-hidden="true" />
          <span className="text-[0.6rem] uppercase tracking-micro">Call Us</span>
        </a>
      </div>
    </div>);

}