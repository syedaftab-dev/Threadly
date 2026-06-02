//! function to creates user to Database

import { prisma } from "../prisma";
import type { User } from "../types";


//* Generate random username  for user

function generateUsername(name: string): string {

    // Clean name and convert it into a username format
    const base =
        name
            .trim()                            // Remove extra spaces
            .toLowerCase()                     // Convert to lowercase
            .replace(/[^a-z0-9]+/g, "_")       // Replace special chars/spaces with "_"
            .replace(/^_|_$/g, "")             // Remove leading/trailing "_"
            .slice(0, 20)                      // Limit length to 20 chars
        || "user";                         // Fallback if empty

    // Generate a random 6-character suffix
    const suffix = Math.random()
        .toString(36)
        .substring(2, 8);

    // Combine base username and suffix
    return `${base}_${suffix}`;
}

//! function to create user profile in database if not exist
// ? neon is just a variable name for a user
export async function ensureUserProfile(neon: {
    id: string,
    name: string,
    image?: string | null
}): Promise<User> {

    const existing = await prisma.userProfiles.findUnique({
        where: { id: neon.id },
    })

    // if user exist just return it
    if (existing) {
        return {
            id: existing.id,
            username: existing.username,
            displayName: neon.name,
            avatarUrl: neon.image ?? undefined
        }
    }
    // else create user in UserPrfile table
    const row = await prisma.userProfiles.create({
        data: {
            id: neon.id,
            username: generateUsername(neon.name),
        }
    });
    return {
        id: row.id,
        username: row.username,
        displayName: neon.name,
        avatarUrl: neon.image ?? undefined
    }
}