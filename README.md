# TrendLens - GitHub Trending Scraper

A TypeScript monorepo project for scraping and displaying GitHub trending repositories.

## Architecture

```
trendlens/
├── apps/
│   ├── api/          # Express.js backend
│   └── web/          # Next.js frontend
└── packages/
    ├── db/           # Prisma ORM & database client
    └── scraper/      # Puppeteer scraping logic
```

## Tech Stack

- **Frontend**: Next.js 14 + React + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (Supabase) + Prisma ORM
- **Scraper**: Puppeteer
- **Package Manager**: pnpm workspaces

## Setup Instructions

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

**Database (`packages/database/.env`):**

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/trendlens?schema=public"
```

**Web (`apps/web/.env.local`):**

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Set up database

```bash
cd packages/database
pnpm prisma generate
pnpm prisma db push
```

### 4. Run the development servers

**Terminal 1 - API Server:**

```bash
cd apps/api
pnpm dev
```

**Terminal 2 - Next.js Frontend:**

```bash
cd apps/web
pnpm dev
```

## API Endpoints

### `GET /api/trending/github`

Fetches GitHub trending repositories. If database is empty, automatically triggers scraping.

**Response:**

```json
{
  "success": true,
  "count": 25,
  "data": [...]
}
```

### `POST /api/trending/jobs/github-trending`

Manually triggers the GitHub scraping job.

**Response:**

```json
{
  "success": true,
  "scraped": 25,
  "saved": 25,
  "failed": 0
}
```

## Data Flow

```
User visits dashboard
    ↓
Next.js fetches /api/trending/github
    ↓
API checks database
    ↓
If empty → runGithubTrendingJob()
    ↓
scrapeGithubTrending() (Puppeteer)
    ↓
saveGithubRepos() (Prisma)
    ↓
Returns repositories as JSON
    ↓
Dashboard displays cards
```

## Project Structure

### Backend (`apps/api`)

- **`index.ts`** - Express app setup
- **`controllers/`** - Request handlers
- **`services/`** - Business logic
- **`jobs/`** - Background jobs (scraping)
- **`routes/`** - API route definitions

### Database (`packages/db`)

- **`prisma/schema.prisma`** - Database schema
- **`client.ts`** - Prisma singleton client

### Scraper (`packages/scraper`)

- **`github/scrapeGithubTrending.ts`** - Main scraper
- **`github/parseTrending.ts`** - HTML parser
- **`config/githubTrending.config.ts`** - CSS selectors

### Frontend (`apps/web`)

- **`app/page.tsx`** - Dashboard page
- **`components/RepositoryCard.tsx`** - Repository card UI
- **`services/trending.service.ts`** - API client

## Development

### Run Prisma Studio

```bash
cd packages/database
pnpm prisma studio
```

### Generate Prisma Client

```bash
cd packages/database
pnpm prisma generate
```

### Run scraping job manually

```bash
curl -X POST http://localhost:3001/api/trending/jobs/github-trending
```

## License

ISC
