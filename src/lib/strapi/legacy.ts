import 'server-only';

import { headers } from 'next/headers';
import type { BlogPost, BlogPostPreview } from './types';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const getBaseUrl = async () => {
  const headerList = await headers();
  const host = headerList.get('x-forwarded-host') || headerList.get('host');
  const proto = headerList.get('x-forwarded-proto') || 'http';
  if (!host) {
    return 'http://localhost:3000';
  }
  return `${proto}://${host}`;
};

type LegacyPost = {
  _id?: string;
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  authorName?: string;
  publishedAt?: string;
  featured?: boolean;
  imageUrl?: string;
  readingTime?: number;
};

const mapLegacyPost = (post: LegacyPost): BlogPost => {
  const categoryName = post.category || 'Uncategorized';
  const category = {
    name: categoryName,
    slug: slugify(categoryName),
  };

  return {
    id: String(post._id || post.id || post.slug || ''),
    slug: post.slug || '',
    title: post.title || '',
    excerpt: post.excerpt,
    content: post.content,
    category,
    authorName: post.author || post.authorName || null,
    publishedAt: post.publishedAt || null,
    featured: Boolean(post.featured),
    coverImageUrl: post.imageUrl || null,
    readingTime: typeof post.readingTime === 'number' ? post.readingTime : null,
  };
};

const mapLegacyPreview = (post: LegacyPost): BlogPostPreview => {
  const full = mapLegacyPost(post);
  return {
    id: full.id,
    documentId: full.documentId,
    slug: full.slug,
    title: full.title,
    excerpt: full.excerpt,
    category: full.category,
    authorName: full.authorName,
    publishedAt: full.publishedAt,
    featured: full.featured,
    coverImageUrl: full.coverImageUrl,
    readingTime: full.readingTime,
  };
};

const fetchLegacyPosts = async (): Promise<LegacyPost[]> => {
  try {
    const baseUrl = await getBaseUrl();
    const response = await fetch(`${baseUrl}/api/posts`, { cache: 'no-store' });
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      return [];
    }
    return data as LegacyPost[];
  } catch {
    return [];
  }
};

export const getLegacyBlogPostPreviews = async (): Promise<BlogPostPreview[]> => {
  const posts = await fetchLegacyPosts();
  return posts.map(mapLegacyPreview);
};

export const getLegacyBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const posts = await fetchLegacyPosts();
  const found = posts.find((post) => post.slug === slug);
  return found ? mapLegacyPost(found) : null;
};
