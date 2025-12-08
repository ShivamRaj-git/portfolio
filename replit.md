# Gen-Z Rave Portfolio

## Overview
A fully responsive, modern, animated personal portfolio website featuring a Gen-Z dark rave aesthetic with neon accents, grainy textures, glitch effects, and cyber-punk vibes. Built with React, TypeScript, Three.js, and Framer Motion.

## Current State
- **Status**: MVP Complete
- **Last Updated**: December 2024

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, TailwindCSS
- **3D Graphics**: Three.js (vanilla integration)
- **Animations**: Framer Motion
- **Routing**: Wouter
- **State Management**: TanStack React Query
- **Backend**: Express.js, Node.js
- **Storage**: In-memory storage

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── cards/           # ProjectCard, SkillCard, TimelineCard
│   │   ├── effects/         # GlitchText, GrainOverlay, NeonButton
│   │   ├── layout/          # Navigation, PageTransition
│   │   ├── three/           # ParticleScene, SkillSphere (Three.js scenes)
│   │   └── ui/              # Shadcn UI components
│   ├── hooks/               # Custom hooks (useReducedMotion, etc.)
│   ├── pages/               # Landing, About, Skills, Projects, Contact
│   └── lib/                 # Utilities and query client
server/
├── routes.ts                # API endpoints
├── storage.ts               # In-memory data storage
└── index.ts                 # Express server setup
shared/
└── schema.ts                # Type definitions and Zod schemas
```

## Features

### Pages
1. **Landing Page** - Three.js animated particle background, glitch text effects, neon CTAs
2. **About Page** - Philosophy/approach cards, animated timeline with education/experience
3. **Skills Page** - 3D hover skill cards, rotating skill sphere, category filters
4. **Projects Page** - Grid layout, 3D tilt hover effects, links to detail pages
5. **Project Detail** - Full project information, tech stack badges, live/github links
6. **Contact Page** - Animated form with validation, social links with neon hover

### Visual Effects
- Grain/noise overlay
- Scanline effects
- Glitch text animations
- Chromatic aberration
- Neon glow effects
- Page transitions with animations
- 3D tilt interactions

### Technical Features
- Reduced motion support for accessibility
- Responsive design (mobile-first)
- API-driven data (projects, skills, timeline)
- Form validation with Zod
- Skeleton loading states
- Error handling

## API Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `GET /api/skills` - Get all skills
- `GET /api/timeline` - Get timeline items
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages

## Design System

### Colors
- **Base**: Black (#000000), Deep charcoal (#0a0a0a)
- **Neon Pink**: #FF10F0
- **Neon Green**: #39FF14
- **Neon Cyan**: #00D9FF
- **Ultraviolet**: #8B00FF

### Typography
- **Display**: Bebas Neue (headings)
- **Body**: Space Grotesk (paragraphs)
- **Mono**: JetBrains Mono (code/labels)

## Running the Project

```bash
npm run dev
```

The application runs on port 5000.

## Architecture Decisions
- Dark mode only (no light mode toggle)
- Three.js scenes use vanilla integration (not React Three Fiber due to peer dependency issues)
- In-memory storage for MVP (no database required)
- Page transitions via Framer Motion (not Barba.js, which is incompatible with React SPA routing)

## User Preferences
- Gen-Z aesthetic with cyber-punk vibes
- Heavy use of neon glows and animations
- Interactive 3D elements
- Bold, futuristic typography
