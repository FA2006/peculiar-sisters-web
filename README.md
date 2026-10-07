# Peculiar Sisters Fellowship (PSF) Website

This is the official website for Peculiar Sisters Fellowship (PSF), a Christ-centered women’s fellowship committed to prayer, spiritual growth, mentorship, and purposeful living.

The site helps visitors learn about the ministry, discover upcoming events, read blog content, submit prayer requests, and connect with the PSF community.

## Overview

- Responsive fellowship and ministry website
- Modern landing page with ministry messaging and event highlights
- File-based routing with nested child routes for details pages
- Sanity-powered content for blog posts and events
- Built with React, Vite, TypeScript, Tailwind CSS, and TanStack Router
- Reusable shadcn-style UI components and layout system

## Live Demo

https://peculiar-sisters-web.vercel.app/

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Router / TanStack Start
- TanStack Query
- Tailwind CSS
- Sanity CMS
- Resend email delivery
- Lucide React icons
- shadcn-style component primitives

## Project Structure

```text
.
├── public/                     # Static files, manifest, favicons
├── src/
│   ├── assets/                # Images and media assets
│   ├── components/            # Shared UI and layout components
│   ├── config/               # Site config and shared values
│   ├── emails/               # Email templates for form notifications
│   ├── hooks/                # Reusable React hooks
│   ├── lib/                  # App utilities, Sanity client, email logic
│   ├── routes/               # File-based route tree
│   │   ├── __root.tsx        # App shell with <Outlet />
│   │   ├── blog.tsx          # Blog parent route (outlet)
│   │   ├── blog.index.tsx   # /blog list page
│   │   ├── blog.$slug.tsx   # /blog/:slug detail page
│   │   ├── events.index.tsx # /events list page
│   │   ├── events.$eventId.tsx # /events/:eventId detail page
│   │   └── ...               # Other site pages
│   ├── router.tsx            # TanStack Router setup
│   ├── server.ts             # Server setup
│   ├── start.ts              # App bootstrap
│   ├── styles.css            # Global styling and theme
│   └── routeTree.gen.ts      # Generated route tree
├── psf-peculiar-sisters-web/ # Sanity Studio project
│   ├── schemaTypes/          # Sanity schemas for blog, event, speaker
│   ├── sanity.config.ts      # Sanity config
│   └── ...
├── package.json
├── tsconfig.json
├── vite.config.ts
├── bunfig.toml
├── components.json
├── eslint.config.js
├── prettierignore
├── prettierc
├── README.md
└── AGENTS.md
```

## Routing Pattern

The app uses TanStack Router with nested route structure.

Examples:

- `/events` → event listing page
- `/events/:eventId` → event detail page
- `/blog` → blog index page
- `/blog/:slug` → blog post detail page

The parent route files act as layout containers using `<Outlet />`, so child detail pages mount inside the app shell while preserving shared layout and navigation.

## Content Management

The site uses Sanity as its content backend.

Key content models include:

- `blog`
- `event`
- `speaker`

Sanity queries live in route loaders and fetch data for list/detail pages. Media is handled via the Sanity image URL helper.

## Available Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run format
```

### Script Summary

- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint checks
- `npm run format` — format the codebase with Prettier

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
http://localhost:8080
```

If the default port is busy, Vite will choose another available port.

## Environment and Email Setup

Forms submit to the TanStack Start server route `POST /api/send-email`. The server sends an admin notification and a confirmation email through Resend. Supported submissions include event registration, contact, prayer request, volunteer application, testimony, and newsletter.

Create an ignored `.env.local` file in the project root for local development:

```dotenv
RESEND_API_KEY=re_your_resend_api_key
ADMIN_EMAIL=admin@example.com
RESEND_FROM_EMAIL="Peculiar Sisters Fellowship <notifications@your-verified-domain.com>"
```

Important notes:

- Keep these variables server-only and do not prefix them with `VITE_`
- Do not commit `.env.local`
- Use the same values in your hosting provider environment settings
- Set `RESEND_FROM_EMAIL` to a verified sender domain in Resend

## Main Pages

This site includes pages for:

- Home
- About
- Ministries
- Events
- Sermons
- Testimonies
- Gallery
- Blog
- Contact
- Prayer Request
- Volunteer
- Giving

## Notes

The app uses a route-driven architecture under `src/routes`, so new pages and nested detail views are added by creating proper route files in that directory.

## License

This project is for the Peculiar Sisters Fellowship community and is intended for ministry, outreach, and public communication use.

## Contact

For questions or collaboration around the site, reach out through the contact information provided on the website or contact the project maintainers directly.
