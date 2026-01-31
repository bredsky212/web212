# Gen-Z 212

Next.js site with a Strapi CMS backend (v5) for editorial content.

## Local Development (Token-Only)

1) Web app env

   - Copy `.env.example` to `.env.local` and fill in required values.
   - For Strapi mode, set:
     - `CMS_ENABLED=true`
     - `STRAPI_URL=http://localhost:1337`
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

## Production Notes

- Use HTTPS for both Strapi and the website.
- Keep `STRAPI_API_TOKEN` on the server only; never expose it via `NEXT_PUBLIC_*`.
- Lock down Strapi Public permissions (no blog access).
- Configure `CORS_ORIGINS` to your web domain(s).
- If possible, restrict Strapi API access to your web server IPs.
- Do not expose the Strapi admin panel publicly without protection.