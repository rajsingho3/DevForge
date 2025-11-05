"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

// Helper function to get the current user
async function currentUser() {
    const session = await auth();
    return session?.user;
}

export const getAllplayground = async () => {
    const user = await currentUser();
    if (!user?.id) {
        return [];
    }
    
    try {
        const playground = await db.playground.findMany({
            where: {
                userId: user.id,
            },
            include: {
                user: true,
                Starmark: true,
            },
            orderBy: {
                updatedAt: 'desc',
            }
        });
        return playground;
        
    } catch (error) {
        console.log("Error fetching playground:", error);
        return [];
    }
};
