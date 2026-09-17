import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AlertCircleIcon, CheckIcon, DownloadIcon, Loader2Icon, XIcon } from 'lucide-react';
import type { Project } from '../types/project';
import { LUX } from './Reveal';

const BROCHURE_WHATSAPP_NUMBER = '919625866060';

interface BrochureLeadModalProps {
  open: boolean;
  project: Project;
  onClose: () => void;
}

interface Values {
  fullName: string;
  phone: string;
  email: string;
  configuration: string;
  budget: string;
  contactTime: string;
  message: string;
}

type Errors = Partial<Record<keyof Values, string>>;

const emptyValues: Values = {
  fullName: '',
  phone: '',
  email: '',
  configuration: '',
  budget: '',
  contactTime: '',
  message: ''
};

const budgetOptions = ['₹1 Cr – ₹2 Cr', '₹2 Cr – ₹3 Cr', '₹3 Cr – ₹5 Cr', '₹5 Cr+', 'Prefer not to say'];
const contactTimeOptions = ['Morning', 'Afternoon', 'Evening', 'Anytime'];

const inputClass = 'h-12 w-full border border-[#e8e6e0] bg-white px-4 text-sm text-[#111111] placeholder:text-[#777777] transition-colors duration-150 ease-lux focus:border-[#c9a227] focus:outline-none';
const labelClass = 'mb-2 block text-[0.62rem] uppercase tracking-[0.2em] text-[#666666]';

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.fullName.trim().length < 2) errors.fullName = 'Please enter your full name.';
  const digits = values.phone.replace(/\D/g, '');
  if (!/^(?:91)?[6-9]\d{9}$/.test(digits)) errors.phone = 'Please enter a valid 10-digit mobile number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-[0.7rem] text-[#a34b3d]"><AlertCircleIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />{message}</p>;
}

export function BrochureLeadModal({ open, project, onClose }: BrochureLeadModalProps) {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const reduce = useReducedMotion();
  const configurations = [project.configuration, 'Other'];

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setValues(emptyValues);
      setErrors({});
      setSubmitting(false);
      setSubmitted(false);
    }
  }, [open, project.id]);

  const update = (key: keyof Values) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0] as keyof Values | undefined;
    if (firstError) {
      document.getElementById(`brochure-${firstError}`)?.focus();
      return;
    }

    setSubmitting(true);
    const message = [
      'Hello Chauhan Realtors,',
      '',
      'I would like to request the brochure for:',
      '',
      `Project: ${project.name}`,
      `Project ID: ${project.id}`,
      '',
      'My Details:',
      '',
      `Name: ${values.fullName.trim()}`,
      `Contact Number: ${values.phone.trim()}`,
      `Email: ${values.email.trim()}`,
      `Preferred Configuration: ${values.configuration || 'Not specified'}`,
      `Budget: ${values.budget || 'Not specified'}`,
      `Preferred Contact Time: ${values.contactTime || 'Not specified'}`,
      `Message: ${values.message.trim() || 'Not specified'}`,
      `Submission Date/Time: ${new Date().toLocaleString('en-IN')}`,
      '',
      'Please share the brochure and further details.',
      '',
      'Thank you.'
    ].join('\n');

    window.open(`https://wa.me/${BROCHURE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    if (project.brochure) window.open(project.brochure, '_blank', 'noopener,noreferrer');
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9500] flex items-center justify-center overflow-y-auto bg-[#111111]/70 p-3 backdrop-blur-sm sm:p-6"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="brochure-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}>
          <motion.div
            className="relative my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-[#e8e6e0] bg-white shadow-[0_25px_80px_rgba(17,17,17,0.2)]"
            initial={reduce ? undefined : { opacity: 0, y: 18, scale: 0.98 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 18, scale: 0.98 }}>
            <button type="button" onClick={onClose} aria-label="Close brochure request" className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center border border-[#e8e6e0] text-[#111111] transition-colors hover:bg-[#c9a227]"><XIcon className="h-4 w-4" aria-hidden="true" /></button>
            <div className="p-6 sm:p-9">
              <p className="eyebrow text-[#c9a227]">Project Brochure</p>
              <h2 id="brochure-modal-title" className="mt-4 pr-10 font-display text-3xl font-light text-[#111111] sm:text-4xl">Get the Brochure</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#666666]">{project.name} · Please share your details to receive the project brochure.</p>

              {submitted ? (
                <div className="mt-8 border border-[#e8e6e0] bg-[#f8f8f6] p-6 text-center sm:p-8">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center border border-[#c9a227] text-[#c9a227]"><CheckIcon className="h-6 w-6" aria-hidden="true" /></span>
                  <h3 className="mt-5 font-display text-2xl font-light text-[#111111]">Thank You</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#666666]">Your brochure request has been sent to WhatsApp.{project.brochure ? ' Your brochure is being opened.' : ' The brochure is currently unavailable, but the team can share it with you.'}</p>
                  <button type="button" onClick={onClose} className="mt-6 border border-[#c9a227] px-6 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-[#c9a227] transition-colors hover:bg-[#c9a227] hover:text-[#111111]">Close</button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div><label className={labelClass} htmlFor="brochure-fullName">Full Name <span className="text-[#c9a227]">*</span></label><input id="brochure-fullName" value={values.fullName} onChange={update('fullName')} className={inputClass} placeholder="Enter your full name" autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'error-brochure-fullName' : undefined} /> <FieldError id="error-brochure-fullName" message={errors.fullName} /></div>
                  <div><label className={labelClass} htmlFor="brochure-phone">Contact Number <span className="text-[#c9a227]">*</span></label><input id="brochure-phone" value={values.phone} onChange={update('phone')} className={inputClass} placeholder="+91 XXXXX XXXXX" inputMode="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'error-brochure-phone' : undefined} /> <FieldError id="error-brochure-phone" message={errors.phone} /></div>
                  <div className="sm:col-span-2"><label className={labelClass} htmlFor="brochure-email">Email Address <span className="text-[#c9a227]">*</span></label><input id="brochure-email" type="email" value={values.email} onChange={update('email')} className={inputClass} placeholder="Enter your email address" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'error-brochure-email' : undefined} /> <FieldError id="error-brochure-email" message={errors.email} /></div>
                  <div><label className={labelClass} htmlFor="brochure-configuration">Preferred Configuration</label><select id="brochure-configuration" value={values.configuration} onChange={update('configuration')} className={inputClass}><option value="">Select configuration</option>{configurations.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
                  <div><label className={labelClass} htmlFor="brochure-budget">Budget</label><select id="brochure-budget" value={values.budget} onChange={update('budget')} className={inputClass}><option value="">Select your budget</option>{budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
                  <div className="sm:col-span-2"><label className={labelClass} htmlFor="brochure-contactTime">Preferred Contact Time</label><select id="brochure-contactTime" value={values.contactTime} onChange={update('contactTime')} className={inputClass}><option value="">Select preferred time</option>{contactTimeOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
                  <div className="sm:col-span-2"><label className={labelClass} htmlFor="brochure-message">Message / Requirement</label><textarea id="brochure-message" rows={4} value={values.message} onChange={update('message')} className="w-full border border-[#e8e6e0] bg-white px-4 py-3 text-sm text-[#111111] placeholder:text-[#777777] transition-colors focus:border-[#c9a227] focus:outline-none" placeholder="Tell us anything specific about your requirement..." /></div>
                  <button type="submit" disabled={submitting} className="flex h-12 w-full items-center justify-center gap-2 bg-[#c9a227] px-6 text-[0.68rem] uppercase tracking-[0.18em] text-[#111111] transition-all hover:-translate-y-0.5 hover:bg-[#d4af37] disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2">{submitting ? <><Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />Processing...</> : <><DownloadIcon className="h-4 w-4" aria-hidden="true" />Submit &amp; Download Brochure</>}</button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
