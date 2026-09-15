import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircleIcon } from 'lucide-react';
import { whatsappLink, GENERAL_WHATSAPP_MESSAGE } from '../data/brand';

interface WhatsAppButtonProps {
  message?: string;
  /** Lifted above the sticky mobile CTA on project detail pages. */
  raised?: boolean;
}

export function WhatsAppButton({ message = GENERAL_WHATSAPP_MESSAGE, raised = false }: WhatsAppButtonProps) {
  const reduce = useReducedMotion();

  return (
    <div className={`fixed right-4 z-40 sm:right-6 ${raised ? 'bottom-[88px] sm:bottom-6' : 'bottom-5 sm:bottom-6'}`}>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Chauhans Realtors on WhatsApp"
        className="relative flex items-center justify-center border border-gold bg-ink-900 text-gold shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-colors duration-150 ease-lux hover:bg-gold hover:text-ink-900"
        style={{ height: '3.25rem', width: '3.25rem' }}>
        
        {!reduce ?
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 border border-gold/50"
          animate={{ opacity: [0.5, 0], scale: [1, 1.35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }} /> :

        null}
        <MessageCircleIcon className="relative h-5 w-5" aria-hidden="true" />
      </a>
    </div>);

}