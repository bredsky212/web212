import 'server-only';

import { getStrapiMediaUrl, strapiFetch, type StrapiQuery } from './client';

export type BlogCategory = {
  id?: number | string;
  documentId?: string;
  name: string;
  slug: string;
};

export type BlogPost = {
  id: string;
  documentId?: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: unknown;
  category?: BlogCategory | null;
  authorName?: string | null;
  publishedAt?: string | null;
  featured?: boolean;
  coverImageUrl?: string | null;
};

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

type StrapiEntity = Record<string, any> & {
  id?: number;
  documentId?: string;
  attributes?: Record<string, any>;
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

const normalizeRelation = (value: any) => {
  if (!value) {
    return null;
  }

  if (value.data !== undefined) {
    if (Array.isArray(value.data)) {
      return value.data.map(normalizeEntity);
    }
    return normalizeEntity(value.data);
  }

  return normalizeEntity(value);
};

const mapBlogPost = (raw: StrapiEntity | null): BlogPost | null => {
  const normalized = normalizeEntity(raw);
  if (!normalized) {
    return null;
  }

  const category = normalizeRelation(normalized.category) as BlogCategory | null;
  const coverImage = normalizeRelation(normalized.coverImage) as Record<string, any> | null;

  return {
    id: String(normalized.id ?? normalized.documentId ?? normalized.slug ?? ''),
    documentId: normalized.documentId,
    slug: normalized.slug,
    title: normalized.title,
    excerpt: normalized.excerpt,
    content: normalized.content,
    category: category
      ? {
          id: category.id ?? category.documentId,
          documentId: category.documentId,
          name: category.name,
          slug: category.slug,
        }
      : null,
    authorName: normalized.authorName || null,
    publishedAt: normalized.publishedAt || null,
    featured: Boolean(normalized.featured),
    coverImageUrl: getStrapiMediaUrl(coverImage?.url),
  };
};

type BlogQuery = {
  locale?: string;
  category?: string;
  search?: string;
};

export const getBlogPosts = async ({ locale, category, search }: BlogQuery = {}) => {
  const filters: Record<string, any> = {};

  if (category) {
    filters.category = { slug: { $eq: category } };
  }

  if (search) {
    filters.$or = [
      { title: { $containsi: search } },
      { excerpt: { $containsi: search } },
    ];
  }

  const query: StrapiQuery = {
    sort: ['publishedAt:desc'],
    populate: ['category', 'coverImage'],
    ...(Object.keys(filters).length ? { filters } : {}),
  };

  const response = await strapiFetch<StrapiCollectionResponse<StrapiEntity>>('blog-posts', {
    query,
    locale,
  });

  return response.data
    .map((entry) => mapBlogPost(entry))
    .filter((entry): entry is BlogPost => Boolean(entry));
};

export const getBlogPostBySlug = async (slug: string, locale?: string) => {
  const query: StrapiQuery = {
    filters: { slug: { $eq: slug } },
    populate: ['category', 'coverImage'],
    pagination: { pageSize: 1 },
  };

  const response = await strapiFetch<StrapiCollectionResponse<StrapiEntity>>('blog-posts', {
    query,
    locale,
  });

  const first = response.data[0];
  return mapBlogPost(first);
};