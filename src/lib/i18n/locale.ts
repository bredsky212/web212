import 'server-only';

import { cookies } from 'next/headers';
import { LOCALE_COOKIE_NAME, normalizeLocale } from './locales';

export const getCookieLocale = () => {
  const cookie = cookies().get(LOCALE_COOKIE_NAME);
  return normalizeLocale(cookie?.value);
};
