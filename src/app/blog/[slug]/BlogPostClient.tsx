"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import type { BlogPost } from "@/lib/strapi/types";
import { useLanguage } from "@/contexts/LanguageContext";

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

const blogContentClassName =
    "max-w-none text-[var(--text-secondary)] leading-relaxed " +
    "[&_h1]:text-3xl md:[&_h1]:text-4xl [&_h2]:text-2xl md:[&_h2]:text-3xl " +
    "[&_h3]:text-xl md:[&_h3]:text-2xl [&_h4]:text-lg md:[&_h4]:text-xl " +
    "[&_h1]:font-display [&_h2]:font-display [&_h3]:font-display [&_h4]:font-display " +
    "[&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_h4]:font-bold " +
    "[&_h1]:text-[var(--text-primary)] [&_h2]:text-[var(--text-primary)] " +
    "[&_h3]:text-[var(--text-primary)] [&_h4]:text-[var(--text-primary)] " +
    "[&_h1]:mt-10 [&_h1]:mb-6 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:mt-5 [&_h4]:mb-2 " +
    "[&_p]:mb-6 [&_p]:text-base md:[&_p]:text-lg [&_p]:leading-relaxed " +
    "[&_ul]:list-disc [&_ul]:ps-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:ps-6 [&_ol]:mb-6 " +
    "[&_li]:mb-2 [&_li]:text-base md:[&_li]:text-lg [&_strong]:text-[var(--text-primary)] " +
    "[&_a]:text-[var(--accent)] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:opacity-90 " +
    "[&_blockquote]:border-s-2 [&_blockquote]:border-neon-red/40 [&_blockquote]:ps-4 [&_blockquote]:italic " +
    "[&_blockquote]:text-[var(--text-primary)] [&_blockquote]:my-8 " +
    "[&_hr]:border-[var(--border)] [&_hr]:my-8 " +
    "[&_code]:bg-[var(--surface)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded " +
    "[&_pre]:bg-[var(--surface)] [&_pre]:border [&_pre]:border-[var(--border)] [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto " +
    "[&_img]:rounded-lg [&_img]:my-6 [&_img]:max-w-full " +
    "[&_table]:w-full [&_table]:border-collapse [&_th]:text-start [&_th]:border-b [&_th]:border-[var(--border)] [&_th]:py-2 " +
    "[&_td]:border-b [&_td]:border-[var(--border)] [&_td]:py-2";

export default function BlogPostClient({
    post,
    backHref = "/blog",
}: {
    post: BlogPost;
    backHref?: string;
}) {
    const { t, dir } = useLanguage();
    const backArrow = dir === "rtl" ? "→" : "←";
    const formattedDate = formatDate(post.publishedAt);
    const hasBlocks = Array.isArray(post.content);
    const contentString = typeof post.content === "string" ? post.content : "";
    const hasHtmlContent =
        !hasBlocks &&
        /<([a-z][^/\0>\x20\t\r\n\f]*)\b[^>]*>/i.test(contentString);

    return (
        <article className="container mx-auto px-4 py-32 max-w-3xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Link
                    href={backHref}
                    className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-sm inline-flex items-center gap-2 mb-8"
                >
                    {dir === "rtl"
                        ? `${t("blog.backToBlog")} ${backArrow}`
                        : `${backArrow} ${t("blog.backToBlog")}`}
                </Link>

                {post.coverImageUrl && (
                    <div className="mb-10 overflow-hidden rounded relative h-72">
                        <Image
                            src={post.coverImageUrl}
                            alt={post.title}
                            fill
                            sizes="(min-width: 1024px) 768px, 100vw"
                            className="object-cover"
                        />
                    </div>
                )}

                {post.category?.name && (
                    <span className="text-neon-red font-display tracking-widest text-xs mb-4 block uppercase">
                        {post.category.name}
                    </span>
                )}

                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)] mb-12 pb-8 border-b border-[var(--border)]">
                    {post.authorName && (
                        <span>
                            {t("blog.by")} {post.authorName}
                        </span>
                    )}
                    {post.authorName && formattedDate && <span>•</span>}
                    {formattedDate && <span>{formattedDate}</span>}
                </div>

                <div className={blogContentClassName}>
                    {post.excerpt && (
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                            {post.excerpt}
                        </p>
                    )}
                    {hasBlocks ? (
                        <BlocksRenderer content={post.content as BlocksContent} />
                    ) : hasHtmlContent ? (
                        <div
                            dangerouslySetInnerHTML={{ __html: contentString }}
                        />
                    ) : (
                        <div className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                            {contentString}
                        </div>
                    )}
                </div>
            </motion.div>
        </article>
    );
}
