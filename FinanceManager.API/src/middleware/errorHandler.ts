import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/types/CommonTypes';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Error:', error);

  const apiError: ApiError = {
    success: false,
    error: error.name || 'InternalServerError',
    message: error.message || 'Internal Server Error',
    statusCode: 500
  };

  // Handle specific error types
  if (error.name === 'ValidationError') {
    apiError.statusCode = 400;
    apiError.message = 'Validation Error';
  } else if (error.name === 'UnauthorizedError') {
    apiError.statusCode = 401;
    apiError.message = 'Unauthorized';
  } else if (error.name === 'ForbiddenError') {
    apiError.statusCode = 403;
    apiError.message = 'Forbidden';
  } else if (error.name === 'NotFoundError') {
    apiError.statusCode = 404;
    apiError.message = 'Not Found';
  }

  res.status(apiError.statusCode).json(apiError);
}
