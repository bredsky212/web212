export interface BlogPost {
    id: string;
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
    featured: boolean;
    imageUrl?: string;
}

export interface TimelineEvent {
    id: string;
    year: string;
    era: string;
    title: string;
    description: string;
    icon?: string;
    imageUrl?: string;
}

export const categories = [
    "Movement News",
    "Healthcare",
    "Education",
    "Society",
    "Youth Voices",
];

export const samplePosts: BlogPost[] = [];
