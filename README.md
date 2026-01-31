# Gen-Z 212

Next.js site with a Strapi CMS backend (v5) for editorial content.

## Local Development

1) Web app env

   - Copy `.env.example` to `.env.local` and fill in required values.

2) Strapi env

   - Copy `cms/.env.example` to `cms/.env` and fill in secrets.
   - Set `APP_KEYS` as a comma-separated list (4 values is typical).

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

6) Strapi setup

   - Create the Strapi admin user.
   - Create BlogCategory and BlogPost entries.
   - Optional: create an API Token and set `STRAPI_API_TOKEN` in `.env.local`.

7) Visit `/blog`

   - Set `CMS_ENABLED=true` in `.env.local` to render the blog from Strapi.
   - Keep `CMS_ENABLED=false` to use the legacy API.

## Strapi Access Strategy

- Dev: you may enable public GET permissions for Blog endpoints.
- Prod: lock down public permissions and use an API Token (`STRAPI_API_TOKEN`) for reads.

## Production Notes

- Put Strapi behind HTTPS.
- Lock down CORS to only allow your web domain.
- Do not expose the Strapi admin panel publicly without protection.
- Prefer token-based read access for the public site.