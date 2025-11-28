# Product Overview

KiroCore is a universal AI agent platform that transforms a single codebase into multiple specialized applications through configuration files. Built for the Skeleton Crew hackathon.

## Core Concept

One reusable skeleton codebase that powers multiple AI applications through config-driven architecture. Each app has its own personality, theme, and behavior while sharing the same core components.

## Current Applications

1. **StudyBuddy** (`/study-buddy`) - AI tutor for education and learning
   - Theme: Blue (#3b82f6)
   - Personality: Patient, encouraging educator
2. **IdeaForge** (`/idea-forge`) - Creative brainstorming partner
   - Theme: Purple (#8b5cf6)
   - Personality: Enthusiastic, inspiring innovator

## Key Features

- Dynamic app loading based on URL routes
- ChatGPT-style interface with conversation history
- Dark mode with ghostly aesthetic
- Deep Kiro CLI integration (hooks, specs, steering, multi-agent)
- Full-stack architecture with Express backend
- Extensible: new apps can be added in minutes

## Architecture Philosophy

- Config over code: Apps defined by simple configuration files
- Separation of concerns: Core components vs app-specific configs
- Reusability: Shared UI components and services
- Scalability: Easy to add new apps without touching core code
