# Environment Variables

Copy the block below into a `.env.local` file at the project root and fill in real values. `.env.local` is gitignored — never commit secrets.

```bash
# --- Anthropic (chatbot) ---
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-5-20250929

# --- Resend (lead notification emails) ---
RESEND_API_KEY=re_...
# Address Samantha receives leads at:
LEAD_TO_EMAIL=samanthas@gcrealtyinc.com
# Verified Resend sender (must be a domain verified in Resend):
LEAD_FROM_EMAIL=Samantha Swaney Website <noreply@samantha-swaney-website.vercel.app>

# --- Site ---
NEXT_PUBLIC_SITE_URL=https://samantha-swaney-website.vercel.app
```

## Notes

- **No database.** Listings live in `public/data/properties.json` and are edited from `/admin` (password `1111`, set in `app/admin/page.tsx`). There is no Supabase, no admin server password, and no service keys to manage.
- **Publishing listings:** in `/admin`, edit and click **Export to publish**. Drop the downloaded `properties.json` into `public/data/`, any new photos into `public/images/listings/`, and push to GitHub. Vercel rebuilds and every listing gets its own SEO-optimized page + sitemap entry automatically.
- Only `ANTHROPIC_*` and `RESEND_*` are needed for the chatbot and contact-form emails. `NEXT_PUBLIC_SITE_URL` should be set so canonical URLs, the sitemap, and robots.txt point at the live domain.

## One-time setup checklist

1. **Anthropic key**: reuse Brady's existing key or create one at console.anthropic.com.
2. **Resend** (~2 min): create an API key at resend.com/api-keys. To send from `noreply@samantha-swaney-website.vercel.app`, verify the domain in Resend → Domains. Until then use `onboarding@resend.dev` as `LEAD_FROM_EMAIL`.
3. **Vercel**: paste the env vars above under Project → Settings → Environment Variables (set `NEXT_PUBLIC_SITE_URL` to the production domain).
