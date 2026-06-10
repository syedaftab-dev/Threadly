import { FeedSort, Post, Tag, User } from "../types";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../prisma";
import { PostModel } from "../generated/prisma/models";


export async function batchAuthorsForIds(
  authorIds: string[],
): Promise<Map<string, User>> {
  const unique = [...new Set(authorIds)];
  if (unique.length === 0) return new Map();

  const rows = await prisma.userProfiles.findMany({
    where: { id: { in: unique } },
  });

  const result = new Map<string, User>();

  for (const row of rows) {
    result.set(row.id, {
        id: row.id, 
        username: row.username,
        displayName: row.username,
    });
  }

  for (const id of unique) {
    if (!result.has(id)) {
      const fallbackName = `user_${id.slice(0, 6)}`;
      result.set(id, { id, username: fallbackName, displayName: fallbackName });
    }
  }

  return result;
}


export type FeedPostRow = {
    post: Post;
    score: number;
    userVote: -1 | 0 | 1;
}

// function to get post based on the tags

export async function listPostsSorted(sort: FeedSort,tagFilter:string | undefined,userId:string | undefined){



    const where = tagFilter ? {
        postTags:{
            some:{
                tagSlug: tagFilter.toLowerCase()
            }
        }
    } : undefined;
    // get post based on tagss
    const postRows = await prisma.post.findMany({
       where,
       orderBy: {createdAt: "desc"},
       take: 50,
    })

    // get all post id
    const ids = postRows.map((p) => p.id)
    // if no post available
    if(ids.length === 0 )return [];

    // else
    
        const [tagMap] = await Promise.all([
            tagsForPosts(ids)
        ])

        const mapped = postRows.map((row)=>{
            const slugs = tagMap.get(row.id) ?? [];
            return {
                post: mapPostRow(row,slugs, 65),
                voteScore: 2,
                created: row.createdAt.getTime(),
                userVote: 1,
            }

        })

        if (sort === "new"){
            mapped.sort((a,b)=>(b.created - a.created));
        }else if(sort === 'top'){
            mapped.sort(
                (a,b) =>
                    b.voteScore - a.voteScore || b.post.commentCount - a.post.commentCount || b.created - a.created
            )
        }else{
            mapped.sort((a,b)=>{
                const hotB = b.voteScore+2*b.post.commentCount
                const hotA = a.voteScore+2*a.post.commentCount
                return hotB - hotA || b.created - a.created;
            })
        }
        return mapped.map((x)=>({
            post:x.post,
            score:x.voteScore,
            userVote:x.userVote
        }))
}


async function tagsForPosts(postIds: string[]): Promise<Map<string, string[]>> {
    const m = new Map<string, string[]>();
    if (postIds.length === 0) return m;
    const rows = await prisma.postTag.findMany({
        where: { postId: { in: postIds } },
    });
    for (const pid of postIds) m.set(pid, []);
    for (const r of rows) {
        const list = m.get(r.postId) ?? [];
        list.push(r.tagSlug);
        m.set(r.postId, list);
    }
    return m;
}

function mapPostRow(
  row: PostModel,
  tagSlugs: string[],
  commentCount: number,
): Post {
  return {
    id: row.id,
    autherId: row.authorId,
    title: row.title,
    body: row.body,
    tagSlugs,
    createdAt: row.createdAt.toISOString(),
    commentCount,
  };
}

export async function listTags(): Promise<Tag[]> {
  const rows = await prisma.tag.findMany({ orderBy: { slug: "asc" } });
  return rows.map((t) => ({
    slug: t.slug,
    label: t.label,
    hashColor: t.hashColor,
  }));
}