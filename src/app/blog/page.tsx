import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPageClient from "./BlogPageClient";
import { CMS_ENABLED } from "@/lib/strapi/client";
import { getBlogPosts } from "@/lib/strapi/blog";
import { getLegacyBlogPosts } from "@/lib/strapi/legacy";

export default async function BlogPage() {
    const posts = CMS_ENABLED ? await getBlogPosts() : await getLegacyBlogPosts();
    const categories = Array.from(
        new Set(posts.map((post) => post.category?.name).filter(Boolean))
    ) as string[];

    return (
        <main className="min-h-screen bg-black text-white selection:bg-neon-red selection:text-white">
            <Navbar />

            <div className="container mx-auto px-4 py-32 max-w-6xl">
                <BlogPageClient posts={posts} categories={categories} />
            </div>

            <Footer />
        </main>
    );
}