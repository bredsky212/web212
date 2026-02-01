import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, isSupportedLocale } from "@/lib/i18n/locales";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gen-Z 212 | The Digital Evolution",
  description: "A digital archive of the Gen-Z era, evolved.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerLocale = headers().get("x-site-locale");
  const cookieLocale = cookies().get(LOCALE_COOKIE_NAME)?.value;
  const resolvedLocale = isSupportedLocale(headerLocale)
    ? headerLocale
    : isSupportedLocale(cookieLocale)
    ? cookieLocale
    : DEFAULT_LOCALE;
  const dir = resolvedLocale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={resolvedLocale} dir={dir}>
      <body
        dir={dir}
        className={`${inter.variable} ${orbitron.variable} antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
