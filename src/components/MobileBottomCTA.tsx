import React from 'react';
import { MessageCircleIcon, PhoneIcon } from 'lucide-react';
import { brand, callLink, whatsappLink } from '../data/brand';
import { WhatsAppIcon } from './WhatsAppIcon';

const INQUIRY_MESSAGE = 'Hello Chauhan Realtors, I would like to make a property inquiry. Please share more details.';

export function MobileBottomCTA() {
  return (
    <div className="mobile-action-bar fixed inset-x-0 bottom-0 z-[9998] border-t border-[#d4af37]/25 bg-[#05080a]/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_rgba(0,0,0,0.22)] backdrop-blur-md md:hidden">
      <div className="mx-auto grid min-h-[68px] max-w-xl grid-cols-3">
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Chauhan Realtors on WhatsApp"
          className="flex min-h-11 h-full flex-col items-center justify-center gap-1 border-r border-white/10 text-[#25d366] transition-transform active:scale-[0.97]">
          <WhatsAppIcon className="h-5 w-5" />
          <span className="text-[0.62rem] font-medium uppercase tracking-[0.14em]">WhatsApp</span>
        </a>
        <a
          href={whatsappLink(INQUIRY_MESSAGE)}
          target="_blank"
          rel="noreferrer"
          aria-label="Make a property inquiry on WhatsApp"
          className="flex min-h-11 h-full flex-col items-center justify-center gap-1 border-r border-white/10 bg-[#d4af37] text-[#111111] transition-transform active:scale-[0.97]">
          <MessageCircleIcon className="h-5 w-5" aria-hidden="true" />
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em]">Inquiry</span>
        </a>
        <a
          href={callLink(brand.founder.phone)}
          aria-label="Call Chauhan Realtors"
          className="flex min-h-11 h-full flex-col items-center justify-center gap-1 text-white transition-transform active:scale-[0.97]">
          <PhoneIcon className="h-5 w-5" aria-hidden="true" />
          <span className="text-[0.62rem] font-medium uppercase tracking-[0.14em]">Call</span>
        </a>
      </div>
    </div>);

}