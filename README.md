# Independent Talent Search

One-page signup site (Next.js + Tailwind + Supabase) with a private admin dashboard.

## Setup

1. **Supabase**: create a project → SQL Editor → paste and run `supabase/schema.sql`.
2. **Environment variables** (Vercel → Project → Settings → Environment Variables, or `.env.local` for local dev):

| Name | Where to find it |
| --- | --- |
| `SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → `service_role` key (keep secret) |
| `ADMIN_PASSWORD` | Any long random string you choose |

3. **Deploy**: Vercel → Add New → Project → import this GitHub repo → add the env vars → Deploy. Framework preset: Next.js (auto-detected).

## Routes

- `/` — signup page
- `/admin` — password-protected dashboard (view registrations, export opted-in contacts to CSV)
- `/privacy`, `/terms` — legal pages (replace `[your contact email]` placeholders)

## Local dev

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```
