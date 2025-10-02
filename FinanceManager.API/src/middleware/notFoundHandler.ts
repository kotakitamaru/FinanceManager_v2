import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/types/CommonTypes';

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const apiError: ApiError = {
    success: false,
    error: 'NotFoundError',
    message: `Route ${req.originalUrl} not found`,
    statusCode: 404
  };

  res.status(404).json(apiError);
}
