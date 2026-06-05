# Samantha Swaney Real Estate Website

A custom Next.js site for **Samantha Swaney**, Real Estate Broker with GC Realty & Development serving Elmhurst and the near-west Cook County suburbs. Built by Brady for delivery to Samantha.

## What's inside

- **Next.js 14 + TypeScript + Tailwind** — fast, SEO-friendly, easy to maintain. Cool-red / oxblood palette.
- **Self-serve listings + blog** — Samantha logs into `/admin` (password `1111`) and edits listings and blog posts in the browser, then clicks **Export to publish**. No database, no code.
- **JSON-in-repo content** — listings live in `public/data/properties.json`, blog posts in `public/data/blog.json`, both committed to the repo and read at build time.
- **Contact form → Resend** emails leads straight to Samantha. No AI chatbot.
- **Full SEO / AI layer** — per-page metadata, schema.org JSON-LD, dynamic sitemap, AI-crawler-friendly `robots.txt`, and `llms.txt` / `llms-full.txt`.

## Local setup

```bash
npm install
# create .env.local from the block in ENV_SETUP.md
npm run dev
```

See `ENV_SETUP.md` for the env var block (Resend + site URL) and one-time setup.

## Architecture

```
app/
  page.tsx              Homepage (hero → stats → neighborhoods → listings → blog → testimonials → FAQ → contact)
  listings/             Public listings (filterable) + per-listing detail pages
  blog/                 Blog index + per-post pages (Markdown)
  neighborhoods/[slug]/ Local-SEO town landing pages
  about/                Samantha's bio + GC Realty advantage + areas served
  contact/              Contact form (Resend → Samantha)
  admin/                Password-gated (1111) tabbed editor: Listings | Blog
  api/contact/          Contact form → Resend
  sitemap.ts robots.ts icon.tsx
components/
  Hero / Stats / FeaturedListings / Neighborhoods / Testimonials / BlogPreview / FAQ / ContactSection
  PropertyCard / BlogCard / Nav / Footer / PageLoader
  admin/AdminTabs / PropertyEditor / PropertyRow / BlogEditor / BlogRow
lib/
  samantha-data.ts      Single source of truth — bio, stats, FAQs, neighborhoods, SEO facts
  properties.ts blog.ts Read helpers for the JSON content
  seo.tsx               Canonical URLs + schema.org JSON-LD generators
  markdown.tsx          Dependency-free Markdown renderer for blog bodies
  download.ts date.ts rate-limit.ts
public/
  data/properties.json  Listings (managed via /admin)
  data/blog.json        Blog posts (managed via /admin)
  images/               Headshot, neighborhood photos, listing photos
  llms.txt llms-full.txt
ENV_SETUP.md            Env var docs + one-time setup checklist
```

## Deploy

GitHub repo is `Acuntel/samantha-swaney-website`. **Deploys are manual** (the repo is not Vercel-auto-connected): from the project directory run `npx vercel --prod --yes`. Set env vars in the Vercel project settings.

## Updating Samantha's data

Most copy lives in `lib/samantha-data.ts` (bio, stats, FAQs, neighborhoods). Listings and blog posts are managed from `/admin`. Everything is static and rebuilt on deploy.
