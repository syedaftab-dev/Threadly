import { FeedSortTabs } from "@/components/feed/feed-sort-tabs";
import { getSessionUser } from "@/lib/auth";
import { batchAuthorsForIds, listPostsSorted, listTags } from "@/lib/db/queries";
import Image from "next/image";
import { FeedSort, Tag } from "@/lib/types";
import { PostCard } from "@/components/feed/post-card";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{sort?: string; tag?: string}>
}) {

  const sp = await searchParams; // gets query params
  const sortRaw = sp.sort; // get the sort value
  
  const sort: FeedSort = sortRaw ==="new" || sortRaw === "top" ? sortRaw:"hot";
  const tagFilter = sp.tag?.toLowerCase();
  
  const sessionUser = await getSessionUser()

  
  
  //! we have 3 sorting options hot,new,top which ever user selected we have to pass it to listPostsSorted
  //? and that data from the database also have to be sortedpage
  const rows = await listPostsSorted(sort,tagFilter,sessionUser?.id)

  // get all tags
  const tags = await listTags();

  // make a map for tags with its tag slug
  const tagMap = new Map(tags.map((t)=>[t.slug,t]))

  // get all author ids
  const authorIds = [...new Set(rows.map((r)=>r.post.autherId))]
  // get all authors based on ids
  const authorById = await batchAuthorsForIds(authorIds);
  // check
  if(sessionUser && authorById.has(sessionUser.id)){
    authorById.set(sessionUser.id,sessionUser)
  }

  const cards = rows.map((row)=>{
    const author = authorById.get(row.post.autherId);
    if(!author)return null;

    return <PostCard
    key={row.post.id}
    post={row.post}
    author={author}
    userVote={row.userVote as -1 | 0 | 1}
    score={row.score}
    tagsBySlug={tagMap}
    />

  })

  return (
   <div className="flex gap-8">
    <div className="min-w-0 flex-1">
      {/* header section */}
      <FeedSortTabs current={sort} tag={tagFilter}/>
      {/*  actual posts section */}
      {/*  we need some data */}
      <div className="space-y-4">
        {cards}
        {rows.length ===0 && <p className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted">No Posts match this filter</p>}
      </div>
    </div>
   </div>
  );
}
