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

export default function BlogPostClient({ post }: { post: BlogPost }) {
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
                    href="/blog"
                    className="text-gray-500 hover:text-neon-red transition-colors text-sm inline-flex items-center gap-2 mb-8"
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

                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-12 pb-8 border-b border-white/10">
                    {post.authorName && <span>By {post.authorName}</span>}
                    {post.authorName && formattedDate && <span>•</span>}
                    {formattedDate && <span>{formattedDate}</span>}
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                    {post.excerpt && (
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            {post.excerpt}
                        </p>
                    )}
                    {hasBlocks ? (
                        <BlocksRenderer content={post.content as BlocksContent} />
                    ) : (
                        <div className="text-gray-400 leading-relaxed whitespace-pre-line">
                            {post.content as string}
                        </div>
                    )}
                </div>
            </motion.div>
        </article>
    );
}
