export type StrapiQueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | StrapiQuery
  | StrapiQueryValue[];

export type StrapiQuery = Record<string, StrapiQueryValue>;

export type StrapiFetchOptions = {
  query?: StrapiQuery;
  locale?: string;
  auth?: boolean;
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
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

export async function strapiFetch<T>(path: string, options: StrapiFetchOptions = {}) {
  const { query, locale, auth = true } = options;
  const normalizedPath = path.startsWith('/') ? path : `/api/${path}`;

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

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Strapi request failed (${response.status}): ${body}`);
  }

  return (await response.json()) as T;
}