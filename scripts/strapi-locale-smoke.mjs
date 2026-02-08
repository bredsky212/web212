import process from 'process';

const baseUrl = process.env.STRAPI_URL || 'http://localhost:1337';
const token = process.env.STRAPI_API_TOKEN;
const locales = ['ar', 'fr', 'en'];

const headers = token ? { Authorization: `Bearer ${token}` } : {};

const extractValue = (entry, key) => {
  if (!entry || typeof entry !== 'object') return null;
  const attributes = entry.attributes && typeof entry.attributes === 'object' ? entry.attributes : entry;
  return attributes[key] ?? null;
};

const run = async () => {
  for (const locale of locales) {
    const url = `${baseUrl}/api/blog-posts?pagination[pageSize]=1&locale=${locale}&fields[0]=title&fields[1]=slug&fields[2]=locale`;
    try {
      const res = await fetch(url, { headers });
      const data = await res.json().catch(() => null);
      const entry = data?.data?.[0];
      const title = extractValue(entry, 'title') || '(no title)';
      const entryLocale = extractValue(entry, 'locale') || 'n/a';
      const slug = extractValue(entry, 'slug') || 'n/a';
      console.log(`[${locale}] status=${res.status} locale=${entryLocale} slug=${slug} title=${title}`);
    } catch (error) {
      console.error(`[${locale}] request failed`, error);
    }
  }
};

run();
