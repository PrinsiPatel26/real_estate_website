import React from 'react';
import { useSeo } from '../hooks/useSeo';
import { PageHeader } from '../components/PageHeader';
import { LocationSection } from '../components/LocationSection';
import { ContactSection } from '../components/ContactSection';

export function Location() {
  useSeo({
    title: 'Location | Chauhan Realtors - Gurgaon Corridors We Cover',
    description:
    'Explore the Gurgaon corridors Chauhan Realtors works across - Dwarka Expressway, Golf Course Extension Road, SPR, New Gurugram, Manesar and more.'
  });

  return (
    <>
      <PageHeader
        eyebrow="Location"
        title="Connected to what matters."
        intro="A focused footprint across the corridors that define residential Gurgaon. We list areas by name and publish no travel time we have not confirmed."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Location' }]} />
      
      <LocationSection />
      <ContactSection />
    </>);

}