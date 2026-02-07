import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Inter, Orbitron, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, isSupportedLocale } from "@/lib/i18n/locales";
import { rootMetadata } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
});

export const metadata: Metadata = rootMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const cookieList = await cookies();
  const headerLocale = headerList.get("x-site-locale");
  const cookieLocale = cookieList.get(LOCALE_COOKIE_NAME)?.value;
  const resolvedLocale = isSupportedLocale(headerLocale)
    ? headerLocale
    : isSupportedLocale(cookieLocale)
    ? cookieLocale
    : DEFAULT_LOCALE;
  const dir = resolvedLocale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={resolvedLocale} dir={dir}>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Genz212" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        dir={dir}
        className={`${inter.variable} ${orbitron.variable} ${notoArabic.variable} antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
