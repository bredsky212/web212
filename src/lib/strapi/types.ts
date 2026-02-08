import type { SupportedLocale } from '@/lib/i18n/locales';

export type BlogCategory = {
  id?: number | string;
  documentId?: string;
  name: string;
  slug: string;
};

export type BlogLocalization = {
  locale: SupportedLocale;
  slug: string;
  documentId?: string;
};

export type BlogPostPreview = {
  id: string;
  documentId?: string;
  locale: SupportedLocale;
  slug: string;
  title: string;
  excerpt?: string;
  category?: BlogCategory | null;
  authorName?: string | null;
  publishedAt?: string | null;
  featured?: boolean;
  coverImageUrl?: string | null;
  readingTime?: number | null;
  localizations?: BlogLocalization[];
};

export type BlogPost = BlogPostPreview & {
  content?: unknown;
};
