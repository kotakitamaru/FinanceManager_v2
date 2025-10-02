import { Response } from 'express';
import { ApiResponse } from '@/types/CommonTypes';

export abstract class BaseController {
  // Base controller functionality can be added here
  // Common methods for all controllers

  protected handleError(error: any, res?: Response): never {
    console.error('Controller error:', error);
    
    if (res) {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal server error';
      res.status(statusCode).json({ 
        success: false,
        error: message,
        message: message
      });
    }
    
    throw error;
  }

  protected handleApiError(error: any): ApiResponse<any> {
    console.error('Controller error:', error);
    
    return {
      success: false,
      error: error.message || 'Internal server error',
      message: error.message || 'Internal server error'
    };
  }
}
