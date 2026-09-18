import React from 'react';
import { whatsappLink, GENERAL_WHATSAPP_MESSAGE } from '../data/brand';

interface WhatsAppButtonProps {
  message?: string;
  /** Lifted above the sticky mobile CTA on project detail pages. */
  raised?: boolean;
}

export function WhatsAppButton({ message = GENERAL_WHATSAPP_MESSAGE, raised = false }: WhatsAppButtonProps) {
  return (
    <div className={`group fixed bottom-4 right-4 z-[9999] hidden md:block md:bottom-6 md:right-6 ${raised ? 'md:bottom-6' : ''}`}>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Chauhan Realtors on WhatsApp"
        title="How can I help you?"
        className="inline-flex h-[52px] items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-[0.92rem] font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-250 ease-out hover:-translate-y-0.5 hover:brightness-110 sm:px-5 sm:py-3 md:px-7 md:text-[0.95rem]"
      >
        How can I help you?
      </a>
    </div>);

}