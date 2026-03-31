# V1 - Lead Scoring Tool

> Automatically qualify and prioritize leads from multiple marketing channels to focus sales efforts on high-value prospects.

## What This Does

V1 is a lead scoring system that connects to Facebook, Instagram, Google Ads, email, and other marketing channels to automatically qualify incoming prospects. It scores lead quality based on geographic location, contact information validity, and the type of request they're making — helping sales teams prioritize high-value prospects over tire kickers.

Built for growing companies drowning in leads but lacking systematic qualification processes.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Integrations**: Meta Ads, Google Ads, HubSpot, Gmail, Zapier, Google Sheets
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+
- Supabase CLI
- Git
- Vercel CLI (for deployment)

## Local Development Setup

1. **Clone the repository**
   bash
   git clone <repository-url>
   cd lead-scoring-tool
   

2. **Install dependencies**
   bash
   npm install
   

3. **Set up environment variables**
   Copy `.env.example` to `.env.local` and fill in your values:
   bash
   cp .env.example .env.local
   

4. **Start Supabase**
   bash
   supabase start
   

5. **Run the development server**
   bash
   npm run dev
   

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) | Yes |
| `META_APP_ID` | Meta/Facebook App ID | Yes |
| `META_APP_SECRET` | Meta/Facebook App Secret | Yes |
| `GOOGLE_ADS_CLIENT_ID` | Google Ads API client ID | Yes |
| `GOOGLE_ADS_CLIENT_SECRET` | Google Ads API client secret | Yes |
| `HUBSPOT_API_KEY` | HubSpot private app access token | Yes |
| `GMAIL_CLIENT_ID` | Gmail API client ID | Yes |
| `GMAIL_CLIENT_SECRET` | Gmail API client secret | Yes |
| `ZAPIER_WEBHOOK_SECRET` | Secret for Zapier webhook validation | Yes |
| `EMAIL_VALIDATION_API_KEY` | Email validation service API key | No |
| `SMS_API_KEY` | SMS service API key for phone validation | No |

## Database Setup

The database schema is automatically applied when you run `supabase start`. The schema includes:

- **Core tables**: users, organizations, leads, lead_scores
- **Configuration**: integration_configs, scoring_rules, geographic_territories
- **Validation**: email_validations, phone_verifications, lead_categorizations
- **Reporting**: sync_logs, reports

### Running Migrations

bash
supabase db push


### Resetting Database

bash
supabase db reset


## Deploy to Vercel

1. **Connect to Vercel**
   bash
   vercel
   

2. **Set environment variables**
   Add all required environment variables in the Vercel dashboard or via CLI:
   bash
   vercel env add
   

3. **Deploy**
   bash
   vercel --prod
   

## Project Structure


├── app/                 # Next.js app directory
│   ├── (auth)/         # Auth-related pages
│   ├── (dashboard)/    # Protected dashboard pages
│   ├── api/            # API routes
│   └── globals.css     # Global styles
├── components/         # Reusable UI components
├── lib/               # Business logic and utilities
├── db/                # Database queries and utilities
├── actions/           # Server actions
├── types/             # TypeScript type definitions
├── supabase/          # Supabase configuration and migrations
└── docs/              # Project documentation


## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `supabase start` - Start local Supabase stack
- `supabase stop` - Stop local Supabase stack

## Contributing

1. Read `CLAUDE.md` for AI coding guidelines
2. Check `TECHNICAL_DEBT.md` for known issues
3. Follow conventional commit messages
4. Run `npm run build` before committing

## Documentation

- [CLAUDE.md](./CLAUDE.md) - AI assistant briefing
- [CHANGELOG.md](./CHANGELOG.md) - Version history
- [ROADMAP.md](./ROADMAP.md) - Feature roadmap
- [TECHNICAL_DEBT.md](./TECHNICAL_DEBT.md) - Known technical debt