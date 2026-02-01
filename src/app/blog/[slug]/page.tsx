import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostClient from "./BlogPostClient";
import { CMS_ENABLED } from "@/lib/strapi/client";
import { getBlogPostBySlug, getBlogPostLocaleBySlug } from "@/lib/strapi/blog.server";
import { getLegacyBlogPostBySlug } from "@/lib/strapi/legacy";
import Link from "next/link";
import { getCookieLocale } from "@/lib/i18n/locale";
import { normalizeLocale } from "@/lib/i18n/locales";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
    params: { slug: string };
    searchParams?: { locale?: string; slug?: string };
};

const buildBlogAlternates = (slug: string) => ({
    languages: {
        ar: `/ar/blog/${slug}`,
        fr: `/fr/blog/${slug}`,
        en: `/en/blog/${slug}`,
    },
});

const resolveLocale = async (searchParams?: { locale?: string }) => {
    const override =
        typeof searchParams?.locale === "string" ? searchParams.locale : null;
    if (override) {
        return normalizeLocale(override);
    }
    return getCookieLocale();
};

const resolveSlug = (params: { slug: string }, searchParams?: { slug?: string }) => {
    if (typeof params.slug === "string" && params.slug) {
        return params.slug;
    }
    if (typeof searchParams?.slug === "string" && searchParams.slug) {
        return searchParams.slug;
    }
    return "";
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
    const locale = await resolveLocale(searchParams);
    const slug = resolveSlug(params, searchParams);

    return {
        alternates: {
            canonical: `/${locale}/blog/${slug}`,
            ...buildBlogAlternates(slug),
        },
    };
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
    const slug = resolveSlug(params, searchParams);
    if (!slug) {
        return (
            <main className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="container mx-auto px-4 py-32 text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">Post Not Found</h1>
                    <p className="text-gray-500 mb-8">
                        The article you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Link href="/blog" className="text-neon-red hover:underline">
                        &lt;- Back to Blog
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }
    const locale = await resolveLocale(searchParams);
    const post = CMS_ENABLED
        ? await getBlogPostBySlug(slug, locale)
        : await getLegacyBlogPostBySlug(slug);

    if (!post && CMS_ENABLED) {
        const redirectInfo = await getBlogPostLocaleBySlug(slug);
        if (redirectInfo) {
            redirect(`/${redirectInfo.locale}/blog/${redirectInfo.slug}`);
        }
    }

    if (!post) {
        return (
            <main className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="container mx-auto px-4 py-32 text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">Post Not Found</h1>
                    <p className="text-gray-500 mb-8">
                        The article you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Link href="/blog" className="text-neon-red hover:underline">
                        &lt;- Back to Blog
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white selection:bg-neon-red selection:text-white">
            <Navbar />
            <BlogPostClient post={post} backHref={`/${locale}/blog`} />
            <Footer />
        </main>
    );
}
