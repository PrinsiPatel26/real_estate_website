import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckIcon, AlertCircleIcon, Loader2Icon } from 'lucide-react';
import { projectOptions } from '../data/projects';
import { configurationOptions, budgetOptions, callbackOptions } from '../data/site';
import { submitLead } from '../utils/leadService';
import { LUX } from './Reveal';

interface EnquiryFormProps {
  defaultProject?: string;
  source?: string;
  id?: string;
}

interface Values {
  fullName: string;
  phone: string;
  email: string;
  project: string;
  configuration: string;
  budget: string;
  callbackTime: string;
  message: string;
}

type Errors = Partial<Record<keyof Values, string>>;

const emptyValues = (defaultProject: string): Values => ({
  fullName: '',
  phone: '',
  email: '',
  project: defaultProject,
  configuration: '',
  budget: '',
  callbackTime: '',
  message: ''
});

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.fullName.trim().length < 2) errors.fullName = 'Please enter your full name.';
  const digits = values.phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 13) {
    errors.phone = 'Please enter a valid phone number with at least 10 digits.';
  }
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.project) errors.project = 'Please select a project.';
  return errors;
}

const fieldClass =
'h-12 w-full border border-paper/15 bg-ink-800 px-4 text-sm text-paper placeholder:text-paper/35 transition-colors duration-150 ease-lux focus:border-gold focus:outline-none';
const labelClass = 'mb-2 block text-[0.62rem] uppercase tracking-micro text-paper/55';

function FieldError({ id, message }: {id: string;message?: string;}) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-[0.7rem] text-gold-bright">
      <AlertCircleIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>);

}

export function EnquiryForm({ defaultProject = '', source = 'website', id }: EnquiryFormProps) {
  const [values, setValues] = useState<Values>(emptyValues(defaultProject));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const reduce = useReducedMotion();

  const update =
  (key: keyof Values) =>
  (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const keys = Object.keys(nextErrors);
    if (keys.length > 0) {
      document.getElementById(`enquiry-${keys[0]}`)?.focus();
      return;
    }
    setStatus('sending');
    await submitLead({
      fullName: values.fullName.trim(),
      phone: values.phone.trim(),
      email: values.email.trim() || undefined,
      project: values.project,
      configuration: values.configuration || undefined,
      budget: values.budget || undefined,
      callbackTime: values.callbackTime || undefined,
      message: values.message.trim() || undefined,
      source
    });
    setStatus('done');
  };

  if (status === 'done') {
    return (
      <motion.div
        id={id}
        role="status"
        initial={reduce ? undefined : { opacity: 0, y: 12 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: LUX }}
        className="border border-gold/30 bg-ink-800 p-8 text-center sm:p-12">
        
        <span className="mx-auto flex h-14 w-14 items-center justify-center border border-gold text-gold">
          <CheckIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-light text-paper sm:text-3xl">
          Thank you. Our property consultant will contact you shortly.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-paper/55">
          Your enquiry for <span className="text-gold-bright">{values.project}</span> has been
          recorded. If it is urgent, WhatsApp or call us and we will respond right away.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(emptyValues(defaultProject));
            setStatus('idle');
          }}
          className="mt-8 border border-gold/40 px-6 py-3 text-[0.65rem] uppercase tracking-micro text-gold transition-colors duration-150 ease-lux hover:bg-gold hover:text-ink-900">
          
          Submit another enquiry
        </button>
      </motion.div>);

  }

  return (
    <form id={id} onSubmit={onSubmit} noValidate className="border border-paper/10 bg-ink-800/70 p-6 sm:p-8">
      <h3 className="font-display text-2xl font-light text-paper">Request a Callback</h3>
      <p className="mt-2 text-sm text-paper/55">
        Share a few details and we will come back with a shortlist, current availability and
        verified project information.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="enquiry-fullName">
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            id="enquiry-fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={update('fullName')}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'error-fullName' : undefined}
            className={fieldClass}
            placeholder="Your name" />
          
          <FieldError id="error-fullName" message={errors.fullName} />
        </div>

        <div>
          <label className={labelClass} htmlFor="enquiry-phone">
            Phone Number <span className="text-gold">*</span>
          </label>
          <input
            id="enquiry-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'error-phone' : undefined}
            className={fieldClass}
            placeholder="+91" />
          
          <FieldError id="error-phone" message={errors.phone} />
        </div>

        <div>
          <label className={labelClass} htmlFor="enquiry-email">
            Email
          </label>
          <input
            id="enquiry-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            className={fieldClass}
            placeholder="you@email.com" />
          
          <FieldError id="error-email" message={errors.email} />
        </div>

        <div>
          <label className={labelClass} htmlFor="enquiry-project">
            Preferred Project <span className="text-gold">*</span>
          </label>
          <select
            id="enquiry-project"
            value={values.project}
            onChange={update('project')}
            aria-invalid={Boolean(errors.project)}
            aria-describedby={errors.project ? 'error-project' : undefined}
            className={fieldClass}>
            
            <option value="">Select a project</option>
            {projectOptions.map((option) =>
            <option key={option} value={option}>
                {option}
              </option>
            )}
          </select>
          <FieldError id="error-project" message={errors.project} />
        </div>

        <div>
          <label className={labelClass} htmlFor="enquiry-configuration">
            Preferred Configuration
          </label>
          <select
            id="enquiry-configuration"
            value={values.configuration}
            onChange={update('configuration')}
            className={fieldClass}>
            
            <option value="">Optional</option>
            {configurationOptions.map((option) =>
            <option key={option} value={option}>
                {option}
              </option>
            )}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="enquiry-budget">
            Budget
          </label>
          <select id="enquiry-budget" value={values.budget} onChange={update('budget')} className={fieldClass}>
            <option value="">Optional</option>
            {budgetOptions.map((option) =>
            <option key={option} value={option}>
                {option}
              </option>
            )}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="enquiry-callbackTime">
            Preferred Callback Time
          </label>
          <select
            id="enquiry-callbackTime"
            value={values.callbackTime}
            onChange={update('callbackTime')}
            className={fieldClass}>
            
            <option value="">Optional</option>
            {callbackOptions.map((option) =>
            <option key={option} value={option}>
                {option}
              </option>
            )}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="enquiry-message">
            Message
          </label>
          <textarea
            id="enquiry-message"
            rows={4}
            value={values.message}
            onChange={update('message')}
            className="w-full border border-paper/15 bg-ink-800 px-4 py-3 text-sm text-paper placeholder:text-paper/35 transition-colors duration-150 ease-lux focus:border-gold focus:outline-none"
            placeholder="Anything specific we should know — timeline, floor preference, family requirement." />
          
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-8 flex w-full items-center justify-center gap-2 bg-gold text-[0.7rem] uppercase tracking-micro text-ink-900 transition-colors duration-150 ease-lux hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-10"
        style={{ height: '3.25rem' }}>
        
        {status === 'sending' ?
        <>
            <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending
          </> :

        'Request a Callback'
        }
      </button>

      <p className="mt-4 text-[0.68rem] leading-relaxed text-paper/40">
        By submitting this form you agree to be contacted about your property enquiry. We do not
        share your details with third parties.
      </p>
    </form>);

}