import React from 'react';
import { useSeo } from '../hooks/useSeo';
import { PageHeader } from '../components/PageHeader';
import { ContactSection } from '../components/ContactSection';

export function Contact() {
  useSeo({
    title: 'Contact | Chauhans Realtors, Sector 84 Gurgaon',
    description:
    'Speak with Chauhans Realtors about premium residential opportunities in Gurgaon. WhatsApp, call or email us, or request a callback from our office in Sector 84.'
  });

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's find your next address."
        intro="Tell us what you are looking for and we will respond with a considered shortlist, current availability and verified project information."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
      
      <ContactSection />
    </>);

}