import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  isSupportedLocale,
} from './src/lib/i18n/locales';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segment = pathname.split('/')[1];
  const cookieLocale = req.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const resolvedLocale = isSupportedLocale(segment)
    ? segment
    : isSupportedLocale(cookieLocale)
    ? cookieLocale
    : DEFAULT_LOCALE;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-site-locale', resolvedLocale);

  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (segment && isSupportedLocale(segment)) {
    res.cookies.set(LOCALE_COOKIE_NAME, segment, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
