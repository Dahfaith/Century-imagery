# Deployment Checklist

## Environment & Secrets
- [ ] `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` configured in the host environment (e.g., Vercel).
- [ ] `SUPABASE_SERVICE_ROLE_KEY` added as a secure, server-only secret.
- [ ] `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_STREAM_API_TOKEN` added as secure secrets.
- [ ] `CLOUDFLARE_R2_ACCESS_KEY_ID`, `CLOUDFLARE_R2_SECRET_ACCESS_KEY`, and `CLOUDFLARE_R2_BUCKET_NAME` added securely.
- [ ] `CLOUDFLARE_R2_PUBLIC_DOMAIN` added for image delivery.
- [ ] Ensure **no** `.env` variables containing secrets are accidentally logged in terminal outputs or committed to version control.

## Database & Authentication
- [ ] Disable Supabase open registration (Email Providers settings) to prevent unauthorized users from creating accounts and receiving the default `editor` role.
- [ ] Manually promote the primary owner (Akin) to the `super_admin` role in the `profiles` table.
- [ ] Configure Supabase Authentication Redirect URLs to explicitly allow the production domain (e.g., `https://centuryimagery.com/admin/login`).

## DNS & Domain Verification
- [ ] Point A/CNAME records to the Vercel (or preferred host) IP/Domain.
- [ ] Ensure SSL/TLS certificates are active for HTTPS.
- [ ] Verify Cloudflare R2 custom domain CNAME record points to the bucket and the bucket allows public read access.

## External API & Performance
- [ ] Verify the host environment does not block egress traffic (e.g., fetching Next.js Google Fonts `Figtree`).
- [ ] Check Cloudflare Stream analytics to confirm videos are actively caching and delivering.
- [ ] Verify API Rate limiting or WAF rules on Cloudflare do not aggressively block normal form submissions (Bookings).

## Content Sign-Off
- [ ] Client to review all placeholder text, awards, view counts (e.g., 400K+), and claims in the "About" page.
- [ ] Final confirmation that all sample data is replaced with authentic portfolio assets.
