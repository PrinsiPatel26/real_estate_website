import React from 'react';
import { useSeo } from '../hooks/useSeo';
import { TestimonialsSection } from '../components/TestimonialsSection';

export function Reviews() {
  useSeo({
    title: 'Client Reviews | Chauhan Realtors, Gurgaon',
    description: 'Read genuine client experiences with Chauhan Realtors across Gurgaon and beyond.'
  });

  return <TestimonialsSection fullPage />;
}
