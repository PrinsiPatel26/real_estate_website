import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    propertyType: { type: String, default: 'Apartment', trim: true },
    status: { type: String, default: 'Available', trim: true },
    developer: { type: String, default: '', trim: true },
    project: { type: String, default: '', trim: true },
    location: {
      address: { type: String, default: '' },
      locality: { type: String, default: '' },
      area: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      pincode: { type: String, default: '' },
      mapUrl: { type: String, default: '' },
      latitude: { type: String, default: '' },
      longitude: { type: String, default: '' }
    },
    pricing: {
      price: { type: String, default: '' },
      priceLabel: { type: String, default: '' },
      startingPrice: { type: String, default: '' },
      maxPrice: { type: String, default: '' }
    },
    configuration: {
      bedrooms: { type: String, default: '' },
      bathrooms: { type: String, default: '' },
      balconies: { type: String, default: '' },
      parking: { type: String, default: '' },
      carpetArea: { type: String, default: '' },
      builtUpArea: { type: String, default: '' },
      superBuiltUpArea: { type: String, default: '' },
      areaUnit: { type: String, default: 'sq.ft.' },
      configuration: { type: String, default: '' },
      possessionDate: { type: String, default: '' }
    },
    images: [{ url: { type: String, default: '' }, alt: { type: String, default: '' }, isFeatured: { type: Boolean, default: false }, order: { type: Number, default: 0 } }],
    gallery: [{ url: { type: String, default: '' }, alt: { type: String, default: '' }, isFeatured: { type: Boolean, default: false }, order: { type: Number, default: 0 } }],
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    highlights: [{ title: { type: String, default: '' }, text: { type: String, default: '' }, order: { type: Number, default: 0 } }],
    amenities: [{ name: { type: String, default: '' }, icon: { type: String, default: '' }, order: { type: Number, default: 0 } }],
    features: [{ type: String, default: '' }],
    additionalDetails: {
      reraNumber: { type: String, default: '' },
      possession: { type: String, default: '' },
      propertyAge: { type: String, default: '' },
      facing: { type: String, default: '' },
      furnishing: { type: String, default: '' },
      floor: { type: String, default: '' },
      totalFloors: { type: String, default: '' },
      maintenance: { type: String, default: '' },
      ownership: { type: String, default: '' },
      availability: { type: String, default: '' }
    },
    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      keywords: { type: String, default: '' }
    },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null }
  },
  { timestamps: true, strict: false }
);

export const Property = mongoose.model('Property', propertySchema);
