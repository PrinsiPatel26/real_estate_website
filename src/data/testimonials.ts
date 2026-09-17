export interface Testimonial {
  id: string;
  name: string;
  location: string;
  clientType?: string;
  rating: number;
  review: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'neha-thakur',
    name: 'Neha Thakur',
    location: 'Gurgaon',
    rating: 5,
    review: 'Outstanding service from Chauhan Realtors! Their team is professional, trustworthy, and always ready to help. They guided me through every step with honesty and made the entire property-buying process smooth and stress-free. I highly recommend Chauhan Realtors to anyone looking for reliable real estate services. Truly a 5-star experience!'
  },
  {
    id: 'akash-awana',
    name: 'Akash Awana',
    location: 'Gurgaon',
    clientType: 'Business Owner',
    rating: 5,
    review: 'Exceptional market knowledge Outstanding communication Personalized approach Efficient and effective work process Strong negotiation skills Genuine care and support Professional and reliable.'
  },
  {
    id: 'gargi-gupta',
    name: 'Gargi Gupta',
    location: 'Gurgaon',
    rating: 5,
    review: 'I had an excellent experience with Chauhan Realtors. Their team is professional, trustworthy, and highly supportive throughout the entire process. They provided clear guidance, maintained complete transparency, and made the property-buying experience smooth and hassle-free. Their dedication to customer satisfaction is truly impressive. I highly recommend Chauhan Realtors to anyone looking for reliable real estate services. Thank you for the outstanding service!'
  },
  {
    id: 'kaushlendra',
    name: 'Kaushlendra',
    location: 'Gurgaon',
    clientType: 'Home Buyer',
    rating: 5,
    review: 'Great Guidance for Property Investment I was looking for an investment property and Chauhan Realtors gave me the best advice. They showed me projects with high appreciation and rental potential. The deal was closed quickly with full transparency. Their market knowledge is excellent. If you want good ROI property, contact Chauhan Realtors. Highly satisfied!'
  },
  {
    id: 'pushpendra-pratap-singh',
    name: 'Pushpendra Pratap Singh',
    location: 'Gurgaon',
    rating: 5,
    review: 'Best Realtors in Gurgaon! Bought my dream home with Chauhan Realtors. Very honest, responsive and knowledgeable team. No hidden charges, no false promises. Got great deals and site visits arranged instantly. If you want a trustworthy property consultant, go with Chauhan Realtors. 10/10'
  },
  {
    id: 'sapna',
    name: 'Sapna',
    location: 'Gurgaon',
    clientType: 'Home Buyer',
    rating: 5,
    review: 'Chauhan Realtors – Best team! Chauhan Realtors ke saath ghar lena bahut easy ho gaya. Bahut ache se samjhaya, sahi price me deal dilwayi aur paperwork me bhi full help ki. Koi jhanjhat nahi, sab transparent. Gurgaon me property leni ho to inhi se contact kare. Thank you Chauhan Realtors team 🙏'
  },
  {
    id: 'jeet-famra',
    name: 'Jeet Famra',
    location: 'Gurgaon',
    clientType: 'Home Buyer',
    rating: 5,
    review: 'Amazing Experience with Chauhan Realtors! I recently bought my property through Chauhan Realtors and the entire process was smooth and transparent. The team was very professional, guided me at every step, and helped me find the perfect home within my budget. They handled all paperwork without any hassle and were available 24×7 for queries. Highly recommend Chauhan Realtors to anyone looking for honest property dealers in Gurgaon. Thank you team!'
  },
  {
    id: 'shikha',
    name: 'Shikha',
    location: 'Dubai',
    clientType: 'NRI Investor',
    rating: 5,
    review: 'Managing a Gurgaon investment from Dubai felt impossible until I met Dharmendra. Site visits over video, honest opinions on every project, paperwork handled end-to-end — I closed my apartment without flying down once.'
  },
  {
    id: 'pratyush',
    name: 'Pratyush',
    location: 'Singapore',
    clientType: 'NRI Investor',
    rating: 5,
    review: 'What I valued most was the patience. Chauhan Realtors showed me options I\'d asked for and quietly rejected two that they felt weren’t right for me. That kind of judgment is rare in this industry.'
  },
  {
    id: 'sudhanshu',
    name: 'Sudhanshu',
    location: 'Singapore',
    clientType: 'NRI Buyer',
    rating: 5,
    review: 'From RERA verification to home-loan coordination and even the registry appointment — everything was handled with military precision. I moved into my Golf Course Road home smoother than I moved into my Singapore condo.'
  }
];
