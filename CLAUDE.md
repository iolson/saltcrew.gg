# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for SaltcrewGG, a North American Counter-Strike team. The site serves as the team's online presence with a landing page and player expectations document.

## Architecture

The project is a simple static website with minimal dependencies:

- **index.php**: Entry point for Heroku PHP buildpack deployment (includes index.html)
- **index.html**: Main landing page displaying the team logo centered on a black background
- **expectations.html**: Standalone team expectations page with player requirements and performance tracking
- **composer.json**: Empty JSON config for Heroku PHP buildpack support
- **logo.png**: Primary team logo
- **images/saltcrew.png**: Logo variant used in the expectations page

### Deployment

The site uses Heroku with the PHP buildpack. The `index.php` file is a shim that includes `index.html` to work with Heroku's PHP buildpack requirements.

### Styling Approach

Both HTML files use inline `<style>` tags with CSS custom properties (CSS variables). The expectations page features:
- Dark theme with `#1a1a1a` background and `#e50000` red accent color
- Responsive design with mobile breakpoints at 768px and 480px
- Card-based layout with sections for expectations and team goals

## Development

### Making Changes

When editing HTML files:
- Both pages use inline styles - no separate CSS files
- Logo paths: `logo.png` for index.html, `images/saltcrew.png` for expectations.html
- Maintain the dark theme aesthetic (black/dark gray backgrounds, red accents)

### Testing Locally

Open HTML files directly in a browser or use a simple HTTP server:
```bash
python -m http.server 8000
# or
php -S localhost:8000
```

### Git Workflow

- Main branch: `main`
- Current development branch: `new-website`
- Merge changes to main for deployment
