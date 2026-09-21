import React, { useState } from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Reveal } from './Reveal';

const faqs = [
  {
    question: 'What types of properties do you help clients find?',
    answer: 'We assist clients with residential properties, premium homes, apartments, new developments and selected investment opportunities across Gurgaon.'
  },
  {
    question: 'Which areas in Gurgaon do you cover?',
    answer: 'We help clients explore properties across key Gurgaon locations and sectors, depending on their requirements, budget and preferred connectivity.'
  },
  {
    question: 'How can I get information about a property?',
    answer: 'You can contact us through the website, call us directly or submit an inquiry form. Our team will provide the available project and property information.'
  },
  {
    question: 'Can you arrange a property site visit?',
    answer: 'Yes. You can request a site visit through the website or contact our team to coordinate a convenient date and time.'
  },
  {
    question: 'Do you help first-time property buyers?',
    answer: 'Yes. We provide guidance throughout the property-search process, including understanding requirements, comparing options and coordinating property visits.'
  },
  {
    question: 'Can you help with property investment decisions?',
    answer: 'We can help you understand available property opportunities and provide relevant project information so you can evaluate options based on your own requirements.'
  },
  {
    question: 'What information should I provide when making an inquiry?',
    answer: 'Your name, contact number, preferred property type, approximate budget and any specific location or configuration requirements are helpful.'
  },
  {
    question: 'How do I contact Chauhan Realtors?',
    answer: 'You can contact Chauhan Realtors through the Call button, WhatsApp/inquiry options or the Contact page available on the website.'
  }
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-labelledby="faq-heading" className="bg-[#f2efe8] py-16 text-[#151515] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-shell px-5 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-[#c9a227]">Frequently Asked Questions</p>
          <span className="mx-auto mt-5 block h-px w-14 bg-[#c9a227]" aria-hidden="true" />
          <h2 id="faq-heading" className="mt-6 font-display text-[2.5rem] font-medium leading-[1.08] sm:text-[3.5rem]">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-[#4e4b45]">
            Everything you need to know about finding and choosing the right property in Gurgaon.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl gap-x-10 border-y border-[#b48c32]/30 lg:grid-cols-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <Reveal key={faq.question} delay={index * 0.03}>
                <div className="border-b border-[#b48c32]/30">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left text-[0.92rem] font-medium leading-relaxed text-[#151515] transition-colors hover:text-[#c9a227] sm:text-[1rem]">
                    <span>{faq.question}</span>
                    {isOpen ? <MinusIcon className="h-4 w-4 shrink-0 text-[#c9a227]" aria-hidden="true" /> : <PlusIcon className="h-4 w-4 shrink-0 text-[#c9a227]" aria-hidden="true" />}
                  </button>
                  <div id={answerId} className={`grid transition-[grid-template-rows,opacity] duration-300 ease-lux ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="min-h-0 overflow-hidden">
                      <p className="pb-5 pr-8 text-[0.88rem] leading-relaxed text-[#666666]">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
