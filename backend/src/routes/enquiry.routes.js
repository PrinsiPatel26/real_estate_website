import { Router } from 'express';
import { Enquiry } from '../models/Enquiry.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();
const statuses = ['New', 'Contacted', 'In Progress', 'Closed'];

router.post('/', async (req, res) => {
  const { name, fullName, email, phone, message, property, project, source, configuration, budget, callbackTime } = req.body || {};
  const resolvedName = typeof name === 'string' ? name.trim() : typeof fullName === 'string' ? fullName.trim() : '';

  if (resolvedName.length < 2 || typeof phone !== 'string' || phone.trim().length < 7) {
    return res.status(400).json({ success: false, message: 'Name and phone are required' });
  }

  try {
    const enquiry = await Enquiry.create({ name: resolvedName, email, phone, message, property, project, source, configuration, budget, callbackTime });
    return res.status(201).json({ success: true, data: { id: enquiry.id } });
  } catch {
    return res.status(400).json({ success: false, message: 'Unable to save enquiry' });
  }
});

router.get('/', requireAuth, async (req, res) => {
  try {
    const filter = req.query.status && statuses.includes(req.query.status) ? { status: req.query.status } : {};
    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, data: enquiries });
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load enquiries' });
  }
});

router.get('/:id', requireAuth, async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  return res.json({ success: true, data: enquiry });
});

router.put('/:id', requireAuth, async (req, res) => {
  const update = {};
  if (typeof req.body?.status === 'string' && statuses.includes(req.body.status)) update.status = req.body.status;
  if (typeof req.body?.message === 'string') update.message = req.body.message;

  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
  if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  return res.json({ success: true, data: enquiry });
});

router.delete('/:id', requireAuth, async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
  if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  return res.json({ success: true });
});

export default router;
