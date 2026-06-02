export interface User {
    id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
    description?: string;
    postCount?: number;
}
