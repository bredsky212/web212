"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { categories } from "@/lib/data";
import { useState, useEffect } from "react";

interface BlogPost {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    readingTime: number;
    views: number;
    likes: number;
    featured: boolean;
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
        >
            <Link href={`/blog/${post.slug}`}>
                <div className="bg-gradient-to-br from-gray-900/60 to-black border border-white/10 rounded-lg p-6 h-full hover:border-neon-red/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,0,0,0.1)]">
                    {post.featured && (
                        <span className="inline-block px-2 py-1 text-xs bg-neon-red/20 text-neon-red border border-neon-red/30 rounded mb-4 uppercase tracking-widest font-display">
                            Featured
                        </span>
                    )}
                    <span className="text-xs text-gray-500 uppercase tracking-widest block mb-2">
                        {post.category}
                    </span>
                    <h3 className="text-xl font-bold mb-3 font-display group-hover:text-neon-red transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.readingTime} min read</span>
                        <div className="flex gap-4">
                            <span>{post.views} views</span>
                            <span>{post.likes} ♥</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/posts");
            const data = await res.json();
            setPosts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch posts");
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredPosts = posts.filter((post) => {
        const matchesCategory = !activeCategory || post.category === activeCategory;
        const matchesSearch =
            !searchQuery ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPosts = posts.filter((p) => p.featured);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-neon-red selection:text-white">
            <Navbar />

            <div className="container mx-auto px-4 py-32 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                        THE <span className="text-neon-red">BLOG</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Updates, analysis, and voices from the GenZ 212 movement.
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
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-80 px-4 py-3 bg-gray-900 border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-red transition-colors"
                        />
                        <div className="flex flex-wrap gap-2 justify-center">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`px-4 py-2 text-xs uppercase tracking-widest border rounded-sm transition-all ${!activeCategory
                                        ? "bg-neon-red text-white border-neon-red"
                                        : "border-white/20 text-gray-400 hover:border-white hover:text-white"
                                    }`}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 text-xs uppercase tracking-widest border rounded-sm transition-all ${activeCategory === cat
                                            ? "bg-neon-red text-white border-neon-red"
                                            : "border-white/20 text-gray-400 hover:border-white hover:text-white"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading...</div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-24 border border-white/10 rounded-lg bg-gray-900/50">
                        <p className="text-gray-400 text-lg mb-2">No articles yet</p>
                        <p className="text-gray-600 text-sm">
                            Posts will appear here once added via the admin panel.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Featured Section */}
                        {!activeCategory && !searchQuery && featuredPosts.length > 0 && (
                            <section className="mb-16">
                                <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-6 font-display">
                                    Featured
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {featuredPosts.map((post, i) => (
                                        <BlogCard key={post._id} post={post} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* All Posts */}
                        <section>
                            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-6 font-display">
                                {activeCategory || "All Posts"}
                            </h2>
                            {filteredPosts.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredPosts.map((post, i) => (
                                        <BlogCard key={post._id} post={post} index={i} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-12">
                                    No articles found matching your criteria.
                                </p>
                            )}
                        </section>
                    </>
                )}
            </div>

            <Footer />
        </main>
    );
}
