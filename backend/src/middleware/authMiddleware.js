import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const authorization = req.get('authorization');
  const [scheme, token] = authorization?.split(' ') ?? [];

  if (scheme !== 'Bearer' || !token || !process.env.JWT_SECRET) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }
}
