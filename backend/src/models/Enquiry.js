import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, default: '' },
    property: { type: String, default: '' },
    project: { type: String, default: '' },
    source: { type: String, default: 'website' },
    configuration: { type: String, default: '' },
    budget: { type: String, default: '' },
    callbackTime: { type: String, default: '' },
    projectId: { type: String, default: '' },
    projectName: { type: String, default: '' },
    projectSlug: { type: String, default: '' },
    notes: { type: String, default: '' },
    assignedTo: { type: String, default: '' },
    status: { type: String, enum: ['New', 'Contacted', 'In Progress', 'Closed', 'Spam'], default: 'New' }
  },
  { timestamps: true }
);

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
