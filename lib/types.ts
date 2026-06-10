export interface User {
    id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
}

export interface Tag {
    slug: string;
    label: string;
    hashColor: string;
    description?: string;
    postCount?: number;
}
export type FeedSort = "hot" | "new" | "top";

export interface Post{
    id:string;
    autherId:string;
    title:string;
    body: string;
    tagSlugs: string[];
    createdAt: string;
    commentCount: number;
}