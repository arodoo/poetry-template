# Poetry SaaS Platform

A scalable SaaS application built with Angular 19 and NestJS 11.

## Project Structure

```
poetry-template/
├── apps/                        # Application code
│   ├── backend/
│   │   ├── api/                 # NestJS API
│   │   └── microservices/       # Backend services (analytics, notifications, payments)
│   └── frontend/
│       ├── admin/               # Admin dashboard
│       └── customer/            # Customer-facing SaaS
├── libs/                        # Shared libraries
│   ├── api-interfaces/
│   ├── auth/
│   ├── feature-modules/
│   ├── shared/
│   └── testing/                 # Test utilities and mocks
├── infrastructure/              # Infrastructure as code
│   ├── docker/
│   ├── kubernetes/
│   └── terraform/
├── plugins/                     # Customer-specific customizations
├── tools/                       # Utility scripts
```

## Getting Started

### Prerequisites

- Node.js 20.x or later
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd poetry-template
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development environment
   ```bash
   npm run docker:up
   ```

4. Access the applications:
   - Customer SaaS: http://localhost:4200
   - Admin Dashboard: http://localhost:4300
   - API: http://localhost:3333

## Database Configuration

The application supports multiple database types:

- PostgreSQL (default for production)
- MariaDB/MySQL
- SQLite (for development and testing)

Database configuration is managed through TypeORM with dynamic connection settings based on environment variables.

## Styling

- **Tailwind CSS**: Used for the landing page
- **Bootstrap 5**: Used for the SaaS platform UI
- **Material Icons**: Google Fonts icon set used throughout the application

## Testing

Run tests with:

```bash
# Unit tests
nx test [app-name]

# E2E tests
nx e2e [app-name]
```

## Docker

Build and run the application using:

```bash
# Start all services
npm run docker:up

# Stop all services
npm run docker:down

# Rebuild services
npm run docker:build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
# poetry-template
