import 'server-only';

import { cookies } from 'next/headers';
import { LOCALE_COOKIE_NAME, normalizeLocale } from './locales';

export const getCookieLocale = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(LOCALE_COOKIE_NAME);
  return normalizeLocale(cookie?.value);
};
