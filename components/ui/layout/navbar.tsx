import Link from "next/link";
import { buttonVariants } from "../button";
import { cn } from "@/lib/utils";
import { SignedOut, SignedIn, UserButton } from "@neondatabase/auth/react";
import { Bell } from "lucide-react"
import { Button } from "../button"
import { NavbarSearch } from "./navbar-search";

export function Navbar(){
    return (
        <header className="sticky top-0 z-50 border-border bg-background/90 backdrop-blur-md">
            {/* logo on lefll isde */}
            <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-4 px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
                
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"aria-hidden>
                        T
                    </span>
                    <span className="text-lg">Threadly</span>
                </Link>
                {/* search bar */}
                <NavbarSearch />
                {/* signup info */}
                {/* SignedIn -- code inside is visible only when the user is logged in */}
                <SignedIn>
                    {/* we will have a create button to ccreate a new query or post */}
                    <Link href="/submit" className={cn(
                    buttonVariants({variant: "outline", size: "sm"}),
                    "hidden sm:inline-flex"
                    )}>
                        Create
                    </Link>
                    {/* ! notificationbutton */}
                    <Link
                      href="/notifications"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "text-muted-foreground"
                      )}
                      aria-label="Notifications"
                    >
                        <Bell className="size-5"/>
                    </Link>
                    <UserButton/>
                </SignedIn>
                {/* SignedOut -- code inside is visible only when the user is not logedin */}
                <SignedOut>

                <div className="ml-auto flex items-center gap-2">
                    <Link href={"/auth/sign-in"} className={cn(buttonVariants({variant: "ghost",size:"default"}))}> Log In </Link>
                    <Link href={"/auth/sign-up"} className={cn(buttonVariants({variant: "default"}))}> Sign Up </Link>
                    {/* sign up means regsiter */}
                </div>
                </SignedOut>
            </div>

        </header>

    )
}
