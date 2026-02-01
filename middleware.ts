import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALE_COOKIE_NAME, isSupportedLocale } from './src/lib/i18n/locales';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segment = pathname.split('/')[1];

  if (segment && isSupportedLocale(segment)) {
    if (pathname.startsWith(`/${segment}/blog`)) {
      const url = req.nextUrl.clone();
      const stripped = pathname.replace(`/${segment}`, '') || '/';
      url.pathname = stripped;
      url.searchParams.set('locale', segment);
      const res = NextResponse.rewrite(url);
      res.cookies.set(LOCALE_COOKIE_NAME, segment, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
      return res;
    }

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
