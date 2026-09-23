import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, index: true },
    name: { type: String, required: true },
    location: { type: String, default: '' },
    clientType: { type: String, default: '' },
    rating: { type: Number, default: 5 },
    review: { type: String, required: true },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
