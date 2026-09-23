import { Router } from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import multer from 'multer';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();
const uploadRoot = fileURLToPath(new URL('../../uploads/projects/', import.meta.url));
const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

fs.mkdirSync(uploadRoot, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadRoot),
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${extension}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (!allowedMimeTypes.has(file.mimetype) || !allowedExtensions.has(extension)) {
      callback(new Error('Please upload JPG, PNG or WEBP image.'));
      return;
    }
    callback(null, true);
  }
});

router.post('/project-image', requireAuth, (req, res) => {
  upload.single('image')(req, res, (error) => {
    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'Image size must be less than 10 MB.' });
    }
    if (error) {
      return res.status(400).json({ success: false, message: error.message || 'Unable to upload image.' });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please choose an image to upload.' });
    }

    if (!fs.existsSync(req.file.path)) {
      return res.status(500).json({ success: false, message: 'Image could not be saved.' });
    }

    const publicOrigin = process.env.PUBLIC_API_URL || `${req.protocol}://${req.get('host')}`;
    const url = `${publicOrigin}/uploads/projects/${req.file.filename}`;
    return res.status(201).json({
      success: true,
      url,
      filename: req.file.filename,
      data: {
        url,
        alt: '',
        isFeatured: false,
        order: 0
      }
    });
  });
});

export default router;
