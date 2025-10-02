import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes as TSOARegisterRoutes } from '@/routes/routes.generated';

export function RegisterRoutes(app: Application): void {
  // Register TSOA generated routes
  TSOARegisterRoutes(app);

  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json'
    }
  }));

  // Serve OpenAPI spec
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile('swagger.json', { root: './dist' });
  });
}