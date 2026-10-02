# Peculiar Sisters Fellowship (PSF) Website

This project is the official website for Peculiar Sisters Fellowship (PSF), a Christ-centered women’s fellowship committed to prayer, spiritual growth, mentorship, and purposeful living.

The site is designed to help visitors learn about the ministry, discover upcoming events, submit prayer requests, learn about conferences and testimonies, and connect with the community.

## Overview

- Responsive church/fellowship website
- Modern landing page with event highlights and ministry messaging
- File-based routing for a multi-page experience
- Built with React, Vite, TypeScript, and Tailwind CSS
- Uses reusable UI components and a polished, elegant design system

## Live Demo

https://peculiar-sisters-web.vercel.app/

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Router / TanStack Start
- Tailwind CSS
- shadcn-style UI components
- Lucide React icons

## Project Structure

```text
src/
  assets/              # Images and media assets
  components/          # Shared UI components and layout
  hooks/               # Custom React hooks
  lib/                 # Utility functions and app helpers
  routes/              # File-based app routes
  styles.css           # Global styling and theme setup
  router.tsx           # Router setup
  server.ts            # Server related setup
  start.ts             # App bootstrap
public/                # Static assets
package.json           # Scripts and dependencies
vite.config.ts        # Vite configuration
```

## Available Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run format
```

### Scripts

- `npm run dev` — starts the local development server
- `npm run build` — creates a production build
- `npm run preview` — previews the production build locally
- `npm run lint` — runs ESLint checks
- `npm run format` — formats the codebase with Prettier

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm run dev
```

3. Open the local URL shown in the terminal, usually:

```text
http://localhost:3000
```

## Main Pages

This site includes pages for:

- Home
- About
- Ministries
- Events
- Conference
- Sermons
- Testimonies
- Gallery
- Blog
- Contact
- Prayer Request
- Volunteer and Giving opportunities

## Notes

The app uses a route-driven architecture under `src/routes`, so adding new pages is done by creating new route files in that directory.

## License

This project is for the Peculiar Sisters Fellowship community and is intended for internal/public ministry use.

## Contact

For questions or collaboration around the site, reach out through the contact information provided within the website or project maintainers.
