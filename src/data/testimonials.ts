export interface Testimonial {
  id: string;
  name: string;
  location: string;
  clientType: string;
  rating: number;
  review: string;
  placeholder?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 'client-story-01',
    name: 'Client story pending',
    location: 'Gurgaon',
    clientType: 'Home buyer',
    rating: 5,
    review: 'Approved client wording will appear here once shared with consent.',
    placeholder: true
  },
  {
    id: 'client-story-02',
    name: 'Client story pending',
    location: 'Gurgaon',
    clientType: 'Property investor',
    rating: 5,
    review: 'Approved client wording will appear here once shared with consent.',
    placeholder: true
  },
  {
    id: 'client-story-03',
    name: 'Client story pending',
    location: 'Gurgaon',
    clientType: 'Home buyer',
    rating: 5,
    review: 'Approved client wording will appear here once shared with consent.',
    placeholder: true
  },
  {
    id: 'client-story-04',
    name: 'Client story pending',
    location: 'Gurgaon',
    clientType: 'Property seeker',
    rating: 5,
    review: 'Approved client wording will appear here once shared with consent.',
    placeholder: true
  },
  {
    id: 'client-story-05',
    name: 'Client story pending',
    location: 'Gurgaon',
    clientType: 'Residential buyer',
    rating: 5,
    review: 'Approved client wording will appear here once shared with consent.',
    placeholder: true
  },
  {
    id: 'client-story-06',
    name: 'Client story pending',
    location: 'Gurgaon',
    clientType: 'Investor',
    rating: 5,
    review: 'Approved client wording will appear here once shared with consent.',
    placeholder: true
  }
];
