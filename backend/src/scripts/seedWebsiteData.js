import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/db.js';
import { Project } from '../models/Project.js';
import { Blog } from '../models/Blog.js';
import { Testimonial } from '../models/Testimonial.js';
import { Service } from '../models/Service.js';
import { WebsiteContent } from '../models/WebsiteContent.js';
import { projects } from '../../../src/data/projects.ts';
import { blogs } from '../../../src/data/blogs.ts';
import { testimonials } from '../../../src/data/testimonials.ts';
import { services } from '../../../src/components/ServicesSection.tsx';
import { aboutContent, founderContent, heroContent, heroStats, gurgaonCorridors, whyChauhan, legalPages } from '../../../src/data/site.ts';

async function upsertBy(model, filter, data) {
  await model.updateOne(filter, { $set: data }, { upsert: true, runValidators: true });
}

async function seedWebsiteData() {
  await connectDatabase();

  for (const project of projects) {
    await upsertBy(Project, { slug: project.slug }, { ...project, isPublished: true });
  }

  for (const blog of blogs) {
    await upsertBy(Blog, { slug: blog.slug }, { ...blog, isPublished: true });
  }

  for (const testimonial of testimonials) {
    await upsertBy(Testimonial, { id: testimonial.id }, { ...testimonial, isPublished: true });
  }

  for (const [index, [title, text, Icon]] of services.entries()) {
    await upsertBy(Service, { title }, { title, text, icon: Icon?.name || '', order: index, isPublished: true });
  }

  const contentEntries = {
    heroContent,
    heroStats,
    aboutContent,
    founderContent,
    whyChauhan,
    gurgaonCorridors,
    legalPages
  };

  for (const [key, value] of Object.entries(contentEntries)) {
    await upsertBy(WebsiteContent, { key }, { key, value });
  }

  console.log(`Website data migrated: ${projects.length} projects, ${blogs.length} blogs, ${testimonials.length} testimonials, ${services.length} services`);
}

seedWebsiteData()
  .catch((error) => {
    const message = error instanceof Error ? error.message : 'Unknown website data seed error';
    console.error(`Website data seed failed: ${message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
