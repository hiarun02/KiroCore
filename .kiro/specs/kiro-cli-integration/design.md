# Design Document: Kiro CLI Integration

## Overview

This design integrates Kiro CLI capabilities into the KiroCore platform by creating a backend service layer that interfaces with Kiro CLI through Node.js child processes, and exposing these capabilities through REST APIs that the Next.js frontend can consume. The integration enables users to leverage Kiro's spec management, agent execution, hooks, and steering rules directly from the web interface.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Spec Manager │  │ Chat with    │  │ Steering     │      │
│  │ Component    │  │ Kiro Agent   │  │ Rules UI     │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
└─────────┼──────────────────┼──────────────────┼──────────────┘
          │                  │                  │
          │  HTTP/REST API   │                  │
          │                  │                  │
┌─────────┼──────────────────┼──────────────────┼──────────────┐
│         │    Backend (Express.js)             │              │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌───────▼──────┐      │
│  │ Kiro Spec    │  │ Kiro Agent   │  │ Kiro File    │      │
│  │ Service      │  │ Service      │  │ Service      │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│                    ┌───────▼────────┐                        │
│                    │ Kiro CLI       │                        │
│                    │ Executor       │                        │
│                    └───────┬────────┘                        │
└────────────────────────────┼─────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  Kiro CLI       │
                    │  (child process)│
                    └─────────────────┘
```

### Technology Stack

- **Backend**: Express.js with Node.js child_process for CLI execution
- **Frontend**: Next.js with React components and hooks
- **Communication**: REST APIs with Server-Sent Events (SSE) for streaming
- **File System**: Node.js fs/promises for file operations
- **Process Management**: Node.js spawn for long-running CLI operations

## Components and Interfaces

### Backend Services

#### 1. Kiro CLI Executor (`server/services/kiro-cli-executor.js`)

Core service that interfaces with Kiro CLI through child processes.

```javascript
class KiroCliExecutor {
  /**
   * Execute a Kiro CLI command
   * @param {string} command - The Kiro command to execute
   * @param {Object} options - Execution options
   * @returns {Promise<Object>} - Command result
   */
  async execute(command, options = {})

  /**
   * Execute a Kiro command with streaming output
   * @param {string} command - The Kiro command
   * @param {Function} onData - Callback for streaming data
   * @returns {Promise<Object>} - Final result
   */
  async executeStream(command, onData)

  /**
   * Check if Kiro CLI is available
   * @returns {Promise<boolean>}
   */
  async isKiroAvailable()
}
```

**Key Features**:

- Spawns Kiro CLI as child process
- Captures stdout/stderr streams
- Handles timeouts and errors
- Validates Kiro CLI installation
- Supports both synchronous and streaming execution

#### 2. Kiro Spec Service (`server/services/kiro-spec-service.js`)

Manages spec operations including creation, reading, and task execution.

```javascript
/**
 * Get all specs from .kiro/specs directory
 * @returns {Promise<Array>} - List of spec metadata
 */
export async function getAllSpecs()

/**
 * Get spec details (requirements, design, tasks)
 * @param {string} specName - Name of the spec
 * @returns {Promise<Object>} - Spec documents
 */
export async function getSpecDetails(specName)

/**
 * Create a new spec
 * @param {string} featureName - Name for the new feature
 * @param {string} description - Feature description
 * @returns {Promise<Object>} - Creation result
 */
export async function createSpec(featureName, description)

/**
 * Execute a spec task
 * @param {string} specName - Name of the spec
 * @param {string} taskId - Task identifier
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Object>} - Execution result
 */
export async function executeTask(specName, taskId, onProgress)

/**
 * Update task status in tasks.md
 * @param {string} specName - Name of the spec
 * @param {string} taskId - Task identifier
 * @param {string} status - New status (not_started, in_progress, completed)
 * @returns {Promise<void>}
 */
export async function updateTaskStatus(specName, taskId, status)
```

#### 3. Kiro Agent Service (`server/services/kiro-agent-service.js`)

Handles AI agent interactions with full Kiro CLI capabilities.

```javascript
/**
 * Send message to Kiro agent
 * @param {Object} params - Agent parameters
 * @param {string} params.message - User message
 * @param {string} params.appType - App context
 * @param {Array} params.conversationHistory - Previous messages
 * @param {Function} params.onStream - Streaming callback
 * @returns {Promise<Object>} - Agent response
 */
export async function executeKiroAgent(params)

/**
 * Get agent context (steering rules, specs, etc.)
 * @param {string} appType - App type for context
 * @returns {Promise<Object>} - Context data
 */
export async function getAgentContext(appType)
```

#### 4. Kiro File Service (`server/services/kiro-file-service.js`)

Manages file operations for steering rules, hooks, and other Kiro files.

```javascript
/**
 * Get all steering rules
 * @returns {Promise<Array>} - List of steering rules
 */
export async function getSteeringRules()

/**
 * Get steering rule content
 * @param {string} ruleName - Name of the rule file
 * @returns {Promise<Object>} - Rule content and metadata
 */
export async function getSteeringRule(ruleName)

/**
 * Create or update steering rule
 * @param {string} ruleName - Name of the rule file
 * @param {string} content - Rule content
 * @param {Object} frontMatter - Front matter metadata
 * @returns {Promise<void>}
 */
export async function saveSteeringRule(ruleName, content, frontMatter)

/**
 * Get all agent hooks
 * @returns {Promise<Array>} - List of hooks
 */
export async function getAgentHooks()

/**
 * Get hook configuration
 * @param {string} hookName - Name of the hook
 * @returns {Promise<Object>} - Hook configuration
 */
export async function getHookConfig(hookName)
```

### Backend API Routes

#### Spec Routes (`server/routes/kiro-specs.js`)

```
GET    /api/kiro/specs              - List all specs
GET    /api/kiro/specs/:name        - Get spec details
POST   /api/kiro/specs              - Create new spec
POST   /api/kiro/specs/:name/tasks/:taskId/execute - Execute task (SSE)
PATCH  /api/kiro/specs/:name/tasks/:taskId/status  - Update task status
```

#### Agent Routes (`server/routes/kiro-agent.js`)

```
POST   /api/kiro/agent/chat         - Send message to Kiro agent (SSE)
GET    /api/kiro/agent/context      - Get agent context
```

#### File Routes (`server/routes/kiro-files.js`)

```
GET    /api/kiro/steering           - List steering rules
GET    /api/kiro/steering/:name     - Get steering rule
POST   /api/kiro/steering           - Create steering rule
PUT    /api/kiro/steering/:name     - Update steering rule
GET    /api/kiro/hooks              - List agent hooks
GET    /api/kiro/hooks/:name        - Get hook configuration
```

### Frontend Components

#### 1. Spec Manager Component (`core/components/kiro/SpecManager.tsx`)

Main interface for viewing and managing specs.

```typescript
interface SpecManagerProps {
  onSpecSelect?: (specName: string) => void;
}

export function SpecManager(props: SpecManagerProps);
```

**Features**:

- Lists all available specs
- Displays spec details (requirements, design, tasks)
- Shows task completion status
- Provides task execution interface
- Handles spec creation workflow

#### 2. Spec Detail View (`core/components/kiro/SpecDetailView.tsx`)

Displays detailed information about a specific spec.

```typescript
interface SpecDetailViewProps {
  specName: string;
  onTaskExecute?: (taskId: string) => void;
}

export function SpecDetailView(props: SpecDetailViewProps);
```

**Features**:

- Tabbed interface for requirements/design/tasks
- Markdown rendering for spec documents
- Task list with checkboxes and status
- Execute button for each task
- Real-time task execution progress

#### 3. Task Executor (`core/components/kiro/TaskExecutor.tsx`)

Handles task execution with streaming output.

```typescript
interface TaskExecutorProps {
  specName: string;
  taskId: string;
  onComplete?: () => void;
}

export function TaskExecutor(props: TaskExecutorProps);
```

**Features**:

- Streams task execution output
- Shows progress indicators
- Displays errors and warnings
- Allows cancellation
- Updates task status on completion

#### 4. Steering Rules Manager (`core/components/kiro/SteeringRulesManager.tsx`)

Interface for managing steering rules.

```typescript
interface SteeringRulesManagerProps {
  onRuleSelect?: (ruleName: string) => void;
}

export function SteeringRulesManager(props: SteeringRulesManagerProps);
```

**Features**:

- Lists all steering rules
- Shows rule inclusion type (always, conditional, manual)
- Provides editor for rule content
- Supports front matter editing
- Creates new rules

#### 5. Enhanced Chat with Kiro Agent (`core/components/chat/KiroChatArea.tsx`)

Extended chat component with full Kiro CLI capabilities.

```typescript
interface KiroChatAreaProps extends ChatAreaProps {
  enableKiroFeatures?: boolean;
  specContext?: string;
}

export function KiroChatArea(props: KiroChatAreaProps);
```

**Features**:

- Integrates with Kiro agent service
- Streams responses in real-time
- Provides spec context to agent
- Shows agent actions (file edits, task execution)
- Displays rich formatted responses

### Frontend Hooks

#### useKiroSpecs Hook (`core/hooks/useKiroSpecs.tsx`)

```typescript
export function useKiroSpecs() {
  return {
    specs: Spec[],
    loading: boolean,
    error: string | null,
    getSpec: (name: string) => Promise<SpecDetails>,
    createSpec: (name: string, description: string) => Promise<void>,
    executeTask: (specName: string, taskId: string) => Promise<void>,
    refreshSpecs: () => Promise<void>
  }
}
```

#### useKiroAgent Hook (`core/hooks/useKiroAgent.tsx` - Enhanced)

```typescript
export function useKiroAgent(options: KiroAgentOptions) {
  return {
    messages: Message[],
    sendMessage: (text: string) => Promise<void>,
    loading: boolean,
    error: string | null,
    clear: () => void,
    pushMessage: (msg: Message) => void,
    // New Kiro-specific features
    agentContext: AgentContext,
    isStreaming: boolean
  }
}
```

#### useSteeringRules Hook (`core/hooks/useSteeringRules.tsx`)

```typescript
export function useSteeringRules() {
  return {
    rules: SteeringRule[],
    loading: boolean,
    error: string | null,
    getRule: (name: string) => Promise<SteeringRule>,
    saveRule: (name: string, content: string, frontMatter: object) => Promise<void>,
    refreshRules: () => Promise<void>
  }
}
```

## Data Models

### Spec Model

```typescript
interface Spec {
  name: string;
  path: string;
  hasRequirements: boolean;
  hasDesign: boolean;
  hasTasks: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface SpecDetails {
  name: string;
  requirements: string; // Markdown content
  design: string; // Markdown content
  tasks: Task[];
}

interface Task {
  id: string;
  number: string; // e.g., "1.2"
  description: string;
  status: "not_started" | "in_progress" | "completed";
  isOptional: boolean;
  requirements: string[]; // Referenced requirements
  subtasks: Task[];
}
```

### Agent Context Model

```typescript
interface AgentContext {
  appType: string;
  steeringRules: SteeringRule[];
  availableSpecs: string[];
  projectStructure: string;
}

interface SteeringRule {
  name: string;
  path: string;
  inclusion: "always" | "conditional" | "manual";
  fileMatchPattern?: string;
  content: string;
  frontMatter: Record<string, any>;
}
```

### Execution Result Model

```typescript
interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  duration: number;
  timestamp: Date;
}

interface StreamEvent {
  type: "stdout" | "stderr" | "progress" | "complete" | "error";
  data: string;
  timestamp: Date;
}
```

## Error Handling

### Backend Error Handling

1. **CLI Not Available**

   - Check Kiro CLI installation on server startup
   - Return 503 Service Unavailable if Kiro is not installed
   - Provide installation instructions in error message

2. **Command Execution Errors**

   - Capture stderr from Kiro CLI
   - Parse error messages for user-friendly display
   - Return appropriate HTTP status codes (400, 500)
   - Log full error details for debugging

3. **File System Errors**

   - Handle missing files gracefully
   - Validate file paths to prevent directory traversal
   - Return 404 for missing resources
   - Return 403 for permission errors

4. **Timeout Handling**
   - Set reasonable timeouts for CLI operations (30s default, 5min for tasks)
   - Kill child processes on timeout
   - Return 408 Request Timeout
   - Allow timeout configuration per operation

### Frontend Error Handling

1. **API Errors**

   - Display user-friendly error messages
   - Show retry options for transient failures
   - Log errors to console for debugging
   - Provide fallback UI states

2. **Streaming Errors**

   - Handle connection drops gracefully
   - Show reconnection attempts
   - Allow manual retry
   - Preserve partial results

3. **Validation Errors**
   - Validate inputs before API calls
   - Show inline validation messages
   - Prevent invalid submissions
   - Provide helpful error hints

## Testing Strategy

### Backend Testing

1. **Unit Tests**

   - Test Kiro CLI executor with mocked child processes
   - Test service functions with mocked file system
   - Test API route handlers with mocked services
   - Test error handling paths

2. **Integration Tests**

   - Test actual Kiro CLI execution (if available)
   - Test file system operations with temp directories
   - Test API endpoints with test server
   - Test streaming functionality

3. **Error Scenario Tests**
   - Test CLI not available
   - Test command failures
   - Test timeout scenarios
   - Test invalid inputs

### Frontend Testing

1. **Component Tests**

   - Test spec manager rendering
   - Test task execution UI
   - Test steering rules editor
   - Test error states

2. **Hook Tests**

   - Test useKiroSpecs with mocked API
   - Test useKiroAgent with mocked streaming
   - Test useSteeringRules with mocked API
   - Test error handling in hooks

3. **Integration Tests**
   - Test full spec creation workflow
   - Test task execution flow
   - Test chat with Kiro agent
   - Test steering rules management

### End-to-End Testing

1. **Spec Workflow**

   - Create new spec
   - View spec details
   - Execute tasks
   - Verify task completion

2. **Agent Interaction**

   - Send messages to agent
   - Receive streaming responses
   - Execute agent-suggested tasks
   - Verify context awareness

3. **File Management**
   - Create steering rules
   - Edit existing rules
   - View hooks
   - Verify file persistence

## Security Considerations

1. **Command Injection Prevention**

   - Sanitize all inputs before passing to CLI
   - Use parameterized commands where possible
   - Validate command structure
   - Whitelist allowed commands

2. **Path Traversal Prevention**

   - Validate all file paths
   - Restrict operations to .kiro directory
   - Use path.join() for safe path construction
   - Check for ".." in paths

3. **Resource Limits**

   - Limit concurrent CLI executions
   - Set memory limits for child processes
   - Implement rate limiting on API endpoints
   - Timeout long-running operations

4. **Access Control**
   - Validate app context for operations
   - Restrict file access to allowed directories
   - Log all CLI operations
   - Consider authentication for production use

## Performance Considerations

1. **Caching**

   - Cache spec list and metadata
   - Cache steering rules
   - Invalidate cache on file changes
   - Use file watchers for cache invalidation

2. **Streaming**

   - Use Server-Sent Events for long operations
   - Stream task execution output
   - Stream agent responses
   - Implement backpressure handling

3. **Concurrent Operations**

   - Limit concurrent task executions
   - Queue task requests if needed
   - Use worker threads for heavy operations
   - Implement operation prioritization

4. **File System Optimization**
   - Batch file reads where possible
   - Use streaming for large files
   - Implement file watching for updates
   - Cache frequently accessed files

## Deployment Considerations

1. **Kiro CLI Installation**

   - Document Kiro CLI installation requirements
   - Provide installation scripts
   - Check CLI availability on startup
   - Provide clear error messages if missing

2. **Environment Configuration**

   - Configure Kiro CLI path
   - Set operation timeouts
   - Configure logging levels
   - Set resource limits

3. **Monitoring**

   - Log all CLI operations
   - Track operation durations
   - Monitor error rates
   - Alert on failures

4. **Scaling**
   - Consider process pooling for CLI operations
   - Implement operation queuing
   - Use load balancing for multiple instances
   - Share file system state across instances
