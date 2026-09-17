import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { legalPages } from '../data/site';
import { PageHeader } from '../components/PageHeader';
import { Reveal, GoldLine } from '../components/Reveal';

type LegalKey = keyof typeof legalPages;

const isLegalKey = (value: string | undefined): value is LegalKey =>
value === 'privacy' || value === 'terms' || value === 'disclaimer';

export function Legal() {
  const { doc } = useParams<{doc: string;}>();
  const key: LegalKey = isLegalKey(doc) ? doc : 'disclaimer';
  const page = legalPages[key];

  useSeo({
    title: page.title + ' | Chauhan Realtors',
    description: page.intro
  });

  if (!isLegalKey(doc)) return <Navigate to="/legal/disclaimer" replace />;

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={page.title}
        intro={page.intro}
        crumbs={[{ label: 'Home', to: '/' }, { label: page.title }]} />
      

      <div className="bg-ink-900 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-10">
          <div className="space-y-12">
            {page.sections.map((section, index) =>
            <Reveal key={section.heading} delay={index * 0.04}>
                <section>
                  <h2 className="font-display text-2xl font-light text-paper">{section.heading}</h2>
                  <GoldLine className="mt-4" width="2.5rem" />
                  <p className="mt-5 text-[0.92rem] leading-relaxed text-paper/60">{section.body}</p>
                </section>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.08}>
            <p className="mt-16 border-t border-gold/10 pt-8 text-[0.72rem] leading-relaxed text-paper/40">
              Chauhan Realtors is a real estate consultancy and is not the promoter or developer of
              the projects presented on this website. For any project, the particulars recorded with
              the Haryana Real Estate Regulatory Authority at haryanarera.gov.in should be treated
              as the controlling source.
            </p>
          </Reveal>
        </div>
      </div>
    </>);

}