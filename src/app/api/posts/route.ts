import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Post } from "@/models/Post";

export async function GET() {
    try {
        await dbConnect();
        const posts = await Post.find().sort({ publishedAt: -1 });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();

        if (!body.slug) {
            body.slug = body.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
        }

        if (body.content) {
            const wordCount = body.content.split(/\s+/).length;
            body.readingTime = Math.max(1, Math.ceil(wordCount / 200));
        }

        const post = await Post.create(body);
        return NextResponse.json(post, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json(
                { error: "A post with this slug already exists" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}
