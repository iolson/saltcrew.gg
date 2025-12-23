# Saltcrew Website

Modern, responsive website for the Saltcrew Counter-Strike team. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Home Page**: Hero section with team overview and quick links
- **Team Roster**: Player cards with optional photos and stats links to CSStats.gg
- **Match Results**: Comprehensive match history with scores and outcomes
- **Match Details**: Individual match pages with detailed recaps (markdown-based)
- **Responsive Design**: Mobile-first design that works on all devices
- **Fast Performance**: Static site generation for optimal loading speeds

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Content**: Markdown with gray-matter and remark
- **Deployment**: Vercel (recommended) or Netlify

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the site

## Project Structure

```
saltcrew-website/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── team/              # Team roster page
│   ├── matches/           # Matches section
│   │   ├── page.tsx      # Match list page
│   │   └── [id]/         # Individual match pages
│   ├── layout.tsx         # Root layout with nav/footer
│   └── globals.css        # Global styles and theme
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Site navigation
│   └── Footer.tsx         # Site footer
├── content/               # Content files
│   └── recaps/           # Markdown files for match recaps (named by match ID)
├── lib/                   # Utility functions
│   └── markdown.ts       # Markdown processing utilities
└── public/               # Static assets
    └── images/           # Images and logos
        └── players/      # Player photos (optional)
```

## Content Management

### Adding Matches and Recaps

1. **Add the match to the matches list:**
   - Edit `app/matches/page.tsx` and add a new match to the `matches` array
   - Note the match ID (e.g., '6', '7', etc.)

2. **Add the match to the detail page:**
   - Edit `app/matches/[id]/page.tsx` and add the same match to the `matches` array there
   - (In a real app, this would come from a database)

3. **Create the recap (optional):**
   - Create a new markdown file in `content/recaps/` named `{match-id}.md`
   - Example: `content/recaps/6.md` for match ID 6

```markdown
---
title: "Your Match Title"
date: "2024-12-17"
opponent: "Opponent Name"
result: "win" # or "loss"
score: "16-13"
map: "de_dust2"
excerpt: "Brief description"
---

Your detailed match recap content here with full markdown support...
```

The recap will automatically appear on the individual match page at `/matches/{id}`

### Updating Team Roster

Edit the `players` array in `app/team/page.tsx`:

```typescript
{
  name: 'PlayerName',
  role: 'Player',
  steamId: '76561197971721260',
  image: '/images/players/playername.jpg',  // Optional
  season53Stats: 'https://csstats.gg/...',
  season54Stats: 'https://csstats.gg/...',
}
```

### Adding Player Photos

See [HOW_TO_ADD_IMAGES.md](HOW_TO_ADD_IMAGES.md) for detailed instructions on adding player photos.

## Customization

### Theme Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --background: #0a0a0a;    /* Main background */
  --accent: #ff2d00;         /* Accent/brand color */
  --card-bg: #1a1a1a;        /* Card backgrounds */
  --border: #333;            /* Border color */
}
```

### Navigation Links

Update `components/Navigation.tsx` to modify navigation items.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/saltcrew-website)

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `.next`

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Adding New Features

### Add a New Page

1. Create a new directory in `app/` (e.g., `app/about/`)
2. Add a `page.tsx` file in that directory
3. Add the route to navigation in `components/Navigation.tsx`

### Add Player Photos

1. Add player images to `public/images/players/`
2. Update the player entries in `app/team/page.tsx` to include the `image` property
3. See [HOW_TO_ADD_IMAGES.md](HOW_TO_ADD_IMAGES.md) for detailed instructions

## License

Copyright © 2024 Saltcrew. All rights reserved.

## Support

For issues or questions, contact the team administrators.
