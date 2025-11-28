# Kiro CLI Integration Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│                      (Next.js + React)                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Header     │    │  ChatArea    │    │ KiroStatus   │ │
│  │              │    │              │    │              │ │
│  │ - App Name   │    │ - Messages   │    │ - Indicator  │ │
│  │ - Status     │    │ - Input      │    │ - Tooltip    │ │
│  │ - Nav        │    │ - Loading    │    │ - Refresh    │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│                              │                              │
│                              ↓                              │
│                    ┌──────────────────┐                     │
│                    │  MessageList     │                     │
│                    │                  │                     │
│                    │  - UserMessage   │                     │
│                    │  - AIMessage     │                     │
│                    │    • Source      │                     │
│                    │    • Code Format │                     │
│                    │    • Timestamp   │                     │
│                    └──────────────────┘                     │
│                              │                              │
└──────────────────────────────┼──────────────────────────────┘
                               │
                               ↓
                    ┌──────────────────┐
                    │   API Service    │
                    │   (api.ts)       │
                    │                  │
                    │ - sendMessage()  │
                    │ - checkStatus()  │
                    │ - getApps()      │
                    └──────────────────┘
                               │
                               ↓ HTTP/JSON
┌──────────────────────────────┼──────────────────────────────┐
│                         BACKEND                              │
│                    (Express.js + Node)                       │
├──────────────────────────────┼──────────────────────────────┤
│                              │                              │
│                    ┌─────────┴─────────┐                    │
│                    │   API Routes      │                    │
│                    │                   │                    │
│         ┌──────────┼───────────────────┼──────────┐         │
│         │          │                   │          │         │
│    ┌────▼────┐ ┌──▼──────┐      ┌────▼────┐     │         │
│    │  /chat  │ │ /apps   │      │ /kiro   │     │         │
│    │         │ │         │      │ /status │     │         │
│    └────┬────┘ └──┬──────┘      └────┬────┘     │         │
│         │         │                   │          │         │
│         └─────────┼───────────────────┘          │         │
│                   │                              │         │
│         ┌─────────▼─────────┐                    │         │
│         │                   │                    │         │
│    ┌────▼──────┐      ┌────▼──────┐             │         │
│    │   Kiro    │      │    App    │             │         │
│    │  Service  │      │  Service  │             │         │
│    │           │      │           │             │         │
│    │ - execute │      │ - getApp  │             │         │
│    │ - test    │      │ - getAll  │             │         │
│    │ - fallback│      │ - config  │             │         │
│    └─────┬─────┘      └───────────┘             │         │
│          │                                       │         │
└──────────┼───────────────────────────────────────┘         │
           │                                                  │
           ↓                                                  │
    ┌──────────────┐                                         │
    │  Kiro CLI    │                                         │
    │              │                                         │
    │ - Available? │                                         │
    │   ├─ YES → Execute                                     │
    │   └─ NO  → Fallback                                    │
    └──────────────┘                                         │
           │                                                  │
           ↓                                                  │
    ┌──────────────┐                                         │
    │ App .kiro/   │                                         │
    │              │                                         │
    │ - Config     │                                         │
    │ - Specs      │                                         │
    │ - Hooks      │                                         │
    │ - Steering   │                                         │
    └──────────────┘                                         │
```

## Data Flow

### 1. User Sends Message

```
User Input
    ↓
ChatArea.handleSendMessage()
    ↓
Add user message to state
    ↓
api.sendChatMessage()
    ↓
POST /api/chat
    {
      message: "Hello",
      appType: "study-buddy",
      conversationHistory: [...]
    }
```

### 2. Backend Processing

```
Express Route: /api/chat
    ↓
Validate request
    ↓
kiroService.executeKiroAgent()
    ↓
Check app .kiro/ directory
    ↓
    ├─ Exists? → executeKiroCLI()
    │               ↓
    │           Run: kiro chat "message"
    │               ↓
    │           Return response
    │
    └─ Not exists? → getFallbackResponse()
                        ↓
                    Return mock response
    ↓
Return JSON
    {
      success: true,
      response: "...",
      source: "kiro-cli" | "fallback",
      timestamp: "..."
    }
```

### 3. Frontend Display

```
Receive response
    ↓
Create AI message object
    {
      id: "...",
      role: "assistant",
      content: "...",
      source: "kiro-cli",
      timestamp: Date
    }
    ↓
Add to messages state
    ↓
MessageList renders
    ↓
AIMessage component
    ↓
    ├─ Format content (code blocks)
    ├─ Show source badge
    ├─ Apply styling
    └─ Display timestamp
```

## Component Hierarchy

```
App
└── Layout
    ├── Header
    │   ├── App Name
    │   ├── KiroStatus ← Status indicator
    │   └── Navigation
    │
    └── ChatArea
        ├── EmptyState (if no messages)
        │   └── Welcome message
        │
        ├── MessageList (if messages exist)
        │   └── Messages[]
        │       ├── UserMessage
        │       │   ├── Content
        │       │   └── Timestamp
        │       │
        │       └── AIMessage
        │           ├── Content (formatted)
        │           ├── Source badge
        │           └── Timestamp
        │
        ├── Error Banner (if error)
        │
        └── MessageInput
            ├── Textarea
            └── Send Button
```

## State Management

### ChatArea State

```typescript
{
  messages: Message[],      // Conversation history
  isLoading: boolean,       // Waiting for response
  error: string | null      // Error message
}
```

### Message Type

```typescript
{
  id: string,
  role: "user" | "assistant",
  content: string,
  timestamp: Date,
  source?: "kiro-cli" | "fallback",
  error?: boolean
}
```

### KiroStatus State

```typescript
{
  status: "checking" | "available" | "unavailable",
  showTooltip: boolean
}
```

## API Endpoints

### POST /api/chat

**Request:**

```json
{
  "message": "Hello",
  "appType": "study-buddy",
  "conversationHistory": []
}
```

**Response:**

```json
{
  "success": true,
  "response": "Hi! How can I help?",
  "appType": "study-buddy",
  "source": "kiro-cli",
  "timestamp": "2025-11-28T..."
}
```

### GET /api/kiro/status

**Response:**

```json
{
  "success": true,
  "available": true,
  "message": "Kiro CLI is available"
}
```

### GET /api/apps

**Response:**

```json
{
  "success": true,
  "apps": [
    {
      "id": "study-buddy",
      "name": "StudyBuddy",
      "icon": "📚",
      ...
    }
  ]
}
```

## Error Handling

### Frontend Errors

```
Network Error
    ↓
Catch in api.ts
    ↓
Throw error
    ↓
Catch in ChatArea
    ↓
    ├─ Set error state
    ├─ Show error banner
    └─ Add error message to chat
```

### Backend Errors

```
Kiro CLI Error
    ↓
Catch in kiroService
    ↓
Log error
    ↓
Return fallback response
    ↓
Frontend receives valid response
```

## Security Layers

1. **Input Validation**

   - Check required fields
   - Validate message length
   - Sanitize input

2. **Command Sanitization**

   - Escape shell characters
   - Prevent injection
   - Timeout protection

3. **Error Boundaries**

   - Catch exceptions
   - Graceful degradation
   - User-friendly messages

4. **CORS Protection**
   - Configured origins
   - Secure headers
   - Method restrictions

## Performance Optimizations

1. **Frontend**

   - React.memo for components
   - Debounced status checks
   - Optimistic UI updates
   - Lazy loading

2. **Backend**
   - Command timeouts
   - Response caching (future)
   - Connection pooling
   - Error recovery

## Deployment Considerations

### Environment Variables

```bash
# Backend
PORT=3001

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Production Setup

1. Build frontend: `npm run build`
2. Start backend: `npm run dev:backend`
3. Start frontend: `npm start`
4. Ensure Kiro CLI in PATH

### Docker (Future)

```dockerfile
# Backend container with Kiro CLI
# Frontend container with Next.js
# Nginx reverse proxy
```

## Monitoring

### Logs to Watch

- Backend startup: Kiro CLI detection
- Chat requests: Message processing
- Errors: Kiro CLI failures
- Status checks: Availability changes

### Metrics to Track

- Response times
- Error rates
- Fallback usage
- Message volume

## Conclusion

This architecture provides:

- ✅ Clean separation of concerns
- ✅ Graceful degradation
- ✅ Type safety
- ✅ Error resilience
- ✅ Scalability
- ✅ Maintainability
