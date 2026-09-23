import mongoose from 'mongoose';

const websiteContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
);

export const WebsiteContent = mongoose.model('WebsiteContent', websiteContentSchema);
