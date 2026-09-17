import React from 'react';
import { whatsappLink, GENERAL_WHATSAPP_MESSAGE } from '../data/brand';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WhatsAppButtonProps {
  message?: string;
  /** Lifted above the sticky mobile CTA on project detail pages. */
  raised?: boolean;
}

export function WhatsAppButton({ message = GENERAL_WHATSAPP_MESSAGE, raised = false }: WhatsAppButtonProps) {
  return (
    <div className={`group fixed bottom-6 right-6 z-[8000] hidden md:block ${raised ? 'md:bottom-6' : ''}`}>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Chauhan Realtors on WhatsApp"
        title="Chat with us on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-ink-900 text-gold shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-transform transition-colors duration-150 ease-lux hover:scale-105 hover:bg-gold hover:text-ink-900"
        >
        <WhatsAppIcon className="relative h-5 w-5 object-contain" />
      </a>
      <span className="pointer-events-none absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-sm border border-gold/20 bg-ink-900 px-3 py-2 text-[0.65rem] text-paper opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
        Chat with us on WhatsApp
      </span>
    </div>);

}