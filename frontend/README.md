# Recipe Explorer (Remix + Tailwind)

A modern, accessible recipe browsing app built with Remix and Tailwind, themed with "Ocean Professional".

## Features

- Home, Recipes list, and Recipe detail routes
- URL‑driven search, filters, sort, and pagination
- Accessible UI (keyboard and screen readers)
- Ocean Professional theme (blue & amber accents)
- Local mock data fallback with optional remote API

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open the app at the printed URL (default http://localhost:3000).

## Data Modes

The app supports two data modes:

1. Local mock data (default)
   - No configuration required.
   - Data is served from `public/recipes.json`.

2. Remote API
   - Provide an environment variable `VITE_API_BASE` that points to your API base URL.
   - The app will try `GET {VITE_API_BASE}/recipes` and `GET {VITE_API_BASE}/recipes/:id`.
   - If the remote request fails, the app gracefully falls back to local mock data.

Example `.env`:

```
VITE_API_BASE=https://api.example.com
```

Note: Do not commit secrets. The orchestrator will set environment variables for you in CI/deployment.

## Routes

- `/` — Home
- `/recipes` — List with search, filters, sort, pagination via URL params (`q, category, minRating, maxTime, sort, page, pageSize, tag`)
- `/recipes/:id` — Recipe detail

## Accessibility

- Focus-visible styles
- Proper aria roles/labels
- Keyboard accessible modals and controls
- Live regions for loading updates

## Styling

Tailwind is pre-configured. Ocean Professional theme colors are applied via utility classes and small design tokens in `app/lib/theme.ts`.

## License

MIT
