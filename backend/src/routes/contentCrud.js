import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';

function cleanPayload(payload = {}) {
  const next = { ...payload };
  delete next._id;
  delete next.__v;
  delete next.createdAt;
  delete next.updatedAt;
  return next;
}

function normalizeSlug(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : value;
}

function duplicateSlugMessage(Model) {
  return Model.modelName === 'Project'
    ? 'Project slug already exists. Use a different slug.'
    : 'A record with this identifier already exists';
}

export function createContentRouter(Model, { slug = false } = {}) {
  const router = Router();

  router.get('/admin/all', requireAuth, async (_req, res) => {
    try {
      const records = await Model.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: records });
    } catch {
      return res.status(500).json({ success: false, message: 'Unable to load content' });
    }
  });

  router.get('/', async (_req, res) => {
    try {
      const records = await Model.find({ $or: [{ isPublished: true }, { isPublished: { $exists: false } }] }).sort({ createdAt: -1 });
      return res.json({ success: true, data: records });
    } catch {
      return res.status(500).json({ success: false, message: 'Unable to load content' });
    }
  });

  router.get('/:identifier', async (req, res) => {
    try {
      const identity = slug ? { slug: req.params.identifier } : { _id: req.params.identifier };
      const filter = { ...identity, $or: [{ isPublished: true }, { isPublished: { $exists: false } }] };
      const record = await Model.findOne(filter);
      if (!record) return res.status(404).json({ success: false, message: 'Content not found' });
      return res.json({ success: true, data: record });
    } catch {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }
  });

  router.post('/', requireAuth, async (req, res) => {
    try {
      const payload = cleanPayload(req.body);
      if (slug) {
        payload.slug = normalizeSlug(payload.slug);
        if (payload.slug) {
          const existingRecord = await Model.findOne({ slug: payload.slug });
          if (existingRecord) {
            return res.status(409).json({ success: false, message: duplicateSlugMessage(Model) });
          }
        }
      }

      const record = await Model.create(payload);
      return res.status(201).json({ success: true, data: record });
    } catch (error) {
      const message = error?.code === 11000 ? duplicateSlugMessage(Model) : 'Unable to create content';
      return res.status(error?.code === 11000 ? 409 : 400).json({ success: false, message });
    }
  });

  router.put('/:id', requireAuth, async (req, res) => {
    try {
      const payload = cleanPayload(req.body);
      if (slug) {
        payload.slug = normalizeSlug(payload.slug);
        if (payload.slug) {
          const existingRecord = await Model.findOne({ slug: payload.slug, _id: { $ne: req.params.id } });
          if (existingRecord) {
            return res.status(409).json({ success: false, message: duplicateSlugMessage(Model) });
          }
        }
      }

      const record = await Model.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
      if (!record) return res.status(404).json({ success: false, message: 'Content not found' });
      return res.json({ success: true, data: record });
    } catch (error) {
      const message = error?.code === 11000 ? duplicateSlugMessage(Model) : 'Unable to update content';
      return res.status(error?.code === 11000 ? 409 : 400).json({ success: false, message });
    }
  });

  router.delete('/:id', requireAuth, async (req, res) => {
    try {
      const record = await Model.findByIdAndDelete(req.params.id);
      if (!record) return res.status(404).json({ success: false, message: 'Content not found' });
      return res.json({ success: true });
    } catch {
      return res.status(400).json({ success: false, message: 'Unable to delete content' });
    }
  });

  return router;
}
