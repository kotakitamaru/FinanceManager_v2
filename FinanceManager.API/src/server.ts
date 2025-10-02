import 'reflect-metadata';
import dotenv from 'dotenv';
import app from '@/app';
import {initializeDatabase, runMigrations} from '@/config/database';

// Load environment variables
dotenv.config();

const PORT = parseInt(process.env.PORT || '3000');
const HOST = process.env.HOST || 'localhost';

async function startServer() {
  try {
    // Initialize database connection
    await initializeDatabase();
    await runMigrations();
    console.log('✅ Database connection established');

    // Start the server
    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running on http://${HOST}:${PORT}`);
      console.log(`📚 API Documentation available at http://${HOST}:${PORT}/api-docs`);
      console.log(`🏥 Health check available at http://${HOST}:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

startServer();
