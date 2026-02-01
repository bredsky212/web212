import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALE_COOKIE_NAME, SUPPORTED_LOCALES, isSupportedLocale } from './src/lib/i18n/locales';

const LOCALE_SET = new Set(SUPPORTED_LOCALES);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segment = pathname.split('/')[1];

  if (segment && LOCALE_SET.has(segment) && isSupportedLocale(segment)) {
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE_NAME, segment, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
