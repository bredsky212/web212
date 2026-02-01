"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import type { BlogPost } from "@/lib/strapi/types";

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

export default function BlogPostClient({
    post,
    backHref = "/blog",
}: {
    post: BlogPost;
    backHref?: string;
}) {
    const formattedDate = formatDate(post.publishedAt);
    const hasBlocks = Array.isArray(post.content);

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
                    &lt;- Back to Blog
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
                    {post.authorName && <span>By {post.authorName}</span>}
                    {post.authorName && formattedDate && <span>•</span>}
                    {formattedDate && <span>{formattedDate}</span>}
                </div>

                <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed prose-p:mb-6 prose-li:text-[var(--text-secondary)] prose-strong:text-[var(--text-primary)] prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-h1:text-4xl md:prose-h1:text-5xl prose-h2:text-2xl md:prose-h2:text-3xl prose-h3:text-xl md:prose-h3:text-2xl prose-h4:text-lg md:prose-h4:text-xl prose-h1:mt-10 prose-h1:mb-6 prose-h2:mt-8 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3 prose-h4:mt-5 prose-h4:mb-2">
                    {post.excerpt && (
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                            {post.excerpt}
                        </p>
                    )}
                    {hasBlocks ? (
                        <BlocksRenderer content={post.content as BlocksContent} />
                    ) : (
                        <div className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                            {post.content as string}
                        </div>
                    )}
                </div>
            </motion.div>
        </article>
    );
}
