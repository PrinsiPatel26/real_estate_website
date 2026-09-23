import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { Blog } from '../models/Blog.js';
import { Enquiry } from '../models/Enquiry.js';
import { Project } from '../models/Project.js';
import { Property } from '../models/Property.js';

const router = Router();

router.get('/stats', requireAuth, async (_req, res) => {
  try {
    const [properties, projects, blogs, newEnquiries] = await Promise.all([
      Property.countDocuments(),
      Project.countDocuments(),
      Blog.countDocuments(),
      Enquiry.countDocuments({ status: 'New' })
    ]);
    return res.json({ success: true, data: { properties, projects, blogs, newEnquiries } });
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load dashboard stats' });
  }
});

export default router;
