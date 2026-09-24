import React, { createContext, useContext, useEffect, useState } from 'react';
import { blogs as fallbackBlogs, BlogArticle } from '../data/blogs';
import { projects as fallbackProjects } from '../data/projects';
import { testimonials as fallbackTestimonials, Testimonial } from '../data/testimonials';
import type { Project } from '../types/project';
import { getPublicCollection } from '../services/api';
import { resolveImageUrl } from '../utils/projectMedia';

interface CmsDataContextValue {
  projects: Project[];
  blogs: BlogArticle[];
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
}

function normalizeProjectRecord(record: Partial<Project> & Record<string, unknown>): Project {
  const name = String(record.name ?? record.title ?? 'Project').trim() || 'Project';
  const description = String(record.description ?? record.shortDescription ?? record.tagline ?? '').trim();
  const overview = Array.isArray(record.overview) ? record.overview.filter((item): item is string => typeof item === 'string' && item.trim().length > 0) : (description ? [description] : []);

  return {
    ...record,
    id: String(record.id ?? record._id ?? record.slug ?? name),
    name,
    slug: String(record.slug ?? '').trim(),
    developer: String(record.developer ?? '').trim(),
    location: String(record.location ?? '').trim(),
    overview,
    highlights: Array.isArray(record.highlights) ? record.highlights : [],
    amenities: Array.isArray(record.amenities) ? record.amenities : [],
    connectivity: Array.isArray(record.connectivity) ? record.connectivity : [],
    facts: Array.isArray(record.facts) ? record.facts : [],
    floorPlans: Array.isArray(record.floorPlans) ? record.floorPlans : [],
    gallery: Array.isArray(record.gallery) ? record.gallery : [],
    map: record.map && typeof record.map === 'object' ? record.map : { x: 50, y: 50, sector: String(record.location ?? ''), corridor: String(record.location ?? '') },
    configuration: String(record.configuration ?? '').trim(),
    area: String(record.area ?? '').trim(),
    price: String(record.price ?? 'Price on Request').trim() || 'Price on Request',
    verificationNote: String(record.verificationNote ?? '').trim()
  } as Project;
}

function normalizeBlogRecord(record: BlogArticle & Record<string, unknown>): BlogArticle {
  const publishedAt = record.publishedAt ? new Date(String(record.publishedAt)) : null;
  const date = String(record.date ?? '').trim() || (publishedAt && !Number.isNaN(publishedAt.getTime())
    ? publishedAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '');
  const content = Array.isArray(record.content)
    ? record.content.map((item) => typeof item === 'string' ? item : String((item as Record<string, unknown>)?.text ?? '')).filter(Boolean)
    : String(record.content ?? '').split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);

  return {
    ...record,
    date,
    content,
    author: String(record.author ?? 'Chauhan Realtors'),
    readTime: String(record.readTime ?? ''),
    image: resolveImageUrl(String(record.image ?? ''))
  } as BlogArticle;
}

const CmsDataContext = createContext<CmsDataContextValue>({
  projects: fallbackProjects,
  blogs: fallbackBlogs,
  testimonials: fallbackTestimonials,
  loading: true,
  error: null
});

export function CmsDataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [blogs, setBlogs] = useState<BlogArticle[]>(fallbackBlogs);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      getPublicCollection<Project>('projects'),
      getPublicCollection<BlogArticle>('blogs'),
      getPublicCollection<Testimonial>('testimonials')
    ])
      .then(([projectResponse, blogResponse, testimonialResponse]) => {
        if (!active) return;
        setProjects(projectResponse.data.map((project) => normalizeProjectRecord(project as Partial<Project> & Record<string, unknown>)));
        setBlogs(blogResponse.data.map((blog) => normalizeBlogRecord(blog as BlogArticle & Record<string, unknown>)));
        setTestimonials(testimonialResponse.data);
      })
      .catch(() => {
        if (active) setError('Unable to load the latest website content.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return <CmsDataContext.Provider value={{ projects, blogs, testimonials, loading, error }}>{children}</CmsDataContext.Provider>;
}

export function useCmsData() {
  return useContext(CmsDataContext);
}
