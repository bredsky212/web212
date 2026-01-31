import 'server-only';

import { headers } from 'next/headers';
import type { BlogPost } from './blog';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const getBaseUrl = () => {
  const headerList = headers();
  const host = headerList.get('x-forwarded-host') || headerList.get('host');
  const proto = headerList.get('x-forwarded-proto') || 'http';
  if (!host) {
    return 'http://localhost:3000';
  }
  return `${proto}://${host}`;
};

const mapLegacyPost = (post: Record<string, any>): BlogPost => {
  const categoryName = post.category || 'Uncategorized';
  const category = {
    name: categoryName,
    slug: slugify(categoryName),
  };

  return {
    id: String(post._id || post.id || post.slug || ''),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category,
    authorName: post.author || post.authorName || null,
    publishedAt: post.publishedAt || null,
    featured: Boolean(post.featured),
    coverImageUrl: post.imageUrl || null,
  };
};

export const getLegacyBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch(`${getBaseUrl()}/api/posts`, { cache: 'no-store' });
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map(mapLegacyPost);
  } catch (error) {
    return [];
  }
};

export const getLegacyBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const posts = await getLegacyBlogPosts();
  const found = posts.find((post) => post.slug === slug);
  return found || null;
};