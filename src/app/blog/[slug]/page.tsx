import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostClient from "./BlogPostClient";
import BlogPostNotFound from "../BlogPostNotFound";
import { CMS_ENABLED } from "@/lib/strapi/client";
import { getBlogPostBySlug, getBlogPostLocaleBySlug } from "@/lib/strapi/blog.server";
import { getLegacyBlogPostBySlug } from "@/lib/strapi/legacy";
import { getCookieLocale } from "@/lib/i18n/locale";
import { normalizeLocale } from "@/lib/i18n/locales";
import { buildPageMetadata, DEFAULT_OG_IMAGE } from "@/lib/seo";
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
    const canonicalPath = `/${locale}/blog/${slug}`;

    const post = slug
        ? CMS_ENABLED
            ? await getBlogPostBySlug(slug, locale)
            : await getLegacyBlogPostBySlug(slug)
        : null;

    const title = post?.title ?? "Blog Post";
    const description =
        post?.excerpt ??
        "Read this Gen-Z 212 blog article covering movement updates, analysis, and community context.";
    const baseMetadata = buildPageMetadata({
        title,
        description,
        path: canonicalPath,
        locale,
        image: post?.coverImageUrl
            ? {
                url: post.coverImageUrl,
                alt: post.title,
            }
            : DEFAULT_OG_IMAGE,
    });

    return {
        ...baseMetadata,
        alternates: {
            canonical: canonicalPath,
            ...buildBlogAlternates(slug),
        },
    };
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
    const slug = resolveSlug(params, searchParams);
    if (!slug) {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <Navbar />
                <BlogPostNotFound backHref="/blog" />
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
            <main className="min-h-screen bg-background text-foreground">
                <Navbar />
                <BlogPostNotFound backHref="/blog" />
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
