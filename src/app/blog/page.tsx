import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPageClient from "./BlogPageClient";
import { CMS_ENABLED } from "@/lib/strapi/client";
import { getBlogPostPreviews } from "@/lib/strapi/blog.server";
import { getLegacyBlogPostPreviews } from "@/lib/strapi/legacy";
import { getCookieLocale } from "@/lib/i18n/locale";

export const dynamic = "force-dynamic";

const buildBlogAlternates = () => ({
    languages: {
        ar: "/ar/blog",
        fr: "/fr/blog",
        en: "/en/blog",
    },
});

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getCookieLocale();

    return {
        alternates: {
            canonical: `/${locale}/blog`,
            ...buildBlogAlternates(),
        },
    };
}

export default async function BlogPage() {
    const locale = await getCookieLocale();
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
                <BlogPageClient posts={safePosts} categories={categories} basePath={`/${locale}/blog`} />
            </div>

            <Footer />
        </main>
    );
}
