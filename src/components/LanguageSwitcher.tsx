'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  SUPPORTED_LOCALES,
  isSupportedLocale,
  type SupportedLocale,
} from '@/lib/i18n/locales';

const LOCALE_LABELS: Record<SupportedLocale, string> = {
  ar: 'AR',
  fr: 'FR',
  en: 'EN',
};

const getLocaleFromPath = (pathname: string) => {
  const segment = pathname.split('/')[1];
  return isSupportedLocale(segment) ? segment : null;
};

const getLocaleFromCookie = () => {
  if (typeof document === 'undefined') {
    return null;
  }
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE_NAME}=([^;]*)`)
  );
  const value = match ? decodeURIComponent(match[1]) : null;
  return isSupportedLocale(value) ? value : null;
};

const isBlogPath = (pathname: string) => {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const parts = normalized.split('/');
  const withoutLocale = isSupportedLocale(parts[1])
    ? `/${parts.slice(2).join('/')}`
    : normalized;

  return withoutLocale === '/blog' || withoutLocale.startsWith('/blog/');
};

const buildPrefixedPath = (pathname: string, locale: SupportedLocale) => {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const parts = normalized.split('/');
  if (isSupportedLocale(parts[1])) {
    parts[1] = locale;
    return parts.join('/') || `/${locale}`;
  }
  return `/${locale}${normalized}`;
};

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const { setLang } = useLanguage();
  const [activeLocale, setActiveLocale] = useState<SupportedLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    const pathLocale = getLocaleFromPath(pathname);
    const cookieLocale = getLocaleFromCookie();
    const nextLocale = pathLocale || cookieLocale || DEFAULT_LOCALE;
    setActiveLocale(nextLocale);
    setLang(nextLocale);
  }, [pathname, setLang]);

  const handleSelect = (locale: SupportedLocale) => {
    setActiveLocale(locale);
    setLang(locale);

    if (isBlogPath(pathname)) {
      const target = buildPrefixedPath(pathname, locale);
      if (target !== pathname) {
        router.push(target);
      }
      router.refresh();
      return;
    }

    router.refresh();
  };

  const entries = useMemo(() => SUPPORTED_LOCALES, []);

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--border)] p-1">
      {entries.map((locale) => (
        <button
          key={locale}
          onClick={() => handleSelect(locale)}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
            activeLocale === locale
              ? 'bg-[var(--accent)] text-white'
              : 'text-[var(--text-secondary)] hover:text-[var(--accent)]'
          }`}
          aria-pressed={activeLocale === locale}
          type="button"
        >
          {LOCALE_LABELS[locale]}
        </button>
      ))}
    </div>
  );
}
