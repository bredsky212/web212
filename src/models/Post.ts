import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPost extends Document {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    publishedAt: Date;
    readingTime: number;
    views: number;
    likes: number;
    featured: boolean;
    imageUrl?: string;
}

const PostSchema = new Schema<IPost>(
    {
        slug: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true },
        category: { type: String, required: true },
        author: { type: String, default: "Archive Admin" },
        publishedAt: { type: Date, default: Date.now },
        readingTime: { type: Number, default: 5 },
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        featured: { type: Boolean, default: false },
        imageUrl: { type: String },
    },
    { timestamps: true }
);

export const Post: Model<IPost> =
    mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
