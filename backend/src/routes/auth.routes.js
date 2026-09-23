import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

function publicAdmin(admin) {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role
  };
}

router.post('/login', async (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (!email || !password || !process.env.JWT_SECRET) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  try {
    const admin = await Admin.findOne({ email }).select('+password');
    const validPassword = admin ? await admin.comparePassword(password) : false;

    if (!admin || !validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: publicAdmin(admin)
    });
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    return res.json({ success: true, admin: publicAdmin(admin) });
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }
});

export default router;
