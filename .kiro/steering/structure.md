# Project Structure

## Directory Organization

```
kirocore/
├── app/                    # Next.js App Router
│   ├── [appType]/         # Dynamic routes for each app
│   ├── chat/              # Chat page
│   ├── api/               # API routes (optional)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
│
├── apps/                   # App configurations (2 separate apps)
│   ├── study-buddy/
│   │   ├── .kiro/         # App-specific Kiro config
│   │   ├── agent.config.js
│   │   └── README.md
│   └── idea-forge/
│       ├── .kiro/         # App-specific Kiro config
│       ├── agent.config.ts
│       └── README.md
│
├── core/                   # Shared core components
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── services/          # API services
│   └── types/             # TypeScript types
│
├── server/                 # Express backend
│   ├── routes/            # API route handlers
│   ├── services/          # Business logic
│   ├── index.js           # Server entry point
│   └── .env.example       # Backend env template
│
├── .kiro/                  # Root Kiro configuration
│   ├── steering/          # Steering documents
│   ├── specs/             # Feature specifications
│   └���─ hooks/             # Agent hooks
│
└── public/                 # Static assets
```

## Key Patterns

### App Configuration

Each app in `apps/` must have:

- `agent.config.js` or `agent.config.ts` - App configuration
- `.kiro/` directory - App-specific Kiro settings
- `README.md` - App documentation

App config structure:

```javascript
{
  name: string,
  description: string,
  icon: string,
  systemPrompt: string,
  welcomeMessage: string,
  features: string[],
  theme: { primary, secondary, accent }
}
```

### Core Components

Located in `core/components/`:

- Shared UI components used across all apps
- Should be app-agnostic and reusable
- Use TypeScript for type safety

### Custom Hooks

Located in `core/hooks/`:

- `useKiroAgent.tsx` - Main hook for AI agent interaction
- Returns: `{messages, sendMessage, loading, error, clear, pushMessage}`

### API Routes

Backend routes in `server/routes/`:

- `chat.js` - Chat endpoints
- `apps.js` - App management endpoints

### Naming Conventions

- React components: PascalCase (e.g., `ChatArea.tsx`)
- Hooks: camelCase with "use" prefix (e.g., `useKiroAgent.tsx`)
- Config files: kebab-case or camelCase (e.g., `agent.config.js`)
- Folders: kebab-case (e.g., `study-buddy`)

### Import Paths

- Use `@/` alias for root imports
- Example: `import {ChatArea} from "@/core/components/chat/ChatArea"`
- Server uses ES modules with `.js` extensions in imports
