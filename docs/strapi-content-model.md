# Strapi Content Model

## Collection Types

### BlogPost

- slug (UID, target: title, unique)
- title (string, required)
- excerpt (text)
- content (blocks rich text)
- category (relation -> BlogCategory, many-to-one)
- authorName (string)
- readingTime (integer)
- featured (boolean)
- coverImage (media, single image)
- publishedAt (system field from Draft/Publish)

Notes:
- Draft/Publish is enabled so `publishedAt` is managed by Strapi.

### BlogCategory

- name (string, required, unique)
- slug (UID, target: name, unique)
- posts (relation -> BlogPost, one-to-many)

## i18n Decision

- UI microcopy stays in `src/i18n/*.json` (labels, buttons, nav, etc.).
- Editorial content moves to Strapi over time (manifesto/history/timeline/podcast/blog).
- For this phase, only Blog content is migrated.
