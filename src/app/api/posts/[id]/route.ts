import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Post } from "@/models/Post";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();
        const { id } = await params;
        const post = await Post.findById(id);
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch post" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();

        if (body.content) {
            const wordCount = body.content.split(/\s+/).length;
            body.readingTime = Math.max(1, Math.ceil(wordCount / 200));
        }

        const post = await Post.findByIdAndUpdate(id, body, { new: true });
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update post" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();
        const { id } = await params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Post deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}
