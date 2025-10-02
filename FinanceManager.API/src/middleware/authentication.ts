import { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { AuthService } from '@/services/AuthService';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    name: string;
  };
}

export async function expressAuthentication(
    req: Request,
    securityName: string,
    scopes?: string[]
): Promise<{ id: number; email?: string }> {
  if (securityName !== 'bearer') {
    throw new Error('Unsupported security scheme');
  }

  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw new Error('No bearer token provided');
  }

  const token = header.slice('Bearer '.length);

  // NOTE: Provide your JWT secret via environment variable
  const secret = process.env.JWT_SECRET as string;
  if (!secret) {
    throw new Error('JWT secret is not configured');
  }

  let decoded: JwtPayload | string;
  try {
    decoded = jwt.verify(token, secret) as JwtPayload;
  } catch {
    throw new Error('Invalid or expired token');
  }

  // Optional: scopes/roles check
  if (scopes && scopes.length > 0) {
    const tokenScopes = (decoded as JwtPayload)?.scopes ?? (decoded as JwtPayload)?.scope;
    const list = Array.isArray(tokenScopes)
        ? tokenScopes
        : typeof tokenScopes === 'string'
            ? tokenScopes.split(' ')
            : [];

    const hasAll = scopes.every((s) => list.includes(s));
    if (!hasAll) {
      throw new Error('Insufficient scope');
    }
  }

  // Map token to your user shape
  const user = {
    id: Number((decoded as JwtPayload)?.sub ?? (decoded as any)?.id),
    email: (decoded as any)?.email,
    name: (decoded as any)?.name || '',
  };

  // Attach to request for later middlewares/controllers if desired
  (req as AuthenticatedRequest).user = user;

  return user;
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  const authService = new AuthService();
  
  authService.verifyToken(token)
    .then((userData) => {
      req.user = userData;
      next();
    })
    .catch((error) => {
      res.status(403).json({ error: error.message });
    });
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  next();
}
