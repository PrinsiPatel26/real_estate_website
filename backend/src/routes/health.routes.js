import { Router } from 'express';
import { isDatabaseConnected } from '../config/db.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Chauhan Realtors API is running'
  });
});

router.get('/db', (_req, res) => {
  if (!isDatabaseConnected()) {
    return res.status(503).json({
      success: false,
      database: 'disconnected'
    });
  }

  return res.json({
    success: true,
    database: 'connected'
  });
});

export default router;
