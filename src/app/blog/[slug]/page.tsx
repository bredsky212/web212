import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostClient from "./BlogPostClient";
import { CMS_ENABLED } from "@/lib/strapi/client";
import { getBlogPostBySlug } from "@/lib/strapi/blog";
import { getLegacyBlogPostBySlug } from "@/lib/strapi/legacy";
import Link from "next/link";

type PageProps = {
    params: { slug: string };
};

export default async function BlogPostPage({ params }: PageProps) {
    const post = CMS_ENABLED
        ? await getBlogPostBySlug(params.slug)
        : await getLegacyBlogPostBySlug(params.slug);

    if (!post) {
        return (
            <main className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="container mx-auto px-4 py-32 text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">Post Not Found</h1>
                    <p className="text-gray-500 mb-8">
                        The article you're looking for doesn't exist.
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
            <BlogPostClient post={post} />
            <Footer />
        </main>
    );
}