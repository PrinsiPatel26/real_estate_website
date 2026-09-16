import React from 'react';
import { PhoneIcon, SendIcon } from 'lucide-react';
import { brand, whatsappLink, callLink } from '../data/brand';
import { WhatsAppIcon } from './WhatsAppIcon';

interface MobileBottomCTAProps {
  projectName: string;
  message: string;
  onEnquire: () => void;
}

export function MobileBottomCTA({ projectName, message, onEnquire }: MobileBottomCTAProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-ink-900/97 backdrop-blur-sm sm:hidden">
      <div className="grid grid-cols-3">
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noreferrer"
          className="flex h-16 flex-col items-center justify-center gap-1 border-r border-gold/15 text-gold"
          aria-label={`WhatsApp us about ${projectName}`}>
          
          <WhatsAppIcon className="h-4 w-4 object-contain" />
          <span className="text-[0.6rem] uppercase tracking-micro">WhatsApp</span>
        </a>
        <a
          href={callLink(brand.founder.phone)}
          className="flex h-16 flex-col items-center justify-center gap-1 border-r border-gold/15 text-paper/85"
          aria-label={`Call ${brand.founder.name}`}>
          
          <PhoneIcon className="h-4 w-4" aria-hidden="true" />
          <span className="text-[0.6rem] uppercase tracking-micro">Call</span>
        </a>
        <button
          type="button"
          onClick={onEnquire}
          className="flex h-16 flex-col items-center justify-center gap-1 bg-gold text-ink-900">
          
          <SendIcon className="h-4 w-4" aria-hidden="true" />
          <span className="text-[0.6rem] uppercase tracking-micro">Enquire</span>
        </button>
      </div>
    </div>);

}