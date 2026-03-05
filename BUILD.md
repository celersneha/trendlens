# Build & Deployment Guide

## 🚀 Technology Stack

- **Frontend**: Next.js (Deployed on Vercel)
- **Backend**: Express.js (Deployed on Vercel)
- **Scraper**: Integrated in API - Puppeteer-core + @sparticuz/chromium-min

## 📦 Installation

```bash
pnpm install
```

## 🛠 Local Development

### Environment Variables

**apps/web/.env.local:**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**apps/api/.env:**

```env
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Start Development

```bash
# Terminal 1 - API
cd apps/api
pnpm dev

# Terminal 2 - Frontend
cd apps/web
pnpm dev
```

## 🚀 Deployment on Vercel

### Backend (API)

1. Create new Vercel project
2. Root Directory: `apps/api`
3. Framework: Other
4. Build Command: `pnpm run build`
5. Environment Variables:
   ```
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-frontend.vercel.app
   ```

### Frontend

1. Create new Vercel project
2. Root Directory: `apps/web`
3. Framework: Next.js
4. Build Command: `pnpm run build`
5. Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-api.vercel.app
   ```

## 📁 Project Structure

```
trendlens/
├── apps/
│   ├── api/                    # Express.js API (Deploy to Vercel)
│   │   ├── src/
│   │   │   ├── controllers/    # Request handlers
│   │   │   ├── routes/         # API routes
│   │   │   └── scraper/        # ⭐ Scraping logic (integrated)
│   │   │       ├── browser/    # Chromium setup
│   │   │       ├── config/     # Scraper configs
│   │   │       ├── github/     # GitHub scraper & fetchHtml
│   │   │       └── devto/      # Dev.to scraper & fetchDevToHtml
│   │   ├── scripts/            # ⭐ Helper scripts (moved from root)
│   │   │   ├── fetchHtml.ts
│   │   │   └── fetchDevToHtml.ts
│   │   ├── index.ts            # API entry point
│   │   ├── vercel.json         # Vercel configuration
│   │   └── package.json
│   └── web/                    # Next.js frontend (Deploy to Vercel)
│       ├── src/
│       │   ├── app/            # Next.js 13+ app directory
│       │   ├── components/     # React components
│       │   └── services/       # API client services
│       └── package.json
└── [Legacy folders can be deleted: packages/, scripts/]
```

## ⚠️ Key Points

- Scraper integrated in API (no separate package)
- Both apps deploy on Vercel
- Auto Chromium download in production
- Free tier: 10s timeout, Pro: 60s (recommended)

## 📋 Commands

```bash
# Development
pnpm --filter @repo/api dev
pnpm --filter @repo/web dev

# Build
pnpm --filter @repo/api run build
pnpm --filter @repo/web run build

# Helper scripts (for testing/debugging)
cd apps/api
pnpm run fetch-html          # Fetch GitHub HTML
pnpm run fetch-devto-html    # Fetch Dev.to HTML
```
