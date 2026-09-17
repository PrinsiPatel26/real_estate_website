import React from 'react';
import { useSeo } from '../hooks/useSeo';
import { PageHeader } from '../components/PageHeader';
import { ServicesSection } from '../components/ServicesSection';
import { ApproachSection } from '../components/ApproachSection';
import { ContactSection } from '../components/ContactSection';

export function Services() {
  useSeo({ title: 'Services | Chauhan Realtors', description: 'Personalised property buying, selling, investment and site visit assistance across Gurgaon.' });
  return <><PageHeader eyebrow="Services" title="Guidance for the decisions that matter." intro="Practical, personal assistance from first conversation to a clearer property decision." crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]} /><ServicesSection /><ApproachSection /><ContactSection /></>;
}
