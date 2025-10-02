# Finance Manager API

A Node.js Express.js API built with TypeScript and TSOA for the Finance Manager application.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4
- **Language**: TypeScript 5
- **API Documentation**: TSOA (TypeScript OpenAPI)
- **Database**: Raw SQL via Sequelize connection
- **Architecture**: Controllers → Services → Repositories → Database

## Project Structure

```
src/
├── controllers/          # API controllers (TSOA routes)
├── services/            # Business logic layer
├── repositories/        # Data access layer
├── models/             # Database models (if needed)
├── config/             # Configuration files
├── middleware/         # Express middleware
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── validators/         # Input validation
├── routes/             # Route definitions
├── app.ts              # Express app configuration
└── server.ts           # Server entry point
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- PostgreSQL, MySQL, or SQLite database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp env.example .env
   ```

4. Update the `.env` file with your database configuration

5. Generate TSOA routes and build the project:
   ```bash
   npm run tsoa:build
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Start production server
- `npm run tsoa:gen` - Generate TSOA routes and OpenAPI spec
- `npm run tsoa:build` - Generate routes and build project

### API Documentation

Once the server is running, you can access:

- **Swagger UI**: http://localhost:3000/api-docs
- **OpenAPI Spec**: http://localhost:3000/swagger.json
- **Health Check**: http://localhost:3000/health

## Architecture

### Controllers
- Handle HTTP requests and responses
- Use TSOA decorators for route definition
- Validate input and call appropriate services
- Return standardized responses

### Services
- Contain business logic
- Call repositories for data access
- Handle data transformation
- Implement business rules and validation

### Repositories
- Handle database operations using raw SQL
- Use Sequelize for database connection
- Abstract database-specific logic
- Return domain objects

### Database
- Raw SQL queries via Sequelize connection
- Support for PostgreSQL, MySQL, and SQLite
- Connection pooling and transaction support

## Environment Variables

See `env.example` for all available environment variables.

## Development

The project uses:
- **TypeScript** for type safety
- **TSOA** for automatic OpenAPI documentation
- **ESLint** for code linting
- **Jest** for testing
- **Sequelize** for database connection

## License

MIT
