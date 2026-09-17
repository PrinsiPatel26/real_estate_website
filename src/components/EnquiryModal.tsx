import React, { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { EnquiryForm } from './EnquiryForm';

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
}

export function EnquiryModal({ open, onClose }: EnquiryModalProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9000] flex items-center justify-center overflow-y-auto bg-ink-900/85 p-3 backdrop-blur-sm sm:p-6"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}>
          <motion.div
            className="relative my-auto w-full max-w-5xl overflow-y-auto border border-gold/25 bg-ink-900 shadow-2xl shadow-black/50 sm:max-h-[90vh]"
            initial={reduce ? undefined : { opacity: 0, y: 18, scale: 0.98 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 18, scale: 0.98 }}>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close enquiry form"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center border border-gold/50 text-gold transition-colors hover:bg-gold hover:text-ink-900">
              <XIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="hidden border-r border-gold/15 bg-ink-800 p-10 lg:block">
                <p className="eyebrow text-gold">Chauhan Realtors</p>
                <h2 id="enquiry-modal-title" className="mt-5 max-w-sm font-display text-4xl font-light leading-tight text-paper">
                  Find Your Next Address
                </h2>
                <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
                  Tell us what you&apos;re looking for and our property consultant will get in touch with you.
                </p>
                <img src="/image-1.png" alt="Dharmendra Pratap Singh, Founder" className="mt-10 aspect-[4/5] w-full object-cover object-top" />
              </div>
              <div className="p-5 pt-16 sm:p-8 sm:pt-16 lg:p-10">
                <div className="lg:hidden">
                  <p className="eyebrow text-gold">Chauhan Realtors</p>
                  <h2 className="mt-4 font-display text-3xl font-light text-paper">Find Your Next Address</h2>
                  <p className="mt-3 text-sm leading-relaxed text-paper/60">Tell us what you&apos;re looking for and our property consultant will get in touch with you.</p>
                </div>
                <div className="mt-6 lg:mt-0">
                  <EnquiryForm source="enquiry-modal" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}