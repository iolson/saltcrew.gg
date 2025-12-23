# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, responsive website for SaltcrewGG, a North American Counter-Strike team. Built with Next.js 16, TypeScript, and Tailwind CSS v4, the site features team roster management, match results tracking, and detailed match recaps with markdown support.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Content Management**: Markdown with gray-matter and remark
- **Deployment**: Vercel (recommended) or Netlify

## Architecture

### Project Structure

```
/
├── app/                    # Next.js app directory (App Router)
│   ├── page.tsx           # Home page with hero section
│   ├── layout.tsx         # Root layout with navigation and footer
│   ├── globals.css        # Global styles and theme variables
│   ├── favicon.ico        # Site favicon
│   ├── team/              # Team roster section
│   │   └── page.tsx       # Player cards with stats links
│   ├── matches/           # Matches section
│   │   ├── page.tsx       # Match history list
│   │   └── [id]/          # Dynamic match detail pages
│   │       └── page.tsx   # Individual match with recap
│   └── partners/          # Partners/Sponsors page
│       └── page.tsx       # Partner logos and information
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Site navigation header
│   └── Footer.tsx         # Site footer
├── data/                  # Centralized data files (★ UPDATE THESE TO MANAGE CONTENT)
│   ├── matches.ts         # Match data (scores, opponents, results)
│   ├── players.ts         # Player roster data
│   └── README.md          # Guide for managing data files
├── content/               # Content files
│   └── recaps/           # Markdown match recaps (named by match ID)
├── lib/                   # Utility functions
│   └── markdown.ts       # Markdown processing utilities
├── public/               # Static assets
│   └── images/           # Images and logos
│       ├── players/      # Player photos
│       └── partners/     # Partner/sponsor logos
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
├── postcss.config.mjs    # PostCSS configuration
├── eslint.config.mjs     # ESLint configuration
└── vercel.json          # Vercel deployment configuration
```

## Key Features

1. **Home Page**: Hero section with team overview and quick navigation links
2. **Team Roster**: Player cards with optional photos, roles, and CSStats.gg links
3. **Match Results**: Comprehensive match history with scores and outcomes
4. **Match Details**: Individual match pages with detailed markdown-based recaps
5. **Responsive Design**: Mobile-first design that works seamlessly on all devices
6. **Static Site Generation**: Optimized performance with SSG for fast loading

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

The development server runs at http://localhost:3000

### Theme Customization

Edit `app/globals.css` to customize theme colors:

```css
:root {
  --background: #0a0a0a;    /* Main background color */
  --accent: #ff2d00;         /* Accent/brand color (red) */
  --card-bg: #1a1a1a;        /* Card backgrounds */
  --border: #333;            /* Border color */
}
```

## Content Management

**IMPORTANT**: All content is managed through centralized data files in the `/data` directory. See `/data/README.md` for detailed instructions.

### Adding Matches

Edit `/data/matches.ts` and add a new object to the `matches` array:

```typescript
{
  id: '6',                          // Unique ID (increment from last)
  date: '2024-12-20',              // Match date (YYYY-MM-DD)
  tournament: 'ESEA Season 54',    // Tournament name
  opponent: 'Team Name',           // Opponent team name
  saltcrewScore: 16,               // Saltcrew's score
  opponentScore: 13,               // Opponent's score
  map: 'de_dust2',                 // Map name (optional)
  result: 'win',                   // 'win' or 'loss'
  hasRecap: true,                  // true if you have a recap markdown file
}
```

**Benefits**: Changes appear automatically on both the matches list page and detail pages.

### Adding Match Recaps

1. Add match data to `/data/matches.ts` with `hasRecap: true`
2. Create a markdown file in `content/recaps/` named `{match-id}.md`:

```markdown
---
title: "Match Title"
date: "2024-12-17"
opponent: "Opponent Name"
result: "win"
score: "16-13"
map: "de_dust2"
excerpt: "Brief description"
---

Your detailed match recap content here with full markdown support...
```

The recap will automatically appear on the individual match page at `/matches/{id}`

### Updating Team Roster

Edit `/data/players.ts` and add/edit player objects:

```typescript
{
  name: 'PlayerName',                                    // Display name
  role: 'Player',                                        // Role (Player, Captain & IGL, etc.)
  steamId: '76561197971721260',                         // Steam ID
  image: '/images/players/playername.png',              // Path to player image (optional)
  statsUrl: 'https://csstats.gg/player/76561197971721260', // Stats page URL (CS Stats or Leadify)
}
```

**Benefits**: Single source of truth - edit once, updates everywhere.

### Adding Player Photos

1. Add player image to `public/images/players/`
2. Update the player's `image` field in `/data/players.ts`
3. Use `/images/players/nopicture.png` as fallback for players without photos

### Adding Partners/Sponsors

Edit `/app/partners/page.tsx` and add partner objects to the `partners` array:

```typescript
{
  name: 'Partner Name',
  logo: '/images/partners/partner-logo.png',
  url: 'https://partner-website.com',
  description: 'Brief description of the partnership',
}
```

Add partner logos to `public/images/partners/`

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import repository
4. Vercel auto-detects Next.js and deploys

Configuration is in `vercel.json`

### Netlify

1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Import repository
4. Build command: `npm run build`
5. Publish directory: `.next`

## Git Workflow

- **Main branch**: `main` - production/deployment branch
- **Development branch**: `new-website` - current development work
- Merge changes to `main` for deployment

## Making Changes

### Adding New Pages

1. Create new directory in `app/` (e.g., `app/about/`)
2. Add `page.tsx` file in that directory
3. Add route to navigation in `components/Navigation.tsx`

### Modifying Navigation

Edit `components/Navigation.tsx` to update navigation links and structure

### Styling Guidelines

- Use Tailwind CSS utility classes for styling
- Follow the dark theme aesthetic (black/dark gray backgrounds, red accents)
- Mobile-first responsive design
- Maintain consistency with existing components

## Important Files

- `data/matches.ts` - **Match data (edit here to add/update matches)**
- `data/players.ts` - **Player roster data (edit here to manage team)**
- `data/README.md` - Detailed guide for managing data files
- `app/layout.tsx` - Root layout wrapper for all pages
- `app/globals.css` - Global styles and CSS variables
- `components/Navigation.tsx` - Site navigation (includes Shop link to Arma.gg)
- `lib/markdown.ts` - Markdown processing utilities for recaps
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration

## Notes

- The `.next/` directory is auto-generated build output (gitignored)
- `node_modules/` contains dependencies (gitignored)
- **All match and player data is centralized in `/data` directory** - single source of truth
- Data files use TypeScript for type safety and better developer experience
- Player photos are optional - cards display placeholder when image is not provided
- Shop link in navigation points to https://arma.gg/collections/saltcrew (external)
