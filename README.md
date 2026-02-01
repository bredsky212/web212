# Gen-Z 212

Next.js site with a Strapi CMS backend (v5) for editorial content.

## Local Development (Token-Only)

1) Web app env

   - Copy `.env.example` to `.env.local` and fill in required values.
   - For Strapi mode, set:
     - `STRAPI_DEBUG=1` (optional; logs Strapi requests)
     - `CMS_ENABLED=true`
     - `STRAPI_URL=http://localhost:1337`
     - `STRAPI_PUBLIC_URL=` (optional; set in prod for public media URLs)
     - `STRAPI_API_TOKEN=...` (read-only token)
   - If you keep `CMS_ENABLED=false`, you must also set legacy Mongo values.

2) Strapi env

   - Copy `cms/.env.example` to `cms/.env` and fill in secrets.
   - Set `APP_KEYS` as a comma-separated list (4 values is typical).
   - Set `CORS_ORIGINS=http://localhost:3000` for local dev.

3) Start Postgres + Strapi (Docker)

   - `docker compose up -d`

   This starts Postgres and runs Strapi in development mode.

4) (Alternative) Run Strapi locally

   - `cd cms`
   - `npm install`
   - `npm run develop`

5) Run the Next.js app

   - `npm install`
   - `npm run dev`

6) Strapi setup (token-only)

   - Create the Strapi admin user.
   - Create a **read-only API Token** and set it in `.env.local` as `STRAPI_API_TOKEN`.
   - In Settings → Roles & Permissions → Public, **remove all permissions** for blog types.
   - Create BlogCategory and BlogPost entries and **publish** them.

7) Visit `/blog`

   - With `CMS_ENABLED=true`, the blog renders from Strapi using the server-side token.


## Blog i18n (ar/fr/en)

- Default locale is **Arabic (ar)**.
- Locale cookie: `site_locale` (ar | fr | en).
- Non-prefixed routes (`/blog`) read the cookie.
- Prefixed routes (`/ar/blog`, `/fr/blog`, `/en/blog`) **force** locale and update the cookie.
- The header language switcher navigates to prefixed routes.
- Prefixed blog routes are rewritten to `/blog` in middleware so they always resolve, while keeping the URL.

### Blog locale troubleshooting

- Set `STRAPI_DEBUG=1` to verify the exact Strapi URL (including `locale=`) the server is calling.
- Ensure every locale has a **slug**; missing slugs can cause Strapi to return the first post in the locale.
- If a translation doesn’t exist, the app will redirect to the default locale (`/ar/...`) or show not found.


## Strapi locale smoke test

Run on the server to verify Strapi i18n responses:

- `node scripts/strapi-locale-smoke.mjs`

Expected output includes locale + title for `ar`, `fr`, `en`.


## Strapi as code (localization)

Note: Strapi v5 ships i18n in core; there is no separate @strapi/plugin-i18n package in npm.

- Blog localization is defined in schema files under `cms/src/api/**/schema.json`.
- Do not toggle localization in the admin without committing schema changes, or it will drift on rebuild.
- Use `scripts/check-strapi-i18n.sh` to verify localization is still enabled in git.

## Production Notes

- Use HTTPS for both Strapi and the website.
- Set `NEXTAUTH_SECRET` (and ideally `NEXTAUTH_URL`) in production to avoid auth runtime errors.
- Keep `STRAPI_API_TOKEN` on the server only; never expose it via `NEXT_PUBLIC_*`.
- Lock down Strapi Public permissions (no blog access).
- Configure `CORS_ORIGINS` to your web domain(s).
- Set `STRAPI_PUBLIC_URL` to a **public** Strapi host so Next/Image does not try to fetch from private IPs (e.g., 127.0.0.1).
- If possible, restrict Strapi API access to your web server IPs.
- Do not expose the Strapi admin panel publicly without protection.
