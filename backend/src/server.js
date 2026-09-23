import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { connectDatabase } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import contentRoutes from './routes/content.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import enquiryRoutes from './routes/enquiry.routes.js';
import healthRoutes from './routes/health.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import { Blog } from './models/Blog.js';
import { Project } from './models/Project.js';
import { Property } from './models/Property.js';
import { Service } from './models/Service.js';
import { Testimonial } from './models/Testimonial.js';
import { createContentRouter } from './routes/contentCrud.js';

const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigins = new Set([
  process.env.FRONTEND_ORIGIN,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://realestatewebsite-delta.vercel.app'
].filter(Boolean));
const uploadRoot = fileURLToPath(new URL('../uploads/', import.meta.url));

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(uploadRoot));
app.use('/api/uploads', uploadRoutes);
app.use('/api/projects', createContentRouter(Project, { slug: true }));
app.use('/api/properties', createContentRouter(Property, { slug: true }));
app.use('/api/blogs', createContentRouter(Blog, { slug: true }));
app.use('/api/testimonials', createContentRouter(Testimonial));
app.use('/api/services', createContentRouter(Service));
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/dashboard', dashboardRoutes);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown database error';
    console.error(`Database connection failed: ${message}`);
    process.exit(1);
  }
}

void startServer();
