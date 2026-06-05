# Environment Variables

Copy the block below into a `.env.local` file at the project root and fill in real values. `.env.local` is gitignored — never commit secrets.

```bash
# --- Resend (contact-form lead emails) ---
RESEND_API_KEY=re_...
# Address Samantha receives leads at:
LEAD_TO_EMAIL=samanthas@gcrealtyinc.com
# Verified Resend sender (must be a domain verified in Resend):
LEAD_FROM_EMAIL=Samantha Swaney Website <noreply@samantha-swaney-site.vercel.app>

# --- Site ---
NEXT_PUBLIC_SITE_URL=https://samantha-swaney-site.vercel.app
```

## Notes

- **No database.** Listings live in `public/data/properties.json` and are edited from `/admin` (password `1111`, set in `app/admin/page.tsx`). There is no Supabase, no admin server password, and no service keys to manage.
- **No AI chatbot.** The site has no on-page assistant; leads come in through the contact form only.
- **Publishing listings:** in `/admin`, edit and click **Export to publish**. Drop the downloaded `properties.json` into `public/data/`, any new photos into `public/images/listings/`, and push to GitHub. Vercel rebuilds and every listing gets its own SEO-optimized page + sitemap entry automatically.
- Only `RESEND_*` is needed, for the contact-form lead emails. `NEXT_PUBLIC_SITE_URL` should be set so canonical URLs, the sitemap, and robots.txt point at the live domain.

## One-time setup checklist

1. **Resend** (~2 min): create an API key at resend.com/api-keys. To send from a custom address, verify the domain in Resend → Domains. Until then use `onboarding@resend.dev` as `LEAD_FROM_EMAIL`.
2. **Vercel**: paste the env vars above under Project → Settings → Environment Variables (set `NEXT_PUBLIC_SITE_URL` to the production domain).
