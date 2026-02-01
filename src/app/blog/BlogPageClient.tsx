"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { BlogPostPreview } from "@/lib/strapi/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogPageClientProps {
    posts: BlogPostPreview[];
    categories: string[];
    basePath?: string;
}

function formatDate(value?: string | null) {
    if (!value) {
        return null;
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return null;
    }
    return date.toLocaleDateString();
}

function BlogCard({
    post,
    index,
    basePath,
    featuredLabel,
}: {
    post: BlogPostPreview;
    index: number;
    basePath: string;
    featuredLabel: string;
}) {
    const formattedDate = formatDate(post.publishedAt);

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
        >
            <Link href={`${basePath}/${post.slug}`}>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 h-full hover:border-[var(--accent)]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,0,0,0.1)]">
                    {post.coverImageUrl && (
                        <div className="mb-4 overflow-hidden rounded relative h-40">
                            <Image
                                src={post.coverImageUrl}
                                alt={post.title}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                    )}
                    {post.featured && (
                        <span className="inline-block px-2 py-1 text-xs bg-neon-red/20 text-neon-red border border-neon-red/30 rounded mb-4 uppercase tracking-widest font-display">
                            {featuredLabel}
                        </span>
                    )}
                    {post.category?.name && (
                        <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest block mb-2">
                            {post.category.name}
                        </span>
                    )}
                    <h3 className="text-xl font-bold mb-3 font-display group-hover:text-neon-red transition-colors">
                        {post.title}
                    </h3>
                    {post.excerpt && (
                        <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                        </p>
                    )}
                    {formattedDate && (
                        <div className="text-xs text-[var(--text-muted)]">{formattedDate}</div>
                    )}
                </div>
            </Link>
        </motion.article>
    );
}

export default function BlogPageClient({
    posts,
    categories,
    basePath = "/blog",
}: BlogPageClientProps) {
    const { t } = useLanguage();
    const titlePrimary = t("blog.title.primary").trim();
    const titleAccent = t("blog.title.accent").trim();
    const featuredLabel = t("blog.featured");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            if (!post.slug) {
                return false;
            }
            const matchesCategory =
                !activeCategory || post.category?.name === activeCategory;
            const title = post.title || "";
            const excerpt = post.excerpt || "";
            const matchesSearch =
                !searchQuery ||
                title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [posts, activeCategory, searchQuery]);

    const featuredPosts = useMemo(
        () => posts.filter((post) => post.featured && post.slug),
        [posts]
    );

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-[var(--text-primary)]">
                    {titlePrimary ? `${titlePrimary} ` : ""}
                    {titleAccent ? <span className="text-neon-red">{titleAccent}</span> : null}
                </h1>
                <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                    {t("blog.subtitle")}
                </p>
            </motion.div>

            {/* Search & Filter */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
            >
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <input
                        type="text"
                        placeholder={t("blog.searchPlaceholder")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-80 px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                    <div className="flex flex-wrap gap-2 justify-center">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`px-4 py-2 text-xs uppercase tracking-widest border rounded-sm transition-all ${
                                !activeCategory
                                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                                    : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]/40 hover:text-[var(--text-primary)]"
                            }`}
                        >
                            {t("blog.filter.all")}
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 text-xs uppercase tracking-widest border rounded-sm transition-all ${
                                    activeCategory === cat
                                        ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                                        : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]/40 hover:text-[var(--text-primary)]"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {posts.length === 0 ? (
                <div className="text-center py-24 border border-[var(--border)] rounded-lg bg-[var(--surface)]">
                    <p className="text-[var(--text-secondary)] text-lg mb-2">
                        {t("blog.empty.title")}
                    </p>
                    <p className="text-[var(--text-muted)] text-sm">
                        {t("blog.empty.subtitle")}
                    </p>
                </div>
            ) : (
                <>
                    {/* Featured Section */}
                    {!activeCategory && !searchQuery && featuredPosts.length > 0 && (
                        <section className="mb-16">
                            <h2 className="text-sm uppercase tracking-widest text-[var(--text-muted)] mb-6 font-display">
                                {featuredLabel}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {featuredPosts.map((post, i) => (
                                    <BlogCard
                                        key={post.id}
                                        post={post}
                                        index={i}
                                        basePath={basePath}
                                        featuredLabel={featuredLabel}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* All Posts */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-[var(--text-muted)] mb-6 font-display">
                            {activeCategory || t("blog.allPosts")}
                        </h2>
                        {filteredPosts.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPosts.map((post, i) => (
                                    <BlogCard
                                        key={post.id}
                                        post={post}
                                        index={i}
                                        basePath={basePath}
                                        featuredLabel={featuredLabel}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-[var(--text-muted)] text-center py-12">
                                {t("blog.empty.search")}
                            </p>
                        )}
                    </section>
                </>
            )}
        </>
    );
}
