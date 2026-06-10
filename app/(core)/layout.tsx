//! this files contains the core layout of the application, which is used in all pages
import { LeftSidebar } from "@/components/ui/layout/left-sidebar";
import { Navbar } from "@/components/ui/layout/navbar";
import { getSessionUser } from "@/lib/auth";
import { tagPostCounts } from "@/lib/db/queries";

export default async function CoreGroupLayout({
    children
}:{
    children: React.ReactNode;
}){
    const user = await getSessionUser();
    const tagsWithCounts = await tagPostCounts();

    return (
        <>
        <Navbar />
        <div className="flex mx-auto max-w-300 gap-8 px-4 pb-16 pt-2">
            <LeftSidebar showCta={!user} tagsWithCounts={tagsWithCounts}/>
            <div className = "min-w-0 flex-1">{children}</div>
        </div>
        </>
    )
}