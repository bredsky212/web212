import 'server-only';

export type StrapiQueryPrimitive = string | number | boolean | null;
export type StrapiQueryValue = StrapiQueryPrimitive | StrapiQueryArray | StrapiQueryObject;
export type StrapiQueryArray = StrapiQueryValue[];
export type StrapiQueryObject = { [key: string]: StrapiQueryValue };
export type StrapiQuery = Record<string, StrapiQueryValue>;

export type StrapiFetchOptions = {
  query?: StrapiQuery;
  locale?: string;
  auth?: boolean;
  cache?: 'force-cache' | 'no-store';
  revalidate?: number;
};

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export const CMS_ENABLED = process.env.CMS_ENABLED === 'true';

const buildQueryPairs = (value: StrapiQueryValue, keyPrefix: string, pairs: string[]) => {
  if (value === null || value === undefined) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      buildQueryPairs(item, `${keyPrefix}[${index}]`, pairs);
    });
    return;
  }

  if (typeof value === 'object') {
    Object.entries(value).forEach(([key, nested]) => {
      const nextPrefix = keyPrefix ? `${keyPrefix}[${key}]` : key;
      buildQueryPairs(nested, nextPrefix, pairs);
    });
    return;
  }

  pairs.push(`${encodeURIComponent(keyPrefix)}=${encodeURIComponent(String(value))}`);
};

const buildQueryString = (query?: StrapiQuery): string => {
  if (!query) {
    return '';
  }

  const pairs: string[] = [];
  Object.entries(query).forEach(([key, value]) => {
    buildQueryPairs(value, key, pairs);
  });

  return pairs.length ? `?${pairs.join('&')}` : '';
};

export const getStrapiMediaUrl = (url?: string | null) => {
  if (!url) {
    return null;
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `${STRAPI_URL}${url}`;
};

const isBuildPhase = () =>
  process.env.NEXT_PHASE === 'phase-production-build' ||
  process.env.NEXT_PHASE === 'phase-production-export';

export async function strapiFetch<T>(path: string, options: StrapiFetchOptions = {}): Promise<T | null> {
  const { query, locale, auth = true, cache, revalidate } = options;
  const normalizedPath = path.startsWith('/') ? path : `/api/${path}`;

  if (process.env.NODE_ENV === 'production') {
    if (!STRAPI_TOKEN) {
      throw new Error('STRAPI_API_TOKEN is required in production to access Strapi.');
    }
    if (!auth) {
      throw new Error('Unauthenticated Strapi requests are disabled in production.');
    }
  }

  const requestQuery: StrapiQuery = { ...query };
  if (locale) {
    requestQuery.locale = locale;
  }

  const url = `${STRAPI_URL}${normalizedPath}${buildQueryString(requestQuery)}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (auth && STRAPI_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  const fetchOptions: RequestInit & { next?: { revalidate?: number } } = { headers };

  if (cache) {
    fetchOptions.cache = cache;
  }

  if (typeof revalidate === 'number') {
    fetchOptions.next = { revalidate };
  }

  try {
    const response = await fetch(url, fetchOptions);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      if (isBuildPhase()) {
        return null;
      }
      const body = await response.text();
      throw new Error(`Strapi request failed (${response.status}): ${body}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (isBuildPhase()) {
      return null;
    }
    throw error;
  }
}
