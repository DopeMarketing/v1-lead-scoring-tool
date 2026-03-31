# CLAUDE.md - AI Assistant Briefing

> Read this file first before working on any code. This is your complete context for the V1 Lead Scoring Tool project.

## Project Overview

V1 is a lead scoring system that automatically qualifies prospects from multiple marketing channels (Meta Ads, Google Ads, email) based on geographic location, contact validation, and request categorization. The goal is helping sales teams prioritize high-value leads over tire kickers.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Integrations**: Meta Ads, Google Ads, HubSpot, Gmail, Zapier, Google Sheets
- **Deployment**: Vercel

## Folder Structure


app/
├── (auth)/              # Public auth pages (/login, /signup)
├── (dashboard)/         # Protected pages (/dashboard, /leads, etc.)
├── api/                 # API routes for webhooks and integrations
└── globals.css          # Global Tailwind styles

components/
├── ui/                  # Shadcn/ui components
├── forms/               # Form components
├── layouts/             # Layout components
└── charts/              # Chart/visualization components

lib/
├── auth.ts              # Auth utilities
├── validations.ts       # Zod schemas
├── scoring.ts           # Lead scoring logic
├── integrations/        # Integration utilities
└── utils.ts             # General utilities

db/
├── queries/             # Database query functions
├── schema.sql           # Database schema
└── seed.sql             # Seed data

actions/
├── auth.ts              # Auth server actions
├── leads.ts             # Lead management actions
├── scoring.ts           # Scoring configuration actions
└── integrations.ts      # Integration setup actions

types/
├── database.ts          # Supabase generated types
├── integrations.ts      # Integration types
└── index.ts             # General types

supabase/
├── migrations/          # Database migrations
└── config.toml          # Supabase configuration


## Coding Conventions

### TypeScript
- Use strict mode (`"strict": true`)
- Define all types explicitly
- Use Zod for runtime validation
- Generate Supabase types: `npx supabase gen types typescript --local`

### Next.js Patterns
- Server Components by default
- Use Client Components only when necessary (`'use client'`)
- Data fetching in Server Components or Server Actions
- No API routes unless required for webhooks/integrations

### Data Access Rules
- Database queries ONLY in `/db/queries/`
- Business logic ONLY in `/lib/` and `/actions/`
- No database secrets in client components
- Always use Row Level Security (RLS)

### Component Organization
- One component per file
- Use TypeScript interfaces for props
- Prefer composition over inheritance
- Use Tailwind for styling

## Current State (Scaffold)

The following has been generated:

✅ **Database Schema**: 13 tables with proper relationships and RLS policies
✅ **Route Structure**: 18 pages from public marketing to protected dashboard
✅ **Auth System**: Supabase Auth with role-based access (Owner, Analyst, Viewer)
✅ **Integration Stubs**: Placeholder files for 6 integrations
✅ **UI Foundation**: Tailwind + Shadcn/ui setup
✅ **Type System**: Database types and core interfaces

## V1 Features to Build Next

### 1. Meta Ads Lead Capture Integration
- Set up Facebook/Instagram Lead Ads webhook
- Automatic lead data sync to database
- Real-time lead processing pipeline

### 2. Geographic Location Scoring System
- Customizable territory weighting rules
- Distance-based scoring algorithms
- Minnesota-based default configuration

### 3. Lead Request Categorization Engine
- Keyword-based qualification scoring
- Intent level detection (service request vs. price shopping)
- Customizable categorization rules

## Never Touch Without Permission

🚫 **Environment files** (`.env*`) - Contains secrets
🚫 **Migration files** - Database integrity critical
🚫 **RLS policies** - Security critical, needs review
🚫 **Package.json dependencies** - May break integrations

## How to Work on This Project

### Before Starting Any Task
1. **Read this file completely**
2. **Check TECHNICAL_DEBT.md** for context
3. **Review relevant /db/queries** for data patterns
4. **Test locally** before committing

### Development Workflow
1. **Pull latest**: `git pull origin main`
2. **Start services**: `supabase start && npm run dev`
3. **Build frequently**: `npm run build` (catches errors early)
4. **Commit small**: Use conventional commits
5. **Document debt**: Update TECHNICAL_DEBT.md if taking shortcuts

### Code Quality Checks
bash
npm run build        # TypeScript compilation
npm run lint         # ESLint checks
npm run type-check   # Standalone TypeScript check


### Commit Message Format

feat: add lead categorization engine
fix: resolve Meta Ads webhook validation
chore: update dependencies
docs: add scoring algorithm documentation


### When Adding New Features
1. **Types first**: Define in `/types/`
2. **Database queries**: Add to `/db/queries/`
3. **Business logic**: Implement in `/lib/`
4. **Server actions**: Create in `/actions/`
5. **UI components**: Build in `/components/`
6. **Pages**: Assemble in `/app/`

### Integration Development
- All API keys in environment variables
- Use webhook validation for security
- Implement retry logic for external calls
- Log all integration events for debugging
- Test with sandbox/development endpoints first

### Database Changes
- Create migration: `supabase migration new feature_name`
- Test migration: `supabase db reset`
- Never edit existing migrations
- Always include RLS policies for new tables

## Key Business Logic

### Lead Scoring Formula
typescript
total_score = 
  (geographic_score * 0.3) + 
  (contact_validity_score * 0.2) + 
  (request_category_score * 0.5)


### Priority Levels
- **Hot** (80-100): High-intent, local, verified
- **Warm** (60-79): Good intent or location
- **Cold** (40-59): Some qualifying factors
- **Ignore** (<40): Likely junk/unqualified

### Geographic Scoring
- Local (Minnesota): 100 points
- Regional (Midwest): 75 points
- National: 50 points
- International: 25 points

Remember: This tool is solving a real business pain point. Every feature should directly help sales teams identify and prioritize high-value leads. Focus on automation and reliability over complexity.