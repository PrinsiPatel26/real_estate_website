import React from 'react';
import { useSeo } from '../hooks/useSeo';
import { PageHeader } from '../components/PageHeader';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { FounderSection } from '../components/FounderSection';
import { ContactSection } from '../components/ContactSection';

export function WhyChauhans() {
  useSeo({
    title: 'Why Chauhans Realtors | Trusted Gurgaon Property Guidance',
    description:
    'Trust, curated opportunities, personalised guidance, Gurgaon market knowledge, site visit assistance and long-term relationships - how Chauhans Realtors works.'
  });

  return (
    <>
      <PageHeader
        eyebrow="Why Chauhans"
        title="Six reasons buyers stay with us."
        intro="We would rather be the consultancy that told you to wait than the one that sold you the wrong home."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Why Chauhans' }]} />
      
      <WhyChooseUs />
      <FounderSection />
      <ContactSection />
    </>);

}