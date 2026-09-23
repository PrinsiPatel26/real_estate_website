import mongoose from 'mongoose';

const projectImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    alt: { type: String, default: '', trim: true },
    role: {
      type: String,
      enum: ['card', 'hero', 'gallery', 'floor-plan'],
      default: 'gallery'
    },
    order: { type: Number, default: 0 }
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    title: { type: String, default: '', trim: true },
    projectType: { type: String, default: 'Residential', trim: true },
    tagline: { type: String, default: '', trim: true },
    shortDescription: { type: String, default: '', trim: true },
    status: { type: String, default: 'Upcoming', trim: true },
    developer: { type: String, default: '', trim: true },
    reraNumber: { type: String, default: '', trim: true },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    images: [projectImageSchema],
    gallery: [projectImageSchema],
    floorPlans: [{ label: String, note: String, image: String }],
    card: { type: String, default: '' },
    hero: { type: String, default: '' },
    description: { type: String, default: '' },
    highlights: [{ title: String, text: String }],
    amenities: [String],
    connectivity: [String],
    facts: [{ label: String, value: String, confidence: String }],
    configuration: { type: String, default: '' },
    location: { type: String, default: '' },
    area: { type: String, default: '' },
    priceLabel: { type: String, default: 'BASE PRICE' },
    price: { type: String, default: '' },
    overview: [String],
    verificationNote: { type: String, default: '' },
    map: { type: Object, default: {} },
    brochure: { type: String, default: null }
  },
  { timestamps: true, strict: false }
);

export const Project = mongoose.model('Project', projectSchema);
