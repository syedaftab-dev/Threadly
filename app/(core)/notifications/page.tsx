import { getNotifications } from "@/lib/db/queries";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserAvatar } from "@neondatabase/auth/react";
import { formatRelativeTime } from "@/lib/format";
import Link from "next/link";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function NotificationsPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  const notifications = await getNotifications(user.id);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            Manage your latest updates and replies
          </p>
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-lg">Recent Updates</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border p-0">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                <MessageSquare className="size-6 text-muted-foreground" />
              </div>
              <p className="font-medium">All caught up!</p>
              <p className="text-xs">You don't have any notifications yet.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className="flex items-start gap-4 p-4 transition-colors hover:bg-muted/30"
              >
                <UserAvatar user={notif.actor} size="sm" className="mt-1" />
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">u/{notif.actor.username}</span>{" "}
                    {notif.type === "reply" ? "replied to your comment" : "commented"} on{" "}
                    <Link
                      href={`/post/${notif.post.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {notif.post.title}
                    </Link>
                  </p>
                  <blockquote className="border-l-2 border-muted bg-muted/20 px-3 py-1.5 text-xs text-muted-foreground italic rounded-r-md">
                    {notif.bodyPreview}
                  </blockquote>
                  <span className="inline-block text-[11px] text-muted-foreground">
                    {formatRelativeTime(notif.createdAt)}
                  </span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
