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
  - `CMS_ENABLED=true`
  - `STRAPI_URL=http://localhost:1337`
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
- Next.js lint: `npm run lint`
- Strapi dev: `cd cms && npm run develop`
- Docker: `docker compose up -d`

## Strapi Integration Rules

- **Server-only fetchers** live in `src/lib/strapi/*.server.ts` or modules importing `server-only`.
- **Client components must never import server-only modules**. Use `src/lib/strapi/types.ts` for shared types.
- `STRAPI_API_TOKEN` is required in **production** and never exposed via `NEXT_PUBLIC_*`.
- Blog list uses preview fields (no blocks). Blog detail loads full blocks.

## Caching / Revalidate

- Strapi fetchers support `cache` and `revalidate` via `strapiFetch()` in `src/lib/strapi/client.ts`.
- Blog list uses short revalidate (e.g., 60s). Detail uses longer (e.g., 300s).

## Encoding & Windows UTF-8 Lessons Learned

- **Always read/write files as UTF-8** in PowerShell to avoid mangled characters (e.g., bullets `•` turning into `�`).
- Prefer:
  - `py -3 -Xutf8 -c "from pathlib import Path; print(Path('path').read_text(encoding='utf-8'))"`
  - `Get-Content -Encoding UTF8` and `Set-Content -Encoding UTF8`
- Avoid plain `Get-Content` (defaults to CP1252 on Windows) when file contains non-ASCII.

## Branching & Commits

- Create feature branches from the current working branch:
  - `git switch -c feature/your-topic`
- Keep commits focused and scoped to the task at hand.

## Known Lint Caveats

- `npm run lint` currently reports pre-existing warnings/errors unrelated to Strapi (e.g., unescaped entities in other pages, `setState` in effects).
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

## Safety Notes

- Do **not** re-enable write handlers on legacy API routes unless explicitly requested.
- Keep Strapi admin off the public internet or properly protected.
- Keep Strapi token server-only.