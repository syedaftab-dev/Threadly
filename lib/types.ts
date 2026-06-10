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
export type Comment = {
  id: string;
  postId: string;
  authorId: string;
  parentId: string | null;
  body: string;
  createdAt: string;
};

export type FeedSort = "hot" | "new" | "top";

export type VoteTarget = "post" | "comment";

export interface Post{
    id:string;
    authorId:string;
    title:string;
    body: string;
    tagSlugs: string[];
    createdAt: string;
    commentCount: number;
}