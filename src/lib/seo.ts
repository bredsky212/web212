import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  type SupportedLocale,
} from "@/lib/i18n/locales";

export const SITE_NAME = "Gen-Z 212";
export const SITE_TITLE = "Gen-Z 212 | The Digital Evolution";
export const SITE_DESCRIPTION =
  "Gen-Z 212 is a digital archive documenting protest timelines, manifesto principles, and analysis across the Gen-Z movement.";
export const SITE_KEYWORDS = [
  "Gen-Z 212",
  "GenZ212",
  "digital activism",
  "youth movement",
  "protest timeline",
  "manifesto",
  "Morocco",
  "social justice",
  "civic engagement",
];

export const DEFAULT_OG_IMAGE = {
  url: "/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "Gen-Z 212 social preview",
} as const;

const OPEN_GRAPH_LOCALE_BY_SITE_LOCALE: Record<SupportedLocale, string> = {
  ar: "ar_MA",
  fr: "fr_FR",
  en: "en_US",
};

const resolveMetadataBase = () => {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000";
  try {
    return new URL(candidate);
  } catch {
    return new URL("http://localhost:3000");
  }
};

export const METADATA_BASE = resolveMetadataBase();

export const resolveOpenGraphLocale = (locale?: string) => {
  if (isSupportedLocale(locale)) {
    return OPEN_GRAPH_LOCALE_BY_SITE_LOCALE[locale];
  }
  return OPEN_GRAPH_LOCALE_BY_SITE_LOCALE[DEFAULT_LOCALE];
};

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  locale?: string;
  keywords?: string[];
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
};

export const buildPageMetadata = ({
  title,
  description,
  path,
  locale,
  keywords,
  image,
}: BuildPageMetadataInput): Metadata => {
  const resolvedImage = image ?? DEFAULT_OG_IMAGE;
  const socialTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    keywords: keywords ?? SITE_KEYWORDS,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url: path,
      locale: resolveOpenGraphLocale(locale),
      images: [resolvedImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [resolvedImage.url],
    },
  };
};

export const rootMetadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: {
    default: SITE_TITLE,
    template: "%s | Gen-Z 212",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  category: "politics",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: resolveOpenGraphLocale(DEFAULT_LOCALE),
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};
