import 'server-only';

import { getStrapiMediaUrl, strapiFetch, type StrapiQuery } from './client';
import type { BlogPost, BlogPostPreview } from './types';

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

const mapBlogPostBase = (raw: StrapiEntity | null) => {
  const normalized = normalizeEntity(raw) as StrapiBlogPost | null;
  if (!normalized) {
    return null;
  }

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
    documentId: normalized.documentId,
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
  };

  return { normalized, base };
};

const mapBlogPostPreview = (raw: StrapiEntity | null): BlogPostPreview | null => {
  const result = mapBlogPostBase(raw);
  return result ? result.base : null;
};

const mapBlogPost = (raw: StrapiEntity | null): BlogPost | null => {
  const result = mapBlogPostBase(raw);
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
      'slug',
      'title',
      'excerpt',
      'featured',
      'publishedAt',
      'authorName',
      'readingTime',
    ],
    populate: ['category', 'coverImage'],
  };

  const response = await strapiFetch<StrapiCollectionResponse<StrapiEntity>>('blog-posts', {
    query,
    locale,
    revalidate: 60,
  });

  return response.data
    .map((entry) => mapBlogPostPreview(entry))
    .filter((entry): entry is BlogPostPreview => Boolean(entry));
};

export const getBlogPostBySlug = async (slug: string, locale?: string) => {
  const query: StrapiQuery = {
    filters: { slug: { $eq: slug } },
    populate: ['category', 'coverImage'],
    pagination: { pageSize: 1 },
    fields: [
      'slug',
      'title',
      'excerpt',
      'content',
      'featured',
      'publishedAt',
      'authorName',
      'readingTime',
    ],
  };

  const response = await strapiFetch<StrapiCollectionResponse<StrapiEntity>>('blog-posts', {
    query,
    locale,
    revalidate: 300,
  });

  const first = response.data[0];
  return mapBlogPost(first);
};
