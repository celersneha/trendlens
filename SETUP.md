# Quick Start Guide

## 1. First-time setup

### Create .env files

**packages/database/.env:**

```
DATABASE_URL="your_supabase_or_postgresql_url"
```

**apps/web/.env.local:**

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Generate Prisma Client & Push Schema

```bash
cd packages/database
pnpm prisma generate
pnpm prisma db push
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

### Trigger scraping job:

```bash
curl -X POST http://localhost:3001/api/trending/jobs/github-trending
```

### Get trending repos:

```bash
curl http://localhost:3001/api/trending/github
```

## 4. Access the dashboard

Open browser: http://localhost:3000

The dashboard will automatically trigger scraping if the database is empty on first load.

## File Structure Summary

```
📦 Backend Architecture (apps/api)
├── index.ts                          # Express app entry
├── src/
│   ├── controllers/
│   │   └── trending.controller.ts    # Request handlers
│   ├── services/
│   │   └── trending.service.ts       # Database operations
│   ├── jobs/
│   │   └── githubTrending.job.ts     # Scraping job logic
│   └── routes/
│       └── trending.routes.ts        # API routes

📦 Database (packages/db)
├── prisma/
│   └── schema.prisma                 # Database schema
└── client.ts                         # Prisma singleton

📦 Frontend (apps/web)
├── src/
│   ├── app/
│   │   └── page.tsx                  # Dashboard page
│   ├── components/
│   │   └── RepositoryCard.tsx        # Repo card UI
│   └── services/
│       └── trending.service.ts       # API client
```

## Architecture Flow

```
┌─────────────────────────────────────────────────┐
│  User visits http://localhost:3000             │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  Next.js Dashboard (apps/web/page.tsx)         │
│  → Calls trending.service.ts                   │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  GET /api/trending/github                      │
│  → trending.controller.ts                      │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  Check database via getGithubRepos()           │
│  → trending.service.ts                         │
└───────────────┬─────────────────────────────────┘
                │
        ┌───────┴───────┐
        │ Empty?        │
        └───┬───────┬───┘
            │       │
      Yes   │       │ No
            │       │
            ▼       ▼
    ┌───────────────────┐      ┌──────────────┐
    │ runGithubTrending │      │ Return repos │
    │ Job()             │      └──────────────┘
    └────────┬──────────┘
             │
             ▼
    ┌──────────────────────┐
    │ scrapeGithubTrending │
    │ (Puppeteer)          │
    └────────┬─────────────┘
             │
             ▼
    ┌──────────────────────┐
    │ saveGithubRepos()    │
    │ (Prisma upsert)      │
    └────────┬─────────────┘
             │
             ▼
    ┌──────────────────────┐
    │ PostgreSQL Database  │
    └──────────────────────┘
```

## Troubleshooting

### Port conflicts

- API uses port 3001
- Frontend uses port 3000
- Change ports in .env if needed

### Prisma errors

```bash
cd packages/database
pnpm prisma generate
```

### Database connection issues

- Verify DATABASE_URL in packages/database/.env
- Test connection: `pnpm prisma studio`

### Scraper fails

- Ensure Chrome is installed for Puppeteer
- Check network connectivity to github.com
