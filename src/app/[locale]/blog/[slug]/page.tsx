import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostClient from "@/app/blog/[slug]/BlogPostClient";
import { CMS_ENABLED } from "@/lib/strapi/client";
import { getBlogPostBySlug, getBlogPostLocaleBySlug } from "@/lib/strapi/blog.server";
import { getLegacyBlogPostBySlug } from "@/lib/strapi/legacy";
import Link from "next/link";
import { DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from "@/lib/i18n/locales";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
    params: { locale: string; slug: string } | Promise<{ locale: string; slug: string }>;
};

const buildBlogAlternates = (slug: string) => ({
    languages: {
        ar: `/ar/blog/${slug}`,
        fr: `/fr/blog/${slug}`,
        en: `/en/blog/${slug}`,
    },
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await Promise.resolve(params);
    const rawLocale =
        typeof resolvedParams.locale === "string"
            ? resolvedParams.locale.toLowerCase()
            : "";
    const locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

    return {
        alternates: {
            canonical: `/${locale}/blog/${resolvedParams.slug}`,
            ...buildBlogAlternates(resolvedParams.slug),
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const resolvedParams = await Promise.resolve(params);
    if (process.env.STRAPI_DEBUG === "1") {
        console.info("[route] blog detail raw params", resolvedParams);
    }
    const rawLocale =
        typeof resolvedParams.locale === "string"
            ? resolvedParams.locale.toLowerCase()
            : "";
    if (!isSupportedLocale(rawLocale)) {
        notFound();
    }
    const locale = rawLocale as SupportedLocale;
    const slug = typeof resolvedParams.slug === "string" ? resolvedParams.slug : "";
    if (!slug) {
        notFound();
    }
    if (process.env.STRAPI_DEBUG === "1") {
        console.info("[route] blog detail params", { locale, slug });
    }

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
            <main className="min-h-screen bg-background text-foreground">
                <Navbar />
                <div className="container mx-auto px-4 py-32 text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">Post Not Found</h1>
                    <p className="text-[var(--text-secondary)] mb-8">
                        The article you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Link href={`/${locale}/blog`} className="text-neon-red hover:underline">
                        &lt;- Back to Blog
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon-red selection:text-white">
            <Navbar />
            <BlogPostClient post={post} backHref={`/${locale}/blog`} />
            <Footer />
        </main>
    );
}
