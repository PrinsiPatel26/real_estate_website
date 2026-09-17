export interface BlogArticle {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  image: string;
  content: string[];
}

const images = {
  skyline: '/1f9cee63-23c1-42b1-95dc-823c4deeed7d.jpg',
  forestia: '/d0e4d869-aecf-4b58-bb86-f5fdaf31fbf1.jpg',
  interior: '/d35db885-8b98-4def-ad09-e2975e4fbe76.jpg',
  landscape: '/f662c13d-25d9-4046-adda-51fa767738a4.jpg'
};

export const blogs: BlogArticle[] = [
  {
    slug: 'how-to-choose-the-right-property-in-gurgaon',
    category: 'Property Guide',
    date: 'September 2026',
    title: 'How to Choose the Right Property in Gurgaon',
    excerpt: 'A clear framework for comparing location, suitability, documentation and long-term fit.',
    author: 'Chauhan Realtors',
    readTime: '5 min read',
    image: images.skyline,
    content: ['Start with the life the property needs to support, then compare addresses against that requirement.', 'A useful shortlist considers location, access, layout, developer information and the confidence level behind every commercial detail.']
  },
  {
    slug: 'what-to-check-before-buying-a-property',
    category: 'Legal & Documentation',
    date: 'September 2026',
    title: 'What to Check Before Buying a Property',
    excerpt: 'The documents, claims and questions worth reviewing before making a commitment.',
    author: 'Chauhan Realtors',
    readTime: '6 min read',
    image: images.interior,
    content: ['A property decision should be based on documents and current developer communication, not only a brochure.', 'Ask for the exact phase, tower and unit information, then independently verify the details that affect your decision.']
  },
  {
    slug: 'residential-or-investment-property',
    category: 'Investment',
    date: 'August 2026',
    title: 'Residential or Investment Property?',
    excerpt: 'How your purpose changes the way you should evaluate a Gurgaon opportunity.',
    author: 'Chauhan Realtors',
    readTime: '4 min read',
    image: images.forestia,
    content: ['A home and an investment can share an address but require different evaluation criteria.', 'Clarify your timeline, liquidity needs and intended use before comparing properties.']
  },
  {
    slug: 'understanding-property-location-and-connectivity',
    category: 'Gurgaon',
    date: 'August 2026',
    title: 'Understanding Property Location and Connectivity',
    excerpt: 'A grounded way to read Gurgaon corridors without relying on inflated travel-time claims.',
    author: 'Chauhan Realtors',
    readTime: '5 min read',
    image: images.landscape,
    content: ['Gurgaon is a collection of distinct residential corridors. The right location depends on the routes and routines that matter to you.', 'Evaluate the wider road network, daily destinations and the maturity of the surrounding neighbourhood.']
  },
  {
    slug: 'questions-to-ask-before-a-site-visit',
    category: 'Home Buying',
    date: 'July 2026',
    title: 'Questions to Ask Before a Site Visit',
    excerpt: 'Make an on-ground visit more useful with a short, practical list of questions.',
    author: 'Chauhan Realtors',
    readTime: '4 min read',
    image: images.skyline,
    content: ['A site visit is most useful when you arrive with a specific brief and a list of open questions.', 'Look beyond the sample apartment: ask about the exact inventory, access, specifications and what remains to be confirmed.']
  },
  {
    slug: 'a-practical-guide-to-buying-property-in-gurgaon',
    category: 'Market Insights',
    date: 'July 2026',
    title: 'A Practical Guide to Buying Property in Gurgaon',
    excerpt: 'From first shortlist to informed decision, a simple process for navigating the market.',
    author: 'Chauhan Realtors',
    readTime: '7 min read',
    image: images.forestia,
    content: ['Good guidance makes the process clearer without making the decision for you.', 'Build a shortlist, verify the information, visit the most relevant options and move forward only when the fit is understood.']
  }
];
