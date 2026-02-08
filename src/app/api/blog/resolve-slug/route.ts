import { NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/lib/strapi/blog.server';
import { strapiFetch, type StrapiQuery } from '@/lib/strapi/client';
import { isSupportedLocale } from '@/lib/i18n/locales';

type StrapiCollectionResponse<T> = {
  data: T[];
};

type StrapiEntity = Record<string, unknown> & {
  id?: number;
  documentId?: string;
  attributes?: Record<string, unknown>;
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
    } as Record<string, unknown>;
  }
  return entity as Record<string, unknown>;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug') ?? '';
  const from = searchParams.get('from') ?? '';
  const to = searchParams.get('to') ?? '';

  if (!slug || !isSupportedLocale(from) || !isSupportedLocale(to)) {
    return NextResponse.json({ slug: null }, { status: 400 });
  }

  const source = await getBlogPostBySlug(slug, from);
  if (!source?.documentId) {
    return NextResponse.json({ slug: null }, { status: 404 });
  }

  const query: StrapiQuery = {
    filters: { documentId: { $eq: source.documentId } },
    fields: ['slug', 'locale', 'documentId'],
    pagination: { pageSize: 1 },
  };

  const response = await strapiFetch<StrapiCollectionResponse<StrapiEntity>>('blog-posts', {
    query,
    locale: to,
    cache: 'no-store',
  });

  const entry = response?.data?.[0] ?? null;
  const normalized = normalizeEntity(entry) as { slug?: unknown } | null;
  const resolvedSlug = typeof normalized?.slug === 'string' ? normalized.slug : null;

  return NextResponse.json({ slug: resolvedSlug });
}
