# TrendLens API

Express.js API with integrated scraper for GitHub and Dev.to trending content.

## Structure for Vercel Deployment

```
apps/api/
├── api/
│   └── index.ts          # Vercel serverless function entry (re-exports main app)
├── src/
│   ├── controllers/       # Request handlers
│   ├── routes/           # API routes
│   └── scraper/          # Integrated scraper
│       ├── browser/      # Chromium setup
│       ├── config/       # Scraper configs
│       ├── github/       # GitHub scraper
│       └── devto/        # Dev.to scraper
├── scripts/              # Helper scripts
├── index.ts              # Main Express app
├── vercel.json           # Vercel configuration
└── package.json
```

## Vercel Configuration

The `api/index.ts` file is the entry point for Vercel serverless functions. It imports and re-exports the main Express app from `index.ts`.

**Key Settings (vercel.json):**

- Memory: 1024MB (for Chromium)
- Max Duration: 60s (for scraping operations)
- All routes rewrite to `/api`

## Environment Variables (Set in Vercel)

```
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
```

## API Endpoints

- `GET /api/trending/github` - Get GitHub trending repositories
- `GET /api/trending/devto` - Get Dev.to trending articles
- `POST /api/trending/jobs/github-trending` - Manually trigger GitHub scraping
- `POST /api/trending/jobs/devto-trending` - Manually trigger Dev.to scraping

## Local Development

```bash
pnpm dev
```

Runs on http://localhost:3001

## Build

```bash
pnpm run build
```

Compiles TypeScript to `dist/` folder.
