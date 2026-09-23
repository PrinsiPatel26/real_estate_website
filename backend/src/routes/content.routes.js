import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { WebsiteContent } from '../models/WebsiteContent.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const records = await WebsiteContent.find().sort({ key: 1 });
    return res.json({ success: true, data: Object.fromEntries(records.map((record) => [record.key, record.value])) });
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load website content' });
  }
});

router.put('/', requireAuth, async (req, res) => {
  try {
    const entries = Object.entries(req.body || {});
    await Promise.all(entries.map(([key, value]) => WebsiteContent.findOneAndUpdate({ key }, { key, value }, { upsert: true, new: true, runValidators: true })));
    return res.json({ success: true });
  } catch {
    return res.status(400).json({ success: false, message: 'Unable to update website content' });
  }
});

export default router;
