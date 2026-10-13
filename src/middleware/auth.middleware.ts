import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.session_token;

  if (!token) {
	return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('JWT_SECRET is missing from environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
	const decoded = jwt.verify(token, jwtSecret) as { userId: string; email: string };
	req.user = {
      userId: decoded.userId,
      email: decoded.email
    };
	next();
  } catch (err) {
	return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};