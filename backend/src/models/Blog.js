import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, default: '' },
    author: { type: String, default: 'Chauhan Realtors', trim: true },
    excerpt: { type: String, default: '' },
    content: { type: mongoose.Schema.Types.Mixed, default: [] },
    readTime: { type: String, default: '' },
    image: { type: String, default: '' },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    seoKeywords: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date }
  },
  { timestamps: true, strict: false }
);

export const Blog = mongoose.model('Blog', blogSchema);
