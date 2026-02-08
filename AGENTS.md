# AGENTS.md

This guide helps coding agents work effectively in this repo with minimal friction.

## Quick Orientation

- **Web app**: Next.js (app router) under `src/`.
- **CMS**: Strapi v5 app under `cms/`.
- **API (legacy)**: Next.js API routes in `src/app/api/*` (read-only for posts/timeline).
- **Blog**: Strapi-backed pages in:
  - `src/app/blog/page.tsx`
  - `src/app/blog/[slug]/page.tsx`
  - Client UI helpers in `src/app/blog/BlogPageClient.tsx` and `src/app/blog/[slug]/BlogPostClient.tsx`
- **Strapi fetchers**:
  - Server-only: `src/lib/strapi/client.ts`, `src/lib/strapi/blog.server.ts`, `src/lib/strapi/legacy.ts`
  - Shared types: `src/lib/strapi/types.ts`

## Local Setup (Token-Only Model)

1) Web env

- `cp .env.example .env.local`
- Set:
  - `NEXT_PUBLIC_SITE_URL=http://localhost:3000` (or your site URL; used for canonical/OG metadata URLs)
  - `CMS_ENABLED=true`
  - `STRAPI_URL=http://localhost:1337`
  - `STRAPI_PUBLIC_URL=` (prod: set to public Strapi host for images)
  - `STRAPI_DEBUG=1` (optional; logs Strapi request URLs)
  - `STRAPI_API_TOKEN=...` (read-only token)

2) CMS env

- `cp cms/.env.example cms/.env`
- Set required Strapi secrets (`APP_KEYS`, `JWT_SECRET`, etc.).
- Set `CORS_ORIGINS=http://localhost:3000`.

3) Start services

- `docker compose up -d`
- `npm install && npm run dev`

4) Strapi permissions

- Public role: **no permissions** for blog content.
- API Token: read-only access for Blog types.

## Key Commands

- Next.js dev: `npm run dev`
- Next.js build: `npm run build`
- Next.js lint: `npm run lint`
- Strapi dev: `cd cms && npm run develop`
- Docker: `docker compose up -d`
- Strapi locale smoke test: `node scripts/strapi-locale-smoke.mjs`
- Dependency verification:
  - `npm ls radix-ui` (should be empty after scoped Radix migration)

## Strapi Integration Rules

- **Server-only fetchers** live in `src/lib/strapi/*.server.ts` or modules importing `server-only`.
- **Client components must never import server-only modules**. Use `src/lib/strapi/types.ts` for shared types.
- `STRAPI_API_TOKEN` is required in **production** and never exposed via `NEXT_PUBLIC_*`.
- Blog list uses preview fields (no blocks). Blog detail loads full blocks.
- Blog responses include `locale` for i18n routing; localizations are not populated (Strapi v5 validation rejects `populate=localizations`).


## Blog i18n Routing

- Supported locales: `ar`, `fr`, `en` (default `ar`).
- Cookie: `site_locale` (set in `middleware.ts`).
- Non-prefixed routes (`/blog`) read the cookie; prefixed routes (`/ar/blog`, `/fr/blog`, `/en/blog`) override it and also persist the cookie.
- Locale helpers: `src/lib/i18n/locales.ts` and `src/lib/i18n/locale.ts`.
- Prefixed pages live in `src/app/[locale]/blog/*`.
- Middleware rewrites prefixed **blog list** routes to `/blog?locale=xx` to avoid same-request cookie lag; prefixed blog detail routes are not rewritten.

### Lessons learned

- Always verify Strapi requests with `STRAPI_DEBUG=1` when locale issues appear.
- If a blog **slug** is missing, Strapi filters drop and the API can return the first post in that locale.
- Prefer prefixed URLs (`/ar|fr|en`) for shareable, deterministic blog routes.

## Caching / Revalidate

- Strapi fetchers support `cache` and `revalidate` via `strapiFetch()` in `src/lib/strapi/client.ts`.
- Blog list uses short revalidate (e.g., 60s). Detail uses longer (e.g., 300s).

## SEO / OpenGraph Metadata

- Central SEO config lives in `src/lib/seo.ts`.
- Root metadata is wired in `src/app/layout.tsx` via `rootMetadata`.
- Default OG image is `public/og-default.jpg` (1200x630).
- Blog list/detail metadata is generated in:
  - `src/app/blog/page.tsx`
  - `src/app/blog/[slug]/page.tsx`
  - `src/app/[locale]/blog/page.tsx`
  - `src/app/[locale]/blog/[slug]/page.tsx`
- Prefer setting `NEXT_PUBLIC_SITE_URL` in all environments so metadata uses correct absolute URLs.

## Blog Content Rendering Lessons Learned

- Blog detail content can arrive as either:
  - Strapi blocks (JSON array), rendered with `BlocksRenderer`
  - Raw HTML string (`<p>`, `<ul>`, `<h1>`, etc.), rendered with `dangerouslySetInnerHTML`
- Rich-content styling for blog detail is explicitly defined in:
  - `src/app/blog/[slug]/BlogPostClient.tsx`
- Do not assume Tailwind Typography (`prose`) is sufficient; element-level selectors were added for predictable rendering.

## Mobile / RTL Lessons Learned

- Use logical utilities (`text-start`, `ms-auto`, `border-s`, `ps`) instead of physical LTR utilities (`text-left`, `ml-*`, `border-l`, `pl-*`) for RTL-safe layouts.
- Manifesto accordion RTL fix is in `src/components/ui/accordion.tsx`.
- Timeline mobile date marker layout fix is in `src/app/timeline/page.tsx`.
- History mobile overflow and RTL fixes are in `src/app/history/page.tsx`.

## History Figures (Localized SVG)

- Localized history figures are in `public/figures/history/*.svg` (`ar`, `fr`, `en` variants).
- History page selects figure locale from current app language with EN fallback.
- If Arabic SVG text renders as `????`, file content is already corrupted; regenerate/write files explicitly as UTF-8.

## Encoding & Windows UTF-8 Lessons Learned

- **Always read/write files as UTF-8** in PowerShell to avoid mangled characters (e.g., bullets `•` turning into `�`).
- Prefer:
  - `py -3 -Xutf8 -c "from pathlib import Path; print(Path('path').read_text(encoding='utf-8'))"`
  - `Get-Content -Encoding UTF8` and `Set-Content -Encoding UTF8`
- Avoid plain `Get-Content` (defaults to CP1252 on Windows) when file contains non-ASCII.
- For paths containing brackets (e.g., `src/app/blog/[slug]/...`), use `-LiteralPath` in PowerShell.
- For localized SVGs, verify glyph integrity by checking files do not contain placeholder `?` characters.

## Branching & Commits

- Create feature branches from the current working branch:
  - `git switch -c feature/your-topic`
- Keep commits focused and scoped to the task at hand.

## Known Lint Caveats

- `npm run lint` currently reports pre-existing warnings/errors unrelated to Strapi (e.g., unescaped entities in other pages, `setState` in effects).
- `npm test` script is not defined in this repo at the moment.
- If your task requires clean lint, coordinate fixes for:
  - `src/app/page.tsx`
  - `src/app/manifesto/page.tsx`
  - `src/contexts/LanguageContext.tsx`
  - `src/contexts/ThemeContext.tsx`

## File Map (Most Touched)

- Strapi client: `src/lib/strapi/client.ts`
- Strapi blog server: `src/lib/strapi/blog.server.ts`
- Strapi types: `src/lib/strapi/types.ts`
- Legacy fallback: `src/lib/strapi/legacy.ts`
- Blog list: `src/app/blog/page.tsx`
- Blog detail: `src/app/blog/[slug]/page.tsx`
- Strapi CORS: `cms/config/middlewares.ts`
- Strapi schemas: `cms/src/api/blog-post/.../schema.json` and `cms/src/api/blog-category/.../schema.json`
- Language switcher: `src/components/LanguageSwitcher.tsx` (wired in `src/components/Navbar.tsx`)
- Locale middleware: `middleware.ts`
- SEO helpers: `src/lib/seo.ts`
- History page: `src/app/history/page.tsx`
- Timeline page: `src/app/timeline/page.tsx`
- History figures: `public/figures/history/*.svg`


## Strapi as Code (i18n)

Note: Strapi v5 ships i18n in core; there is no separate @strapi/plugin-i18n npm package.

- Localization is stored in schema files under `cms/src/api/**/schema.json`.
- If localization is toggled in admin, you must commit the updated schemas or it will be lost on rebuild.
- Check with `scripts/check-strapi-i18n.sh`.

## Safety Notes

- Do **not** re-enable write handlers on legacy API routes unless explicitly requested.
- Keep Strapi admin off the public internet or properly protected.
- Keep Strapi token server-only.
