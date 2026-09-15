import type { Project } from '../types/project';

const IMG = {
  hero: "/1f9cee63-23c1-42b1-95dc-823c4deeed7d.jpg",
  forestia: "/d0e4d869-aecf-4b58-bb86-f5fdaf31fbf1.jpg",
  ganga: "/610ca58b-3210-4577-8124-96b0357fa607.jpg",
  ats: "/ced7ae47-5cce-426b-9193-ac5f2f00acd6.jpg",
  wal: "/381847df-c55c-470b-ae67-91ae113b5758.jpg",
  smartworld: "/abdb26f9-1d76-4bb1-a496-4d8861f9ee77.jpg",
  interior: "/d35db885-8b98-4def-ad09-e2975e4fbe76.jpg",
  clubpool: "/d84c87cc-6185-4c7a-89a2-2046be1478e2.jpg",
  landscape: "/f662c13d-25d9-4046-adda-51fa767738a4.jpg",
  clublounge: "/3a842465-2c3f-4991-9d3a-acc7136a4d29.jpg"
};

export const HERO_IMAGE = IMG.hero;
const ON_REQUEST = 'Price on Request';

export const projects: Project[] = [
{
  id: 'm3m-gic-forestia',
  slug: 'm3m-gic-forestia',
  name: 'M3M GIC Forestia',
  registeredAs: 'M3M Forestia West, Gurgaon International City',
  developer: 'M3M India',
  location: 'Gurgaon International City, Manesar, Gurugram',
  eyebrow: 'Forest themed residences',
  tagline: 'A life curated by nature — 3 BHK forest themed residences with expansive decks overlooking greens.',
  overview: [
  'M3M Forestia West is positioned as the first residential address of Gurgaon International City, a self-sustainable integrated development combining living habitats, workspaces, retail and an innovation park.',
  'The project is planned around a vast, immersive central landscape — the Central Grove — with forest trails, water features, a skywalk and a dense native tree palette. The developer material presents architecture, landscape and lifestyle as one continuous experience.',
  'Homes are offered as 3 BHK residences between 1,900 and 2,400 sq. ft., each opening onto expansive decks with green views.'],

  configuration: '3 BHK',
  area: '1,900 – 2,400 sq. ft.',
  price: ON_REQUEST,
  facts: [
  { label: 'Developer', value: 'M3M India', confidence: 'verified' },
  { label: 'Configuration', value: '3 BHK forest themed residences', confidence: 'verified' },
  { label: 'Unit sizes', value: '1,900 – 2,400 sq. ft.', confidence: 'verified' },
  { label: 'Decks', value: 'Expansive decks overlooking greens', confidence: 'verified' },
  { label: 'Floor plates released', value: '1,905 / 1,910 / 2,440 / 2,455 sq. ft.', confidence: 'reference' },
  { label: 'Price', value: ON_REQUEST, confidence: 'onRequest' },
  { label: 'Payment plan', value: 'Current plan available on request', confidence: 'onRequest' },
  { label: 'Possession', value: 'As per agreement / HRERA record', confidence: 'onRequest' }],

  highlights: [
  { title: 'Pivotal Location', text: 'Set within an integrated city with expressway-led regional connectivity.' },
  { title: 'Forest Themed Living', text: 'Residences planned around a dense native forest landscape, not a podium garden.' },
  { title: 'Extravagant Lifestyle', text: 'The Eden Club with leisure, family and kids pools at the heart of the community.' },
  { title: 'Sprawling Central Landscape', text: 'The Central Grove — skywalk, water park, forest trails and eco pond.' },
  { title: 'Wellness Oriented Living', text: 'Café, yoga studio, spa & sauna and a well-equipped gym.' }],

  amenities: [
  'The Eden Club', 'Leisure, family & kids pools', 'Café', 'Yoga studio', 'Spa & sauna',
  'Well-equipped gym', 'Central Grove landscape', 'Skywalk', 'Forest trails',
  'Water park & cascades', 'Amphitheatre', 'Eco pond', 'Jogging & cycling tracks',
  'Sports courts & outdoor gym', 'Kids play area & skate park', 'Pet park',
  'Organic farm', 'Reflexology garden'],

  connectivity: [
  'Dwarka Expressway', 'NH-48', 'KMP Expressway', 'Delhi–Mumbai Expressway',
  'Proposed Sector 56 – Panchgaon metro corridor'],

  floorPlans: [
  { label: '3 BHK — 1,905 sq. ft.', note: 'Released floor plate, indicative' },
  { label: '3 BHK — 1,910 sq. ft.', note: 'Released floor plate, indicative' },
  { label: '3 BHK — 2,440 sq. ft.', note: 'Released floor plate, indicative' },
  { label: '3 BHK — 2,455 sq. ft.', note: 'Released floor plate, indicative' }],

  gallery: [
  { src: IMG.forestia, alt: 'Central landscape with reflecting water body and residential towers at M3M Forestia' },
  { src: IMG.landscape, alt: 'Boardwalk winding through the landscaped Central Grove' },
  { src: IMG.clubpool, alt: 'Clubhouse pool deck set within dense planting' },
  { src: IMG.clublounge, alt: 'Clubhouse lounge interior with sculptural columns' },
  { src: IMG.interior, alt: 'Living and dining space opening onto a deck overlooking greens' }],

  card: IMG.forestia,
  brochure: "/M3M_Forestia_at_GIC_May_26.pdf",
  map: { x: 22, y: 63, sector: 'Manesar / GIC', corridor: 'NH-48 & KMP Expressway' },
  verificationNote:
  'Details reflect the developer presentation for M3M Forestia West. The developer states that contents, images, visuals, computer generated images, maps, floor plans and layouts are representative or artistic renderings for guidance only, are not drawn to scale and may change without notice; materials, designs, square footages, fixtures and amenities shown are for illustration and may not form part of the final offer. Nothing here constitutes a legal offer. Verify all particulars with the promoter and on haryanarera.gov.in.'
},
{
  id: 'ganga-nine-zero',
  slug: 'ganga-nine-zero',
  name: 'Ganga Code Name Nine Zero',
  developer: 'Ganga Realty',
  location: 'Sector 90, Gurugram',
  eyebrow: 'Low density luxury',
  tagline: 'Low-density 3 BHK residences planned around privacy, space and open green planning.',
  overview: [
  'Ganga Code Name Nine Zero is marketed as a low-density luxury residential development in Sector 90, part of the New Gurugram growth corridor.',
  'The proposition rests on restraint rather than scale — a limited number of towers, few apartments per floor core and generously sized 3 BHK residences with utility space.',
  'Sector 90 sits within a fast-developing residential belt with access to Dwarka Expressway, NH-48 and the wider New Gurugram road network.'],

  configuration: '3 BHK / 3 BHK + Utility',
  area: 'Approx. 1,850 sq. ft. (some sources report ~1,900 sq. ft.)',
  price: ON_REQUEST,
  facts: [
  { label: 'Developer', value: 'Ganga Realty', confidence: 'verified' },
  { label: 'Location', value: 'Sector 90, Gurugram', confidence: 'verified' },
  { label: 'Positioning', value: 'Low-density luxury high-rise', confidence: 'verified' },
  { label: 'Land parcel', value: 'Approx. 4.5 acres', confidence: 'reference' },
  { label: 'Towers', value: '3 high-rise towers', confidence: 'reference' },
  { label: 'Homes per floor core', value: 'Approx. 4 apartments', confidence: 'reference' },
  { label: 'Configuration', value: '3 BHK + 3T / utility variants', confidence: 'reference' },
  { label: 'Unit size', value: 'Approx. 1,850 – 1,900 sq. ft.', confidence: 'reference' },
  { label: 'Price', value: ON_REQUEST, confidence: 'onRequest' },
  { label: 'RERA', value: 'To be confirmed before any booking claim', confidence: 'onRequest' }],

  highlights: [
  { title: 'Low Density Planning', text: 'A limited number of towers on a compact parcel, planned for openness over volume.' },
  { title: 'Four Homes Per Core', text: 'Approximately four apartments per floor core is the project’s central privacy proposition.' },
  { title: 'Large 3 BHK Formats', text: 'Spacious 3 BHK and 3 BHK + utility residences with generous living and dining areas.' },
  { title: 'Light & Ventilation', text: 'Project material emphasises natural light, cross ventilation and open views.' },
  { title: 'New Gurugram Address', text: 'Sector 90 sits in an expanding residential corridor with improving infrastructure.' }],

  amenities: [
  'Clubhouse', 'Swimming pool', 'Gymnasium', 'Yoga & meditation spaces',
  'Jogging & walking tracks', 'Indoor recreation', 'Badminton court', 'Billiards room',
  'Landscaped open spaces', 'Children’s play area'],

  connectivity: ['Dwarka Expressway', 'NH-48', 'New Gurugram sector road network'],
  floorPlans: [{ label: '3 BHK + Utility', note: 'Official floor plan available on request' }],
  gallery: [
  { src: IMG.ganga, alt: 'Low-density luxury towers at Ganga Code Name Nine Zero set in landscaped gardens' },
  { src: IMG.interior, alt: 'Premium living and dining space with full-height glazing' },
  { src: IMG.clubpool, alt: 'Clubhouse pool and deck' },
  { src: IMG.landscape, alt: 'Landscaped walkways and water features' }],

  card: IMG.ganga,
  brochure: null,
  map: { x: 47, y: 46, sector: 'Sector 90', corridor: 'New Gurugram' },
  verificationNote:
  'Land area, tower count, floor configuration, unit sizes, pricing, amenities and RERA status are currently reported by project and market sources and are indicative only. Carpet area, super area and room dimensions must be taken from the latest official floor plan, and RERA registration confirmed on haryanarera.gov.in before any commitment.'
},
{
  id: 'smartworld-wellness',
  slug: 'smartworld-wellness',
  name: 'Smartworld Wellness',
  developer: 'Smartworld Developers',
  location: 'Sector 67 / 67A, Gurugram',
  eyebrow: 'Wellness led living',
  tagline: 'Wellness-focused residences where fitness, greenery and community shape the everyday.',
  overview: [
  'Smartworld Wellness is being marketed around Sector 67 / 67A, Gurugram, with a wellness-first residential positioning rather than a conventional amenity list.',
  'The concept centres on movement, greenery and community — fitness and yoga spaces, open landscaped areas and shared social spaces designed for daily use.',
  'Current market references indicate 2 and 3 BHK formats in the approximate 1,350 – 1,750 sq. ft. range. These remain reference figures until confirmed by the developer.'],

  configuration: '2 & 3 BHK (as currently marketed)',
  area: 'Approx. 1,350 – 1,750 sq. ft. (reference)',
  price: ON_REQUEST,
  facts: [
  { label: 'Developer', value: 'Smartworld Developers', confidence: 'verified' },
  { label: 'Positioning', value: 'Wellness-focused residential', confidence: 'verified' },
  { label: 'Location', value: 'Sector 67 / 67A, Gurugram', confidence: 'reference' },
  { label: 'Configuration', value: '2 & 3 BHK formats', confidence: 'reference' },
  { label: 'Unit sizes', value: 'Approx. 1,350 – 1,750 sq. ft.', confidence: 'reference' },
  { label: 'Price', value: ON_REQUEST, confidence: 'onRequest' },
  { label: 'RERA', value: 'To be confirmed for the exact tower and phase', confidence: 'onRequest' },
  { label: 'Possession', value: 'To be confirmed with the developer', confidence: 'onRequest' }],

  highlights: [
  { title: 'Wellness Oriented Living', text: 'The home is planned around health, movement and recovery as daily habits.' },
  { title: 'Green Spaces', text: 'Landscaped open areas and planted courts form the core of the community.' },
  { title: 'Fitness & Yoga', text: 'Dedicated fitness and yoga spaces within the development.' },
  { title: 'Community Lifestyle', text: 'Shared social spaces designed to encourage neighbourhood life.' },
  { title: 'Modern Residences', text: 'Contemporary 2 and 3 BHK formats as currently marketed.' }],

  amenities: [
  'Wellness centre', 'Fitness studio', 'Yoga & meditation deck', 'Swimming pool',
  'Jogging track', 'Landscaped green courts', 'Community lounge',
  'Children’s play area', 'Sports courts', 'Reflexology path'],

  connectivity: ['Golf Course Extension Road', 'Southern Peripheral Road (SPR)', 'Sohna Road corridor'],
  floorPlans: [{ label: '2 & 3 BHK', note: 'Official floor plans available on request' }],
  gallery: [
  { src: IMG.smartworld, alt: 'Wellness court with yoga deck, jogging track and landscaped greens' },
  { src: IMG.clubpool, alt: 'Pool and deck within the wellness community' },
  { src: IMG.interior, alt: 'Contemporary living space with natural light' },
  { src: IMG.landscape, alt: 'Landscaped walking paths and water features' }],

  card: IMG.smartworld,
  brochure: null,
  map: { x: 72, y: 34, sector: 'Sector 67 / 67A', corridor: 'Golf Course Extension Road' },
  verificationNote:
  'Sector, configuration, unit sizes, amenities, pricing, RERA and availability shown here are current market references and remain verification-dependent. No pricing or registration claim should be treated as confirmed until issued by the developer and matched to the exact tower and phase on haryanarera.gov.in.'
},
{
  id: 'ats-homekraft',
  slug: 'ats-homekraft',
  name: 'ATS HomeKraft',
  registeredAs: 'ATS Grandstand / Grandstand Phase 2, Sector 99A',
  developer: 'ATS HomeKraft',
  location: 'Sector 99A, Gurugram',
  eyebrow: 'Dwarka expressway corridor',
  tagline: 'Premium residential opportunity by ATS HomeKraft. Details available on request.',
  overview: [
  'Available project sources match the ATS HomeKraft name in Gurugram to ATS Grandstand and the separately marketed Grandstand Phase 2, both in Sector 99A on the Dwarka Expressway corridor.',
  'The positioning is large-format premium residences with an emphasis on open green space and lifestyle amenities, supported by the ATS brand and an established micro-market.',
  'Because the existing Grandstand and the newer phase carry different specifications, pricing, timelines and RERA registrations, we identify the exact phase, tower and unit for you before sharing any commercial detail.'],

  configuration: '3 & 4 BHK (Phase 2 material emphasises 3 BHK)',
  area: 'Reported around 1,550 – 1,750 sq. ft. for some 3 BHK inventory (reference)',
  price: ON_REQUEST,
  facts: [
  { label: 'Developer', value: 'ATS HomeKraft / ATS group', confidence: 'verified' },
  { label: 'Location', value: 'Sector 99A, Gurugram', confidence: 'verified' },
  { label: 'Micro-market', value: 'Dwarka Expressway / New Gurugram', confidence: 'verified' },
  { label: 'Configuration', value: '3 & 4 BHK reported', confidence: 'reference' },
  { label: '3 BHK sizes', value: 'Approx. 1,550 – 1,750 sq. ft.', confidence: 'reference' },
  { label: 'Land / open space', value: 'Approx. 12 – 13.25 acres; ~80% open green space reported', confidence: 'reference' },
  { label: 'Price', value: ON_REQUEST, confidence: 'onRequest' },
  { label: 'RERA', value: 'Phase-specific — must be matched to the exact tower', confidence: 'onRequest' },
  { label: 'Possession', value: 'Contractual date on request', confidence: 'onRequest' }],

  highlights: [
  { title: 'ATS Brand', text: 'An established residential developer track record in the NCR market.' },
  { title: 'Sector 99A Address', text: 'Dwarka Expressway and NH-48 connectivity toward Delhi, the airport side and Manesar.' },
  { title: 'Large Formats', text: 'Spacious 3 and 4 BHK residences positioned for families upgrading on space.' },
  { title: 'Green Planning', text: 'Project material emphasises open green space and landscaped areas.' },
  { title: 'Family Amenities', text: 'Club, sports, fitness and children’s facilities within the community.' }],

  amenities: [
  'Clubhouse', 'Swimming pool', 'Gymnasium', 'Yoga & wellness areas', 'Sports facilities',
  'Indoor & outdoor games', 'Jogging & walking areas', 'Landscaped open spaces',
  'Children’s play areas', '24×7 security & video surveillance'],

  connectivity: ['Dwarka Expressway', 'NH-48 / Delhi–Gurgaon Expressway', 'Airport & Dwarka side access'],
  floorPlans: [{ label: '3 & 4 BHK', note: 'Use the official floor plan for the exact tower and phase' }],
  gallery: [
  { src: IMG.ats, alt: 'Premium high-rise towers along the Dwarka Expressway corridor' },
  { src: IMG.interior, alt: 'Large-format apartment living and dining area' },
  { src: IMG.clubpool, alt: 'Clubhouse pool within the community' },
  { src: IMG.landscape, alt: 'Landscaped open space and walkways' }],

  card: IMG.ats,
  brochure: null,
  map: { x: 60, y: 22, sector: 'Sector 99A', corridor: 'Dwarka Expressway' },
  verificationNote:
  'Configuration, sizes, land area, unit counts, pricing, possession and RERA references differ between the existing Grandstand and its newer phase, and across public sources. Nothing here should be read as a confirmed offer for a specific unit. The exact phase, tower, carpet area, cost sheet, possession date and HRERA registration must be verified from current official documents before booking.'
},
{
  id: 'wall-senior-living',
  slug: 'wall-senior-living',
  name: 'Wall Senior Living',
  registeredAs: 'WAL Serenia 92 (Verde 92), Village Dhorka, Sector 92',
  developer: 'WAL Developments Private Limited',
  location: 'Sector 92, Gurugram',
  eyebrow: 'Wellness & assisted comfort',
  tagline: 'Wellness-oriented residences planned around ease, greenery and community.',
  overview: [
  'Haryana RERA identifies the project as WAL Serenia 92 (Verde 92) at Village Dhorka, Sector 92, Gurugram, promoted by WAL Developments Private Limited.',
  'Current developer material positions it as wellness-oriented residential living — fitness, greenery, sports and community amenities rather than apartment size alone.',
  'An important clarification: earlier market descriptions referred to senior or retirement housing, and an HRERA-related document describes the proposed development as a Retirement Housing Colony, while the HRERA record describes a residential project. We use the exact legal description from current HRERA documents rather than presenting it as an exclusively senior-only community.'],

  configuration: '3 BHK (as presented in current project material)',
  area: 'Approx. 1,170 – 1,300 sq. ft. reported for some inventory (reference)',
  price: ON_REQUEST,
  facts: [
  { label: 'Promoter', value: 'WAL Developments Private Limited', confidence: 'verified' },
  { label: 'RERA identity', value: 'WAL Serenia 92 (Verde 92)', confidence: 'verified' },
  { label: 'Site', value: 'Village Dhorka, Sector 92, Gurugram', confidence: 'verified' },
  { label: 'Land parcel', value: 'Approx. 4.575 acres', confidence: 'verified' },
  { label: 'Phasing', value: 'Phase 1 approx. 4.073 acres; Phase 2 approx. 0.502 acres', confidence: 'reference' },
  { label: 'Configuration', value: '3 BHK in current project material', confidence: 'reference' },
  { label: 'Reported sizes', value: 'Approx. 1,170 – 1,300 sq. ft.', confidence: 'reference' },
  { label: 'Price', value: ON_REQUEST, confidence: 'onRequest' },
  { label: 'Possession', value: 'Per the live HRERA record', confidence: 'onRequest' }],

  highlights: [
  { title: 'Wellness Led', text: 'The project story is built around wellness and lifestyle rather than size alone.' },
  { title: 'Green Living', text: 'Gardens, walking areas and open community spaces across a compact parcel.' },
  { title: 'Accessible Comfort', text: 'Positioned for buyers for whom wellness, accessibility and community matter.' },
  { title: 'Fitness & Sports', text: 'Fitness facilities alongside badminton, basketball and outdoor recreation areas.' },
  { title: 'Compact Parcel', text: 'Approximately 4.575 acres recorded in HRERA project material.' }],

  amenities: [
  'Wellness & fitness facilities', 'Yoga spaces', 'Badminton court',
  'Basketball / activity courts', 'Landscaped gardens', 'Walking & jogging areas',
  'Community spaces', 'Children’s play area', 'Outdoor recreation'],

  connectivity: ['New Gurugram sector network', 'Dwarka Expressway corridor', 'NH-48 corridor'],
  floorPlans: [{ label: '3 BHK', note: 'Use the sanctioned floor plan for the specific tower and unit' }],
  gallery: [
  { src: IMG.wal, alt: 'Wellness-oriented low-rise residences with wide accessible garden walkways' },
  { src: IMG.landscape, alt: 'Shaded landscaped walkways and water channel' },
  { src: IMG.smartworld, alt: 'Open green court with walking paths' },
  { src: IMG.interior, alt: 'Calm, light-filled living space' }],

  card: IMG.wal,
  brochure: null,
  map: { x: 52, y: 32, sector: 'Sector 92', corridor: 'New Gurugram' },
  verificationNote:
  'Configuration, unit sizes, amenities, phasing, pricing and possession remain verification-dependent, and different public sources quote different size and price combinations that should not be merged into one inventory sheet. Confirm the exact phase, tower, sanctioned plan, cost sheet and registration status on the live HRERA record before any commitment.'
}];


export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const projectOptions = [...projects.map((p) => p.name), 'Other'];

export const developerHighlights = {
  attribution: 'Developer Highlights — M3M India, as presented in the developer material supplied to us.',
  stats: [
  { value: '66', label: 'Iconic projects' },
  { value: '2 Cr sq. ft.', label: 'Area delivered' },
  { value: '4 Cr sq. ft.', label: 'Area under construction' },
  { value: '3000 acres', label: 'Prime land bank' },
  { value: '1.2 lakh', label: 'People part of the M3M family' }]

};