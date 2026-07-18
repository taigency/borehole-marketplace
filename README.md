# BoreHub - Borehole Marketplace

South Africa's online marketplace connecting borehole owners with drillers, spare parts suppliers, and service providers.

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend:** Next.js API Routes, Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Hosting:** Vercel
- **Database:** Supabase PostgreSQL

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

## Environment Setup

### Supabase
1. Create project at [supabase.com](https://supabase.com)
2. Copy Project URL and anon key to `.env.local`
3. Run `supabase/migrations/001_initial_schema.sql` in SQL Editor

### Vercel
1. Connect GitHub repo at [vercel.com](https://vercel.com)
2. Set environment variables for each environment

## Deployment

- **dev branch** → dev.borehub.co.za (auto-deploy)
- **beta branch** → beta.borehub.co.za (auto-deploy)
- **main branch** → borehub.co.za (auto-deploy on tag)

## Version Control

- `main` - Production releases (tagged v1.x.x)
- `beta` - Pre-release testing
- `dev` - Active development
- `feature/*` - Feature branches

## License

Proprietary - BoreHub Pty Ltd
