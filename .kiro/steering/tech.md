# Tech Stack

## Frontend

- **Next.js 16** - App Router with React 19
- **TypeScript** - Strict mode enabled
- **Tailwind CSS 4** - Utility-first styling with PostCSS
- **Framer Motion** - Animation library
- **next-themes** - Dark mode support

## Backend

- **Express.js 5** - RESTful API server
- **Node.js** - ES modules (type: "module")
- **CORS** - Cross-origin support for local dev
- **dotenv** - Environment variable management

## Development Tools

- **ESLint** - Code linting with Next.js config
- **Babel React Compiler** - React optimization
- **Concurrently** - Run frontend and backend simultaneously

## Build System

### Common Commands

```bash
# Development (runs both frontend and backend)
npm run dev

# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend

# Production build
npm run build

# Production start
npm start

# Linting
npm run lint
```

### Ports

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

## TypeScript Configuration

- Target: ES2017
- Module: ESNext with bundler resolution
- Strict mode enabled
- Path alias: `@/*` maps to root
- JSX: react-jsx (React 19 transform)

## Environment Variables

- `.env.local` - Frontend environment variables
- `server/.env` - Backend environment variables
- Both have `.example` files for reference

## Key Dependencies

- `react` & `react-dom` - v19.2.0
- `next` - v16.0.2
- `express` - v5.1.0
- `framer-motion` - v12.23.24
- `typescript` - v5
