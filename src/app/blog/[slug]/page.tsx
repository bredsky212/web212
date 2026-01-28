"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface BlogPost {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    publishedAt: string;
    readingTime: number;
    views: number;
    likes: number;
}

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetchPost();
    }, [slug]);

    const fetchPost = async () => {
        try {
            const res = await fetch("/api/posts");
            const posts = await res.json();
            const found = posts.find((p: BlogPost) => p.slug === slug);
            if (found) {
                setPost(found);
            } else {
                setNotFound(true);
            }
        } catch (error) {
            setNotFound(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </main>
        );
    }

    if (notFound || !post) {
        return (
            <main className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="container mx-auto px-4 py-32 text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">Post Not Found</h1>
                    <p className="text-gray-500 mb-8">The article you're looking for doesn't exist.</p>
                    <Link href="/blog" className="text-neon-red hover:underline">
                        ← Back to Blog
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white selection:bg-neon-red selection:text-white">
            <Navbar />

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
                        ← Back to Blog
                    </Link>

                    <span className="text-neon-red font-display tracking-widest text-xs mb-4 block uppercase">
                        {post.category}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-12 pb-8 border-b border-white/10">
                        <span>By {post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post.readingTime} min read</span>
                        <span>•</span>
                        <span>{post.views} views</span>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            {post.excerpt}
                        </p>
                        <div className="text-gray-400 leading-relaxed whitespace-pre-line">
                            {post.content}
                        </div>
                    </div>

                    {/* Like Button */}
                    <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                        <button className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-sm hover:border-neon-red hover:text-neon-red transition-colors">
                            <span>♥</span>
                            <span>{post.likes} Likes</span>
                        </button>
                        <div className="flex gap-4">
                            <button className="text-gray-500 hover:text-white transition-colors">
                                Share
                            </button>
                        </div>
                    </div>
                </motion.div>
            </article>

            <Footer />
        </main>
    );
}
