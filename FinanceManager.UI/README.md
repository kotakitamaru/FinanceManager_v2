# Finance Manager UI

A modern React frontend application for personal finance management, built with TypeScript and Vite.

## Features

- **Dashboard**: Overview of financial health with key metrics
- **Transaction Management**: Add, edit, and categorize transactions
- **Account Management**: Manage multiple bank accounts and credit cards
- **Category Management**: Organize transactions with custom categories
- **Reports & Analytics**: Visualize spending patterns and trends
- **User Authentication**: Secure login and registration

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Recharts** for data visualization
- **date-fns** for date manipulation

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Basic components (Button, Input, etc.)
│   ├── forms/          # Form components
│   ├── layout/         # Layout components (Header, Sidebar)
│   ├── charts/         # Chart components
│   └── modals/         # Modal components
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard page
│   ├── transactions/   # Transaction management
│   ├── accounts/       # Account management
│   ├── categories/     # Category management
│   ├── reports/        # Reports and analytics
│   └── settings/       # User settings
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── services/           # API services
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # Application constants
└── assets/             # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Update environment variables in `.env.local`:
```
REACT_APP_API_BASE_URL=http://localhost:3000/api
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The frontend is designed to work with the Finance Manager API. Make sure the API server is running on the configured port (default: 3000).

## Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for all new code
3. Write meaningful commit messages
4. Test your changes thoroughly

## License

This project is part of the Finance Manager 2.0 application.