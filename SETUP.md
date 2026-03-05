# Quick Start Guide

## 1. First-time setup

### Create .env files

**apps/web/.env.local:**

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**apps/api/.env:**

```
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

## 2. Start the application

**Terminal 1 - API (port 3001):**

```bash
cd apps/api
pnpm dev
```

**Terminal 2 - Frontend (port 3000):**

```bash
cd apps/web
pnpm dev
```

## 3. Test the endpoints

### Get GitHub trending:

```bash
curl http://localhost:3001/api/trending/github
```

### Get Dev.to trending:

```bash
curl http://localhost:3001/api/trending/devto
```

### Get trending repos:

```bash
curl http://localhost:3001/api/trending/github
```

## 4. Access the dashboard

Open browser: http://localhost:3000

The dashboard will fetch trending data from the API on load.

## File Structure Summary

```
📦 Backend Architecture (apps/api)
├── index.ts                          # Express app entry
├── scripts/                          # Helper scripts
│   ├── fetchHtml.ts                  # Fetch GitHub HTML
│   └── fetchDevToHtml.ts             # Fetch Dev.to HTML
├── src/
│   ├── controllers/
│   │   └── trending.controller.ts    # Request handlers
│   ├── routes/
│   │   └── trending.routes.ts        # API routes
│   └── scraper/                      # Scraping logic (integrated)
│       ├── browser/
│       │   └── chromium.ts           # Browser setup
│       ├── config/
│       │   ├── githubTrending.config.ts
│       │   └── devto.config.ts
│       ├── github/
│       │   ├── scrapeGithubTrending.ts
│       │   ├── parseTrending.ts
│       │   └── fetchHtml.ts
│       ├── devto/
│       │   ├── scrapeDevToTrending.ts
│       │   ├── parseTrending.ts
│       │   └── fetchDevToHtml.ts
│       └── index.ts
└── vercel.json                       # Vercel deployment config

📦 Frontend (apps/web)
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Dashboard page
│   │   └── layout.tsx                # Root layout
│   ├── components/
│   │   ├── Github/
│   │   │   ├── GithubTrending.tsx
│   │   │   └── RepositoryCard.tsx
│   │   └── DevTo/
│   │       ├── DevToTrending.tsx
│   │       └── DevToArticleCard.tsx
│   ├── services/
│   │   └── trending.service.ts       # API client
│   └── types/
│       └── repository.ts             # TypeScript types
```

## Architecture Flow

```
┌─────────────────────────────────────────────────┐
│  User visits http://localhost:3000             │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  React Component (Client-Side)                 │
│  → GithubTrending / DevToTrending              │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  API Request via trending.service.ts           │
│  → fetch(NEXT_PUBLIC_API_URL/api/trending)    │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  GET /api/trending/github or /devto            │
│  → apps/api/src/controllers/                   │
│     trending.controller.ts                     │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  scrapeGithubTrending() or                     │
│  scrapeDevToTrending()                         │
│  → apps/api/src/scraper/                       │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  1. Launch Browser (launchBrowser)             │
│  2. Navigate to website                        │
│  3. Parse HTML (parseTrending)                 │
│  4. Return JSON data                           │
└─────────────────────────────────────────────────┘
```

## Helper Scripts

```bash
# Fetch raw HTML for debugging/offline parsing
cd apps/api
pnpm run fetch-html          # GitHub trending HTML
pnpm run fetch-devto-html    # Dev.to trending HTML
```

## Troubleshooting

### Port conflicts

- API uses port 3001
- Frontend uses port 3000
- Change ports in .env if needed

### Chrome/Chromium not found (Local development)

- Install Google Chrome on your system
- Or update the path in `apps/api/src/scraper/browser/chromium.ts`

### Scraper fails

- Ensure Chrome is installed locally (for development)
- Check network connectivity to github.com
- For production deployment, see BUILD.md

## Build & Deployment

For production builds and deployment instructions, see [BUILD.md](./BUILD.md).

**Quick Commands:**

- Local development: `pnpm dev` in apps/api and apps/web folders
- Production build: `pnpm --filter @repo/api run build && pnpm --filter @repo/web run build`

The project uses **puppeteer-core** with **@sparticuz/chromium-min** for lightweight Chromium support (<50MB).

**Project Structure:**

- ✅ `apps/api` - Backend API with integrated scraper and scripts
- ✅ `apps/web` - Frontend Next.js app
- ❌ `packages/` - Legacy folder (can be deleted)
- ❌ Root `scripts/` - Legacy folder (moved to apps/api/scripts)
