import { NextResponse } from "next/server";
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
