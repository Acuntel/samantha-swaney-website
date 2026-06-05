# Samantha Swaney Real Estate Website

A custom Next.js site for **Samantha Swaney**, Real Estate Broker serving Elmhurst and the near-west Chicago suburbs. Built by Brady for delivery to Samantha.

## What's inside

- **Next.js 14 + TypeScript + Tailwind** — fast, SEO-friendly, easy to maintain.
- **Multilingual AI chatbot** (Anthropic Claude) — auto-detects language; explicit EN / ES / PL picker. Every conversation is summarized in English and emailed to Samantha.
- **Autonomous property management** — Samantha logs into `/admin` and adds / edits / removes listings with photo uploads. No code, no Brady-required.
- **Supabase** stores listings + photos. **Resend** sends lead emails. **Vercel** hosts.

## Local setup

```bash
npm install
cp ENV_SETUP.md → create .env.local from the block at the top
npm run dev
```

See `ENV_SETUP.md` for the full env var block and one-time setup steps for Supabase, Resend, and Anthropic.

## Architecture

```
app/
  page.tsx              Homepage (hero → stats → listings → neighborhoods → testimonials → FAQ → contact)
  listings/             Public listings (filterable) + detail
  about/                Samantha's bio + team + areas served
  contact/              Contact form (Resend → Samantha)
  admin/                Password-gated dashboard + property form
  api/
    chat/               Claude streaming endpoint
    chat/lead/          Resend transcript email (summarized to English)
    contact/            Contact form → Resend
    properties/         Public read-only listings JSON
    admin/login/        Password verify → httpOnly HMAC cookie
    admin/logout/
    admin/properties/   CRUD (auth-gated)
    admin/upload/       Photo upload → Supabase Storage
components/
  Hero / Stats / FeaturedListings / Neighborhoods / Testimonials / FAQ / ContactSection
  PropertyCard / Nav / Footer / ChatWidget
  admin/PropertyForm
lib/
  samantha-data.ts          Single source of truth — bio, stats, FAQs, testimonials
  chatbot-system-prompt  Compiles Samantha's data into the chatbot system prompt
  chat-translations.ts   EN / ES / PL UI strings + language directive
  supabase.ts            Server clients + seed-fallback fetch
  auth.ts                Admin cookie HMAC + password check (timing-safe)
  rate-limit.ts          In-memory per-IP throttle
supabase-schema.sql      One-time DB schema
ENV_SETUP.md             Env var docs + one-time setup checklist
```

## Deploy

GitHub repo is wired up via `gh repo create`, deployed to Vercel with `vercel`. Env vars must be added in Vercel project settings before chat / admin work.

## Updating Samantha's data

Most copy lives in `lib/samantha-data.ts`. The chatbot reads from the same file via `lib/chatbot-system-prompt.ts`, so updating bio / stats / testimonials / FAQs there automatically updates the homepage AND the chatbot's knowledge.
