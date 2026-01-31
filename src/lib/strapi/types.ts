export type BlogCategory = {
  id?: number | string;
  documentId?: string;
  name: string;
  slug: string;
};

export type BlogPostPreview = {
  id: string;
  documentId?: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: BlogCategory | null;
  authorName?: string | null;
  publishedAt?: string | null;
  featured?: boolean;
  coverImageUrl?: string | null;
  readingTime?: number | null;
};

export type BlogPost = BlogPostPreview & {
  content?: unknown;
};
