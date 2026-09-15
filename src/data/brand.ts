export const brand = {
  name: 'Chauhans Realtors',
  tagline: 'Building Trust, Creating Future',
  logo: "/image.png",
  founder: {
    name: 'Dharmendra Pratap Singh',
    role: 'Founder, Chauhans Realtors',
    designation: 'Founder',
    photo: "/image-1.png",
    phone: '+917895296699',
    phoneDisplay: '+91 78952 96699'
  },
  whatsapp: { number: '919625868606', display: '+91 96258 68606' },
  email: 'chauhansrealtors@gmail.com',
  office: {
    lines: ['SVH Metro Street', 'Sector 84, Gurgaon', 'Haryana, India'],
    mapQuery: 'SVH Metro Street, Sector 84, Gurgaon, Haryana'
  },
  social: [
  { label: 'Facebook', handle: 'Chauhans Realtors', href: 'https://www.facebook.com/chauhansrealtors' },
  { label: 'Instagram', handle: '@chauhanerealtors2023', href: 'https://www.instagram.com/chauhanerealtors2023/' },
  { label: 'LinkedIn', handle: 'Chauhan Realtors', href: 'https://www.linkedin.com/company/chauhan-realtors' }]

};

export const navigation = [
{ label: 'Home', to: '/' },
{ label: 'About', to: '/about' },
{ label: 'Projects', to: '/projects' },
{ label: 'Why Chauhans', to: '/why-chauhans' },
{ label: 'Location', to: '/location' },
{ label: 'Contact', to: '/contact' }];


export const GENERAL_WHATSAPP_MESSAGE =
'Hello Chauhans Realtors, I am interested in your property listings. Please share available projects and details.';

export const whatsappLink = (message: string = GENERAL_WHATSAPP_MESSAGE) =>
'https://wa.me/' + brand.whatsapp.number + '?text=' + encodeURIComponent(message);

export const projectWhatsappMessage = (name: string) =>
'Hello Chauhans Realtors, I am interested in ' +
name +
'. Please share price, floor plan and availability.';

export const siteVisitMessage = (name: string) =>
'Hello Chauhans Realtors, I would like to schedule a site visit for ' +
name +
'. Please share available slots.';

export const brochureMessage = (name: string) =>
'Hello Chauhans Realtors, please share the brochure and latest details for ' + name + '.';

export const callLink = (phone: string) => 'tel:' + phone;

export const mailLink = (subject = 'Property enquiry - Chauhans Realtors') =>
'mailto:' + brand.email + '?subject=' + encodeURIComponent(subject);

export const mapsEmbedSrc =
'https://www.google.com/maps?q=' + encodeURIComponent(brand.office.mapQuery) + '&output=embed';

export const mapsDirectionsLink =
'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(brand.office.mapQuery);

export const DISCLAIMER_SHORT =
'Property information, pricing, availability, specifications, floor plans, images and amenities are subject to change and should be independently verified with the respective developer/promoter before making any investment or purchase decision.';

export const DISCLAIMER_VISUALS =
'Images and visuals may be artistic representations and may differ from the final development.';