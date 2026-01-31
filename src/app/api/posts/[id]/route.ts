import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Post } from "@/models/Post";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: RouteParams) {
    try {
        await dbConnect();
        const { id } = await params;
        const post = await Post.findById(id);
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        return NextResponse.json(post);
    } catch (error) {
        console.error("Failed to fetch post", error);
        return NextResponse.json(
            { error: "Failed to fetch post" },
            { status: 500 }
        );
    }
}
