import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPageClient from "@/app/blog/BlogPageClient";
import { CMS_ENABLED } from "@/lib/strapi/client";
import { getBlogPostPreviews } from "@/lib/strapi/blog.server";
import { getLegacyBlogPostPreviews } from "@/lib/strapi/legacy";
import { DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
    params: { locale: string };
};

const buildBlogAlternates = () => ({
    languages: {
        ar: "/ar/blog",
        fr: "/fr/blog",
        en: "/en/blog",
    },
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const rawLocale = params.locale.toLowerCase();
    const locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

    return {
        alternates: {
            canonical: `/${locale}/blog`,
            ...buildBlogAlternates(),
        },
    };
}

export default async function BlogPage({ params }: PageProps) {
    const rawLocale = params.locale.toLowerCase();
    if (!isSupportedLocale(rawLocale)) {
        notFound();
    }
    const locale = rawLocale as SupportedLocale;

    const posts = CMS_ENABLED
        ? await getBlogPostPreviews(locale)
        : await getLegacyBlogPostPreviews();
    const safePosts = posts ?? [];
    const categories = Array.from(
        new Set(safePosts.map((post) => post.category?.name).filter(Boolean))
    ) as string[];

    return (
        <main className="min-h-screen bg-black text-white selection:bg-neon-red selection:text-white">
            <Navbar />

            <div className="container mx-auto px-4 py-32 max-w-6xl">
                <BlogPageClient
                    posts={safePosts}
                    categories={categories}
                    basePath={`/${locale}/blog`}
                />
            </div>

            <Footer />
        </main>
    );
}
