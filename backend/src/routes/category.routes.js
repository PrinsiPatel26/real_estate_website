import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { Category } from '../models/Category.js';
import { Project } from '../models/Project.js';

const router = Router();

function slugify(value) {
  return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').replace(/-{2,}/g, '-');
}

function publicCategory(category) {
  return { _id: category._id, name: category.name, slug: category.slug };
}

function categoryMessage(error) {
  if (error?.code === 11000) return 'Category already exists.';
  if (error?.name === 'ValidationError') return 'Category name and status are invalid.';
  return 'Unable to save category.';
}

async function withCounts(categories) {
  return Promise.all(categories.map(async (category) => ({
    ...category.toObject(),
    propertyCount: await Project.countDocuments({ projectType: category.name })
  })));
}

router.get('/', async (_req, res) => {
  try {
    const categories = await Category.find({ status: 'active' }).sort({ name: 1 }).select('_id name slug');
    return res.json({ success: true, data: categories.map(publicCategory) });
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load categories.' });
  }
});

router.get('/admin/all', requireAuth, async (_req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return res.json({ success: true, data: await withCounts(categories) });
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load categories.' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const name = String(req.body?.name || '').trim();
    if (name.length < 2) return res.status(400).json({ success: false, message: 'Category name must be at least 2 characters.' });
    if (await Category.exists({ name: { $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } })) return res.status(409).json({ success: false, message: 'Category already exists.' });
    const category = await Category.create({ name, slug: slugify(name), status: req.body?.status === 'inactive' ? 'inactive' : 'active' });
    return res.status(201).json({ success: true, data: { ...category.toObject(), propertyCount: 0 } });
  } catch (error) {
    return res.status(error?.code === 11000 ? 409 : 400).json({ success: false, message: categoryMessage(error) });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const name = String(req.body?.name || '').trim();
    if (name.length < 2) return res.status(400).json({ success: false, message: 'Category name must be at least 2 characters.' });
    if (await Category.exists({ _id: { $ne: req.params.id }, name: { $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } })) return res.status(409).json({ success: false, message: 'Category already exists.' });
    const category = await Category.findByIdAndUpdate(req.params.id, { name, slug: slugify(name), status: req.body?.status === 'inactive' ? 'inactive' : 'active' }, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found.' });
    return res.json({ success: true, data: (await withCounts([category]))[0] });
  } catch (error) {
    return res.status(error?.code === 11000 ? 409 : 400).json({ success: false, message: categoryMessage(error) });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found.' });
    const propertyCount = await Project.countDocuments({ projectType: category.name });
    if (propertyCount > 0) return res.status(409).json({ success: false, message: `This category is currently assigned to ${propertyCount} ${propertyCount === 1 ? 'property' : 'properties'}. Please reassign those properties before deleting this category.`, propertyCount });
    await category.deleteOne();
    return res.json({ success: true });
  } catch {
    return res.status(400).json({ success: false, message: 'Unable to delete category.' });
  }
});

export default router;