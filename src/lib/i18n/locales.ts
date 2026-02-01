export const LOCALE_COOKIE_NAME = 'site_locale';

export const SUPPORTED_LOCALES = ['ar', 'fr', 'en'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = 'ar';

export const isSupportedLocale = (
  value: string | null | undefined
): value is SupportedLocale =>
  SUPPORTED_LOCALES.includes(value as SupportedLocale);

export const normalizeLocale = (value: string | null | undefined): SupportedLocale =>
  isSupportedLocale(value) ? value : DEFAULT_LOCALE;
