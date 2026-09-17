import React from 'react';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { brand, mailLink, callLink } from '../data/brand';

interface MobileBottomCTAProps { message?: string; }

export function MobileBottomCTA({ message }: MobileBottomCTAProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[9998] border-t border-[#e8e6e0] bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_rgba(17,17,17,0.08)] md:hidden">
      <div className="mx-auto grid h-[72px] max-w-xl grid-cols-2">
        <a
          href={mailLink()}
          aria-label="Email Chauhan Realtors"
          className="flex h-16 flex-col items-center justify-center gap-1 border-r border-[#e8e6e0] text-[#c9a227]">

          <MailIcon className="h-4 w-4" aria-hidden="true" />
          <span className="text-[0.6rem] uppercase tracking-[0.2em]">Email</span>
        </a>
        <a
          href={callLink(brand.founder.phone)}
          aria-label="Call Chauhan Realtors"
          className="flex h-16 flex-col items-center justify-center gap-1 text-[#111111]">
          
          <PhoneIcon className="h-4 w-4" aria-hidden="true" />
          <span className="text-[0.6rem] uppercase tracking-[0.2em]">Call Us</span>
        </a>
      </div>
    </div>);

}