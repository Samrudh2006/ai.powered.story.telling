# StoryFlow AI - AI-Powered Collaborative Storytelling Platform

A modern, feature-rich web application for writers and storytellers that combines the power of AI with collaborative tools to create immersive narratives.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Project Structure](#project-structure)
6. [Installation & Setup](#installation--setup)
7. [Environment Variables](#environment-variables)
8. [API Endpoints](#api-endpoints)
9. [Component Documentation](#component-documentation)
10. [Database Schema](#database-schema)
11. [AI Integration](#ai-integration)
12. [Authentication Flow](#authentication-flow)
13. [Deployment](#deployment)
14. [Contributing](#contributing)
15. [License](#license)

---

## Project Overview

**StoryFlow AI** is a comprehensive storytelling platform that empowers writers with:

- **AI-Assisted Writing**: Generate characters, plot suggestions, and writing improvements using GPT-4o-mini
- **Real-Time Collaboration**: Invite collaborators to work on stories together
- **Visual Story Mapping**: Create branching narratives with an interactive node-based editor
- **Character Management**: Build detailed character profiles with AI-generated portraits
- **Rich Text Editor**: Full-featured writing environment with formatting tools

---

## Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Dashboard** | Central hub for managing stories, viewing shared projects, and accessing AI tools |
| **Rich Text Editor** | TipTap-based editor with formatting, text alignment, highlights, and font customization |
| **Story Management** | Create, edit, delete, and organize stories with progress tracking |
| **Collaboration** | Invite others via email, manage collaborators, real-time sync via Firebase |

### AI-Powered Features

| Feature | Description |
|---------|-------------|
| **LoreForge AI** | AI character generator - creates unique characters with names, roles, descriptions, and quirks |
| **StoryBranch** | AI plot suggestion engine - generates creative plot twists and story branches |
| **Portrait Studio** | AI-enhanced portrait generation with visual descriptions and seed keywords |
| **Writing Muse** | In-editor AI assistant for continuations, improvements, and dialogue generation |

### Explore Hub

| Module | Purpose |
|--------|---------|
| **StoryBranch** | Visual node-based story mapping with drag-and-drop interface |
| **LoreForge AI** | Character creation and management with AI generation |
| **Portrait Studio** | Generate character portraits with multiple style options |

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.0.0 | UI Library |
| TypeScript | 5.8.2 | Type Safety |
| Vite | 6.2.0 | Build Tool & Dev Server |
| TailwindCSS | 4.1.14 | Styling |
| React Router DOM | 7.13.1 | Client-Side Routing |
| Motion (Framer) | 12.23.24 | Animations |
| Lucide React | 0.546.0 | Icons |
| TipTap | 3.22.2 | Rich Text Editor |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Express | 4.21.2 | HTTP Server |
| Firebase | 12.11.0 | Auth & Database |
| Vercel AI SDK | 6.0.0 | AI Integration |
| Zod | 3.24.0 | Schema Validation |

### AI & APIs

| Service | Model | Purpose |
|---------|-------|---------|
| Vercel AI Gateway | openai/gpt-4o-mini | Text Generation |
| OpenAI | GPT-4o-mini | Character, Plot, Writing Suggestions |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                          │
├─────────────────────────────────────────────────────────────────┤
│  Pages: Dashboard | Editor | Explore | Login                    │
│  Components: TiptapEditor | LoreForge | StoryBranch | Portrait  │
│  Services: aiService.ts (API calls)                             │
│  Context: AuthContext (Firebase Auth)                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXPRESS SERVER (server.ts)                   │
├─────────────────────────────────────────────────────────────────┤
│  /api/ai/generate-character  │  AI Character Generation        │
│  /api/ai/generate-plot       │  AI Plot Suggestions            │
│  /api/ai/writing-suggest     │  Writing Improvements           │
│  /api/ai/portrait-description│  Portrait Descriptions          │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   FIREBASE      │  │  VERCEL AI      │  │    FIRESTORE    │
│   AUTH          │  │  GATEWAY        │  │    DATABASE     │
│  (Google SSO)   │  │  (GPT-4o-mini)  │  │  (Stories/Chars)│
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## Project Structure

```
ai.powered.story.telling/
├── src/
│   ├── components/
│   │   ├── editor/
│   │   │   └── TiptapEditor.tsx      # Rich text editor component
│   │   ├── explore/
│   │   │   ├── LoreForge.tsx         # Character management + AI
│   │   │   ├── PortraitStudio.tsx    # AI portrait generator
│   │   │   └── StoryBranch.tsx       # Visual story mapper
│   │   └── SplashScreen.tsx          # Loading screen
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx           # Firebase auth provider
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx             # Main dashboard
│   │   ├── Editor.tsx                # Story editor page
│   │   ├── Explore.tsx               # Explore hub (tabs)
│   │   └── Login.tsx                 # Authentication page
│   │
│   ├── services/
│   │   └── aiService.ts              # AI API client functions
│   │
│   ├── App.tsx                       # Root component + routing
│   ├── firebase.ts                   # Firebase configuration
│   ├── index.css                     # Global styles + Tailwind
│   └── main.tsx                      # Entry point
│
├── server.ts                         # Express server + AI routes
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── vite.config.ts                    # Vite configuration
└── firebase-applet-config.json       # Firebase credentials
```

---

## Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm/pnpm/yarn
- Firebase Project (Firestore + Auth enabled)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Samrudh2006/ai.powered.story.telling.git
cd ai.powered.story.telling

# 2. Install dependencies
npm install

# 3. Configure environment variables (see below)

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration (already in firebase-applet-config.json)
# No additional env vars needed for Firebase

# AI Gateway (Vercel AI SDK uses this automatically in v0 environment)
# For local development, you may need:
OPENAI_API_KEY=your_openai_api_key
```

---

## API Endpoints

### AI Routes (Express Server)

| Endpoint | Method | Description | Request Body |
|----------|--------|-------------|--------------|
| `/api/ai/generate-character` | POST | Generate AI character | `{ genre: string }` |
| `/api/ai/generate-plot` | POST | Generate plot suggestion | `{ context: string, genre: string }` |
| `/api/ai/writing-suggest` | POST | Get writing suggestions | `{ content: string, type: 'continuation' \| 'improve' \| 'dialogue', genre: string }` |
| `/api/ai/portrait-description` | POST | Generate portrait description | `{ characterName: string, characterDescription: string, style: string }` |

### Response Format

```typescript
// Success Response
{
  success: true,
  character: { name, role, description, quirk }  // or plot, suggestion, portrait
}

// Error Response
{
  success: false,
  error: "Error message"
}
```

---

## Component Documentation

### TiptapEditor

Rich text editor with extensive formatting options.

**Props:**
```typescript
interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  readOnly?: boolean;
}
```

**Features:**
- Bold, Italic, Underline, Strikethrough
- Headings (H1-H3), Paragraphs
- Text alignment (Left, Center, Right, Justify)
- Bullet/Ordered lists, Blockquotes
- Text color, Highlights
- Font family selection
- Undo/Redo

### LoreForge

Character management system with AI generation.

**Key Functions:**
- `handleGenerateAICharacter()` - Creates new character via AI
- `handleGeneratePortrait()` - Generates portrait using AI description
- `handleSaveCharacter()` - Persists to Firestore
- `handleDeleteCharacter()` - Removes from database

### StoryBranch

Visual story mapping with draggable nodes.

**Key Functions:**
- `handleGenerateAISuggestion()` - Creates AI plot node
- `handleAddNode()` - Manual node creation
- `handleDrag()` - Node positioning
- Canvas zoom/pan controls

### PortraitStudio

Standalone portrait generation tool.

**Options:**
- Styles: Digital Art, Oil Painting, Watercolor, Anime, Sketch, Photorealistic
- Moods: Heroic, Mysterious, Serene, Intense, Melancholic, Joyful

---

## Database Schema

### Firestore Collections

```
/stories/{storyId}
├── title: string
├── content: string (HTML)
├── genre: string
├── progress: number (0-100)
├── wordCount: number
├── isShared: boolean
├── authorId: string
├── authorName: string
├── collaborators: string[]
├── versions: Version[]
├── createdAt: timestamp
└── updatedAt: timestamp

/stories/{storyId}/characters/{characterId}
├── name: string
├── role: string
├── description: string
├── quirk: string
├── imageUrl: string
├── authorId: string
└── createdAt: timestamp

/stories/{storyId}/nodes/{nodeId}
├── title: string
├── content: string
├── x: number
├── y: number
├── type: 'main' | 'ai' | 'branch'
├── parentId: string | null
├── authorId: string
├── authorName: string
└── createdAt: timestamp

/invitations/{invitationId}
├── storyId: string
├── storyTitle: string
├── inviterId: string
├── inviterName: string
├── inviteeEmail: string
├── status: 'pending' | 'accepted' | 'declined'
└── createdAt: timestamp

/users/{userId}
├── displayName: string
├── email: string
├── photoURL: string
└── createdAt: timestamp
```

---

## AI Integration

### Vercel AI SDK 6.0

The project uses Vercel AI SDK with the AI Gateway for seamless AI integration.

```typescript
// Server-side usage (server.ts)
import { generateText, Output } from 'ai';
import { z } from 'zod';

const { output } = await generateText({
  model: 'openai/gpt-4o-mini',
  output: Output.object({
    schema: z.object({
      name: z.string(),
      role: z.string(),
      description: z.string(),
      quirk: z.string(),
    }),
  }),
  prompt: `Generate a character for a ${genre} story.`,
});
```

### AI Service (Client)

```typescript
// Client-side usage (aiService.ts)
export async function generateCharacter(genre: string): Promise<GeneratedCharacter> {
  const response = await fetch('/api/ai/generate-character', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ genre }),
  });
  const data = await response.json();
  return data.character;
}
```

---

## Authentication Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Login     │────▶│   Firebase  │────▶│   App       │
│   Page      │     │   Auth      │     │   (Auth'd)  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       │   Google SSO      │   onAuthState     │
       │   Email/Pass      │   Changed         │
       └───────────────────┴───────────────────┘
```

**AuthContext** provides:
- `user` - Current Firebase user
- `userProfile` - Extended user data from Firestore
- `loading` - Auth state loading indicator
- `login()` - Email/password authentication
- `signup()` - New user registration
- `loginWithGoogle()` - Google OAuth
- `logout()` - Sign out

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Vite + Express) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type checking |
| `npm run clean` | Remove dist folder |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [TipTap](https://tiptap.dev/) - Rich text editor
- [Firebase](https://firebase.google.com/) - Backend services
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide](https://lucide.dev/) - Icons
- [Motion](https://motion.dev/) - Animations

---

**Built with care by the StoryFlow AI Team**
