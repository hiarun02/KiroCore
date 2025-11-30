"use client";

export function DocsContent() {
  return (
    <div className="pt-20 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">
          Documentation
        </h1>
        <p className="text-lg text-zinc-400 mb-12">
          Build multiple AI apps from one codebase
        </p>

        <div className="space-y-12">
          <GettingStarted />
          <Installation />
          <CreatingApps />
          <APIReference />
        </div>
      </div>
    </div>
  );
}

function GettingStarted() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-zinc-100">🚀 Getting Started</h2>
      <p className="text-zinc-300">
        KiroCore lets you build multiple AI apps from one codebase. Create a
        config file, define the AI personality, and you're done.
      </p>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <p className="text-zinc-300">
          <strong>One codebase, endless AI apps.</strong> You provide the
          personality through config files.
        </p>
      </div>
    </section>
  );
}

function Installation() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-zinc-100">📦 Installation</h2>

      <h3 className="text-2xl font-semibold text-zinc-100">Prerequisites</h3>
      <ul className="space-y-2 text-zinc-300">
        <li className="flex items-start gap-2">
          <span className="text-primary mt-1">•</span>
          <span>Node.js 18+ installed</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary mt-1">•</span>
          <span>npm package manager</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary mt-1">•</span>
          <span>Google Gemini API key</span>
        </li>
      </ul>

      <h3 className="text-2xl font-semibold text-zinc-100 mt-8">
        Install Dependencies
      </h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-zinc-300">npm install</code>
      </div>

      <h3 className="text-2xl font-semibold text-zinc-100 mt-8">
        Set Up Environment Variables
      </h3>
      <p className="text-zinc-300">
        Create{" "}
        <code className="bg-zinc-800 px-2 py-1 rounded">server/.env</code>:
      </p>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-zinc-300">
          PORT=3001
          <br />
          GEMINI_API_KEY=your_gemini_api_key_here
        </code>
      </div>

      <h3 className="text-2xl font-semibold text-zinc-100 mt-8">
        Run Development Server
      </h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-zinc-300">npm run dev</code>
      </div>
      <p className="text-zinc-300">
        Frontend:{" "}
        <a
          href="http://localhost:3000"
          className="text-primary hover:underline"
        >
          http://localhost:3000
        </a>
        <br />
        Backend:{" "}
        <a
          href="http://localhost:3001"
          className="text-primary hover:underline"
        >
          http://localhost:3001
        </a>
      </p>
    </div>
  );
}

function CreatingApps() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-zinc-100">✨ Creating Apps</h2>

      <div className="space-y-3">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <p className="text-zinc-300 text-sm mb-3">
            1. Create folder:{" "}
            <code className="bg-zinc-800 px-2 py-0.5 rounded">apps/my-app</code>
          </p>
          <p className="text-zinc-300 text-sm mb-3">
            2. Add{" "}
            <code className="bg-zinc-800 px-2 py-0.5 rounded">
              agent.config.js
            </code>
          </p>
          <div className="bg-zinc-950 rounded p-3 overflow-x-auto">
            <pre className="text-xs text-zinc-300">
              {`export default {
  name: "MyApp",
  description: "My AI assistant",
  icon: "BsRobot",
  systemPrompt: "You are helpful...",
  welcomeMessage: "Hello!",
  theme: { primary: "#8b5cf6" }
};`}
            </pre>
          </div>
          <p className="text-zinc-300 text-sm mt-3">
            3. Visit{" "}
            <code className="bg-zinc-800 px-2 py-0.5 rounded">/my-app</code>
          </p>
        </div>
      </div>
    </section>
  );
}

function APIReference() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-zinc-100">📚 API Reference</h2>

      <h3 className="text-2xl font-semibold text-zinc-100">
        Backend Endpoints
      </h3>

      <div className="space-y-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-mono rounded">
              POST
            </span>
            <code className="text-zinc-300">/api/chat</code>
          </div>
          <p className="text-zinc-400 mb-4">Send a message to the AI agent</p>

          <h4 className="font-semibold text-zinc-100 mb-2">Request Body:</h4>
          <div className="bg-zinc-950 rounded p-3 overflow-x-auto mb-4">
            <pre className="text-xs text-zinc-300">
              {`{
  "message": "Hello, how are you?",
  "appType": "study-buddy",
  "conversationHistory": []
}`}
            </pre>
          </div>

          <h4 className="font-semibold text-zinc-100 mb-2">Response:</h4>
          <div className="bg-zinc-950 rounded p-3 overflow-x-auto">
            <pre className="text-xs text-zinc-300">
              {`{
  "success": true,
  "response": "Hi! I'm doing great...",
  "appType": "study-buddy",
  "timestamp": "2024-01-01T00:00:00Z",
  "source": "gemini-ai"
}`}
            </pre>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-mono rounded">
              GET
            </span>
            <code className="text-zinc-300">/api/apps</code>
          </div>
          <p className="text-zinc-400 mb-4">Get all available apps</p>

          <h4 className="font-semibold text-zinc-100 mb-2">Response:</h4>
          <div className="bg-zinc-950 rounded p-3 overflow-x-auto">
            <pre className="text-xs text-zinc-300">
              {`{
  "apps": [
    {
      "id": "study-buddy",
      "name": "StudyBuddy",
      "description": "Your AI study companion",
      "icon": "FiBookOpen",
      "theme": { "primary": "#3b82f6" }
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function Deployment() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-zinc-100">🌐 Deployment</h2>

      <p className="text-zinc-300 leading-relaxed">
        Deploy your KiroCore apps to production with these recommended
        platforms.
      </p>

      <h3 className="text-2xl font-semibold text-zinc-100">
        Vercel (Recommended)
      </h3>
      <div className="space-y-4">
        <p className="text-zinc-300">Best for Next.js frontend deployment</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <ol className="space-y-3 text-zinc-300">
            <li className="flex gap-3">
              <span className="font-bold text-primary">1.</span>
              <span>Push your code to GitHub</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">2.</span>
              <span>Connect your repo to Vercel</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">3.</span>
              <span>Add environment variables (OPENAI_API_KEY)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">4.</span>
              <span>Deploy! 🚀</span>
            </li>
          </ol>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-zinc-100 mt-8">
        Railway (Backend)
      </h3>
      <div className="space-y-4">
        <p className="text-zinc-300">Best for Express backend deployment</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <ol className="space-y-3 text-zinc-300">
            <li className="flex gap-3">
              <span className="font-bold text-primary">1.</span>
              <span>Create a Railway account</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">2.</span>
              <span>Deploy from GitHub</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">3.</span>
              <span>Set environment variables</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">4.</span>
              <span>Get your backend URL</span>
            </li>
          </ol>
        </div>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-semibold text-yellow-400 mb-3">
          ⚠️ Important
        </h3>
        <p className="text-zinc-300">
          Set{" "}
          <code className="bg-zinc-800 px-2 py-1 rounded">GEMINI_API_KEY</code>{" "}
          in your deployment platform. Get your key at{" "}
          <a
            href="https://makersuite.google.com/app/apikey"
            className="text-primary hover:underline"
          >
            Google AI Studio
          </a>
          .
        </p>
      </div>
    </div>
  );
}
