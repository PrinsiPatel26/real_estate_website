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

function slugify(value) {
  return normalizeSlug(value)
    ?.replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

async function generateUniqueProjectSlug(Model, name) {
  const baseSlug = slugify(name);
  let candidate = baseSlug;
  let suffix = 2;

  while (candidate && await Model.exists({ slug: candidate })) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

function isSlugDuplicateError(error) {
  return error?.code === 11000 && (
    error?.keyPattern?.slug === 1
    || error?.keyValue?.slug !== undefined
    || String(error?.index || '').toLowerCase().includes('slug')
  );
}

function validationMessage(error) {
  if (error?.name !== 'ValidationError') return null;
  const fields = Object.values(error.errors || {}).map((field) => field.message).filter(Boolean);
  return fields.length ? `Project validation failed: ${fields.join('; ')}` : 'Project validation failed.';
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
        if (Model.modelName === 'Project') {
          payload.slug = await generateUniqueProjectSlug(Model, payload.name || payload.title);
        } else {
          payload.slug = normalizeSlug(payload.slug);
        }
        if (payload.slug && Model.modelName !== 'Project') {
          const existingRecord = await Model.findOne({ slug: payload.slug });
          if (existingRecord) {
            return res.status(409).json({ success: false, message: duplicateSlugMessage(Model) });
          }
        }
      }

      const record = await Model.create(payload);
      return res.status(201).json({ success: true, data: record });
    } catch (error) {
      console.error(`CREATE ${Model.modelName} ERROR:`, error);
      const duplicate = isSlugDuplicateError(error);
      const validation = validationMessage(error);
      if (duplicate) return res.status(409).json({ success: false, message: duplicateSlugMessage(Model) });
      if (validation) return res.status(400).json({ success: false, message: validation });
      return res.status(500).json({ success: false, message: Model.modelName === 'Project' ? 'Failed to create project.' : 'Unable to create content' });
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
      const duplicate = isSlugDuplicateError(error);
      const message = duplicate ? duplicateSlugMessage(Model) : 'Unable to update content';
      return res.status(duplicate ? 409 : 400).json({ success: false, message });
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
