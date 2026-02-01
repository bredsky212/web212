import 'server-only';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale } from '@/lib/i18n/locales';
import { getStrapiMediaUrl, strapiFetch, type StrapiQuery } from './client';
import type { BlogLocalization, BlogPost, BlogPostPreview } from './types';

type StrapiCollectionResponse<T> = {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

type StrapiEntity = Record<string, unknown> & {
  id?: number;
  documentId?: string;
  attributes?: Record<string, unknown>;
};

type StrapiBlogPost = StrapiEntity & {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: unknown;
  authorName?: string;
  publishedAt?: string;
  featured?: boolean;
  readingTime?: number;
  locale?: string;
  localizations?: unknown;
  category?: unknown;
  coverImage?: unknown;
};

const normalizeEntity = (entity: StrapiEntity | null | undefined) => {
  if (!entity) {
    return null;
  }

  if (entity.attributes) {
    return {
      id: entity.id,
      documentId: entity.documentId,
      ...entity.attributes,
    };
  }

  return entity;
};

const normalizeRelation = (value: unknown) => {
  if (!value) {
    return null;
  }

  if (typeof value === 'object' && value !== null && 'data' in value) {
    const data = (value as { data: unknown }).data;
    if (Array.isArray(data)) {
      return data.map((item) => normalizeEntity(item as StrapiEntity));
    }
    return normalizeEntity(data as StrapiEntity);
  }

  return normalizeEntity(value as StrapiEntity);
};

const mapBlogPostBase = (raw: StrapiEntity | null, requestedLocale?: string) => {
  const normalized = normalizeEntity(raw) as StrapiBlogPost | null;
  if (!normalized) {
    return null;
  }

  const resolvedLocale =
    typeof normalized.locale === 'string' ? normalized.locale : requestedLocale;
  const locale = isSupportedLocale(resolvedLocale) ? resolvedLocale : DEFAULT_LOCALE;

  const localizationsRaw = normalizeRelation(normalized.localizations);
  const localizationList = Array.isArray(localizationsRaw)
    ? localizationsRaw
    : localizationsRaw
    ? [localizationsRaw]
    : [];
  const localizations = localizationList
    .map((entry) => {
      const candidate = entry as StrapiEntity & { locale?: string; slug?: string };
      const entryLocale = typeof candidate.locale === 'string' ? candidate.locale : null;
      const entrySlug = typeof candidate.slug === 'string' ? candidate.slug : null;
      if (!entryLocale || !entrySlug || !isSupportedLocale(entryLocale)) {
        return null;
      }
      return {
        locale: entryLocale,
        slug: entrySlug,
        documentId: candidate.documentId
          ? String(candidate.documentId)
          : candidate.id
          ? String(candidate.id)
          : undefined,
      } as BlogLocalization;
    })
    .filter((entry): entry is BlogLocalization => Boolean(entry));

  const category = normalizeRelation(normalized.category) as
    | (StrapiEntity & { name?: string; slug?: string })
    | null;
  const coverImage = normalizeRelation(normalized.coverImage) as
    | (StrapiEntity & { url?: string })
    | null;

  const categoryName = typeof category?.name === 'string' ? category.name : null;
  const categorySlug = typeof category?.slug === 'string' ? category.slug : null;
  const coverImageUrl = typeof coverImage?.url === 'string' ? coverImage.url : null;

  const slug = typeof normalized.slug === 'string' ? normalized.slug : '';
  const title = typeof normalized.title === 'string' ? normalized.title : '';
  const excerpt =
    typeof normalized.excerpt === 'string' ? normalized.excerpt : undefined;
  const authorName =
    typeof normalized.authorName === 'string' ? normalized.authorName : null;
  const publishedAt =
    typeof normalized.publishedAt === 'string' ? normalized.publishedAt : null;
  const readingTime =
    typeof normalized.readingTime === 'number' ? normalized.readingTime : null;

  const base: BlogPostPreview = {
    id: String(normalized.id ?? normalized.documentId ?? slug ?? ''),
    documentId: normalized.documentId ? String(normalized.documentId) : undefined,
    locale,
    slug,
    title,
    excerpt,
    category: categoryName
      ? {
          id: category?.id ?? category?.documentId,
          documentId: category?.documentId,
          name: categoryName,
          slug: categorySlug ?? '',
        }
      : null,
    authorName,
    publishedAt,
    featured: Boolean(normalized.featured),
    coverImageUrl: getStrapiMediaUrl(coverImageUrl),
    readingTime,
    localizations: localizations.length ? localizations : undefined,
  };

  return { normalized, base };
};

const mapBlogPostPreview = (
  raw: StrapiEntity | null,
  requestedLocale?: string
): BlogPostPreview | null => {
  const result = mapBlogPostBase(raw, requestedLocale);
  return result ? result.base : null;
};

const mapBlogPost = (raw: StrapiEntity | null, requestedLocale?: string): BlogPost | null => {
  const result = mapBlogPostBase(raw, requestedLocale);
  if (!result) {
    return null;
  }

  return {
    ...result.base,
    content: result.normalized.content,
  };
};

export const getBlogPostPreviews = async (locale?: string) => {
  const query: StrapiQuery = {
    sort: ['publishedAt:desc'],
    fields: [
      'documentId',
      'slug',
      'title',
      'excerpt',
      'featured',
      'publishedAt',
      'authorName',
      'readingTime',
      'locale',
    ],
    populate: {
      category: true,
      coverImage: true,
    },
  };

  const response = await strapiFetch<StrapiCollectionResponse<StrapiEntity>>('blog-posts', {
    query,
    locale,
    cache: 'no-store',
  });

  if (!response) {
    return null;
  }

  return response.data
    .map((entry) => mapBlogPostPreview(entry, locale))
    .filter((entry): entry is BlogPostPreview => Boolean(entry))
    .filter((entry) => (!locale ? true : entry.locale === locale));
};

export const getBlogPostBySlug = async (slug: string, locale?: string) => {
  if (!slug) {
    if (process.env.STRAPI_DEBUG === '1') {
      console.warn('[STRAPI] getBlogPostBySlug called without a slug');
    }
    return null;
  }

  const query: StrapiQuery = {
    filters: { slug: { $eq: slug } },
    populate: {
      category: true,
      coverImage: true,
    },
    pagination: { pageSize: 1 },
    fields: [
      'documentId',
      'slug',
      'title',
      'excerpt',
      'content',
      'featured',
      'publishedAt',
      'authorName',
      'readingTime',
      'locale',
    ],
  };

  const response = await strapiFetch<StrapiCollectionResponse<StrapiEntity>>('blog-posts', {
    query,
    locale,
    cache: 'no-store',
  });

  if (!response) {
    return null;
  }

  const first = response.data[0];
  const post = mapBlogPost(first, locale);
  if (post && locale && post.locale !== locale) {
    return null;
  }
  return post;
};

export const getBlogPostLocaleBySlug = async (slug: string) => {
  if (!slug) {
    if (process.env.STRAPI_DEBUG === '1') {
      console.warn('[STRAPI] getBlogPostLocaleBySlug called without a slug');
    }
    return null;
  }

  const query: StrapiQuery = {
    filters: { slug: { $eq: slug } },
    pagination: { pageSize: 1 },
    fields: ['slug', 'locale', 'documentId'],
  };

  for (const candidateLocale of SUPPORTED_LOCALES) {
    const response = await strapiFetch<StrapiCollectionResponse<StrapiEntity>>('blog-posts', {
      query,
      locale: candidateLocale,
      cache: 'no-store',
    });

    if (!response || response.data.length === 0) {
      continue;
    }

    const first = normalizeEntity(response.data[0]) as StrapiBlogPost | null;
    if (!first) {
      continue;
    }

    const resolvedSlug = typeof first.slug === 'string' ? first.slug : null;
    const resolvedLocale =
      typeof first.locale === 'string' && isSupportedLocale(first.locale)
        ? first.locale
        : candidateLocale;

    if (!resolvedSlug) {
      continue;
    }

    return { locale: resolvedLocale, slug: resolvedSlug };
  }

  if (process.env.STRAPI_DEBUG === '1') {
    console.warn('[STRAPI] slug filter lookup failed, falling back to list scan');
  }

  for (const candidateLocale of SUPPORTED_LOCALES) {
    const previews = await getBlogPostPreviews(candidateLocale);
    const match = previews?.find((entry) => entry.slug === slug);
    if (match) {
      return { locale: candidateLocale, slug: match.slug };
    }
  }

  if (process.env.STRAPI_DEBUG === '1') {
    console.warn('[STRAPI] slug not found in any locale', slug);
  }

  return null;
};
