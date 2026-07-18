# Supabase Environment Setup

## Three Environments

### 1. Development (dev)
- **URL:** dev-borehub.supabase.co
- **Purpose:** Active development, testing new features
- **Branch:** `dev`
- **Data:** Mock/test data, reset weekly

### 2. Staging (beta)
- **URL:** beta-borehub.supabase.co
- **Purpose:** Pre-release testing, UAT
- **Branch:** `beta`
- **Data:** Sanitized production data copy

### 3. Production (prod)
- **URL:** borehub.supabase.co
- **Purpose:** Live application
- **Branch:** `main`
- **Data:** Real user data

## Setup Steps

### Step 1: Create Supabase Projects
1. Go to [supabase.com](https://supabase.com)
2. Create 3 projects:
   - `borehub-dev`
   - `borehub-beta`
   - `borehub-prod`

### Step 2: Run Migrations
For each project, run in SQL Editor:
```sql
-- Run contents of supabase/migrations/001_initial_schema.sql
```

### Step 3: Configure Auth
For each project:
1. Authentication → Providers → Enable Email
2. Disable email confirmation for dev/beta
3. Enable email confirmation for prod

### Step 4: Set Environment Variables in Vercel

**Dev Environment:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx-dev.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx-dev
```

**Beta Environment:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx-beta.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx-beta
```

**Production Environment:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx-prod.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx-prod
```

## Migration Workflow

When updating schema:
1. Create new migration in `supabase/migrations/`
2. Run on dev first
3. Test thoroughly
4. Run on beta
5. UAT testing
6. Run on prod

## Backup Schedule

| Environment | Backup | Retention |
|-------------|--------|-----------|
| Dev | Daily | 7 days |
| Beta | Daily | 14 days |
| Prod | Daily | 30 days |
