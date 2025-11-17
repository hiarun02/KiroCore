# KiroCore - Steering Rules

## Project Overview

**KiroCore** is a universal AI agent app foundation that transforms into different AI applications by simply changing configuration files. One skeleton, endless AI apps.

### Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **AI**: OpenAI API (production) / Kiro Agents (development)
- **Styling**: Dark mode only, ghostly aesthetic with purple accents

### Core Concept

Instead of building separate apps, KiroCore provides:

- Reusable UI components (Header, Footer, Chat, Hero)
- Dynamic agent config system
- Express backend that routes to different AI personalities
- One codebase that powers multiple AI apps

---

## Code Standards

### File Organization

```
kirocore/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page with hero
│   ├── [appType]/         # Dynamic routes for different apps
│   └── layout.tsx         # Root layout with theme provider
├── core/                   # Reusable core components
│   ├── components/        # UI components (Header, Footer, Chat, Hero)
│   ├── lib/               # Utilities and animations
│   ├── types/             # TypeScript interfaces
│   └── hooks/             # Custom React hooks
├── apps/                   # Agent configurations
│   ├── study-buddy/       # StudyBuddy AI tutor config
│   └── idea-forge/        # IdeaForge startup advisor config
└── server/                 # Express backend
    └── server.js          # API routes
```

### Component Guidelines

1. **All components must be client components** (`'use client'`)
2. **Use TypeScript** for all new files
3. **Dark mode only** - no light mode classes needed
4. **Responsive design** - mobile-first approach with Tailwind breakpoints
5. **Animations** - use Framer Motion for smooth transitions
6. **Naming conventions**:
   - Components: PascalCase (e.g., `ChatArea.tsx`)
   - Files: kebab-case for configs (e.g., `agent.config.ts`)
   - Variables: camelCase

### Styling Rules

**Colors (Dark Mode Only):**

- Background: `#0a0a0a` (zinc-950)
- Foreground: `#fafafa` (zinc-100)
- Primary: `#8b5cf6` (purple-600)
- Accent: `#a78bfa` (purple-400)
- Border: `#27272a` (zinc-800)
- Glow: `rgba(139, 92, 246, 0.5)`

**Tailwind Classes:**

- Text: `text-zinc-100` (light) or `text-zinc-400` (muted)
- Backgrounds: `bg-zinc-900`, `bg-zinc-800`
- Borders: `border-zinc-800`
- Glow effects: `shadow-[0_0_20px_rgba(139,92,246,0.3)]`

**Responsive Breakpoints:**

- Mobile: default (< 640px)
- Tablet: `sm:` (640px+)
- Desktop: `md:` (768px+), `lg:` (1024px+)

### Animation Standards

Use Framer Motion variants from `core/lib/animations.ts`:

- `messageVariants` - for chat messages
- `headerVariants` - for header slide-in
- `footerVariants` - for footer fade-in
- `floatingVariants` - for floating elements (ghost emoji)

**Performance:**

- Keep animations at 60fps
- Use CSS transforms (GPU-accelerated)
- Avoid animating layout properties

---

## Agent Config System

### Config Structure

Each app in `apps/` folder has an `agent.config.ts`:

```typescript
export const agentConfig = {
  name: "StudyBuddy",
  icon: "📚",
  description: "Your AI tutor",
  welcomeMessage: "Hi! I'm here to help you learn!",

  // AI personality
  systemPrompt: "You are a patient and encouraging tutor...",
  tone: "friendly, educational, supportive",

  // UI customization
  theme: {
    primaryColor: "#8b5cf6",
    accentColor: "#a78bfa",
  },

  footer: {
    attribution: "Built with KiroCore",
    links: [{label: "About", href: "/about"}],
  },
};
```

### Adding New Apps

1. Create folder: `apps/my-app/`
2. Add `agent.config.ts` with personality and UI settings
3. App automatically available at `/my-app` route
4. No code changes needed!

---

## API Integration

### Backend Structure

Express server at `server/server.js` handles:

- `/api/chat` - Send messages to AI
- `/api/config/:appType` - Get agent config
- Middleware for CORS, JSON parsing

### OpenAI Integration (Production)

```javascript
// Use agent config to customize system prompt
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {role: "system", content: agentConfig.systemPrompt},
    {role: "user", content: userMessage},
  ],
});
```

---

## Development Workflow

### Using Specs

1. **Plan features** using specs in `.kiro/specs/`
2. **Follow workflow**: Requirements → Design → Tasks
3. **Execute tasks** one at a time
4. **Update status** as you complete tasks

### Using Hooks

- **Auto-format on save** - formats code automatically
- **Test runner** - runs tests when files change
- **Build checker** - validates builds before commit

### Using Steering

- **Always included** - these rules apply to all Kiro interactions
- **Project context** - helps Kiro understand your architecture
- **Code standards** - ensures consistent code style

---

## Testing Strategy

### Component Tests

- Test each component in isolation
- Verify props and rendering
- Check responsive behavior

### Integration Tests

- Test full chat flow
- Verify agent config loading
- Test API endpoints

### Manual Testing

- Test on mobile devices
- Verify animations are smooth
- Check all routes work

---

## Deployment

### Production Checklist

- [ ] Environment variables set (OPENAI_API_KEY)
- [ ] Build succeeds (`npm run build`)
- [ ] All routes work
- [ ] Mobile responsive
- [ ] API endpoints secured

### Deployment Platforms

- **Vercel** (recommended for Next.js)
- **Railway** (for Express backend)
- **AWS** / **Google Cloud** (advanced)

---

## Hackathon Demo Tips

### What to Show

1. **Home page** - Hero with tagline
2. **StudyBuddy** - AI tutor in action
3. **IdeaForge** - Startup advisor demo
4. **Config file** - Show how easy it is to add new apps
5. **Code walkthrough** - Explain the architecture

### Key Talking Points

- "One codebase, multiple AI apps"
- "Just change the config file"
- "No code rewrite needed"
- "Production-ready with OpenAI"
- "Fully responsive and animated"

---

## Common Tasks

### Add a new AI app

```bash
# 1. Create config
mkdir apps/my-app
touch apps/my-app/agent.config.ts

# 2. Define personality in config
# 3. Visit /my-app - it works!
```

### Update styling

- Edit `app/globals.css` for global styles
- Use Tailwind classes in components
- Keep dark mode aesthetic

### Add new component

```bash
# 1. Create in core/components/
touch core/components/MyComponent.tsx

# 2. Export from index
# 3. Import where needed
```

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [OpenAI API](https://platform.openai.com/docs)

---

**Remember**: KiroCore is about simplicity and reusability. Keep the core clean, make configs powerful, and let developers build AI apps in minutes, not days! 🚀👻
