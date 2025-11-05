"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

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

export const createPlayground = async (data: {
    title: string;
    description?: string;
    template: string;
}) => {
    const user = await currentUser();
    if (!user?.id) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const playground = await db.playground.create({
            data: {
                title: data.title,
                description: data.description || "",
                template: data.template,
                userId: user.id,
            },
        });

        // Create initial starmark entry
        await db.starmark.create({
            data: {
                playgroundId: playground.id,
                isMarked: false,
            },
        });

        revalidatePath("/dashboard");
        return { success: true, data: playground };
    } catch (error) {
        console.error("Error creating playground:", error);
        return { success: false, error: "Failed to create playground" };
    }
};

export const updatePlayground = async (
    id: string,
    data: {
        title?: string;
        description?: string;
    }
) => {
    const user = await currentUser();
    if (!user?.id) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        // Verify ownership
        const playground = await db.playground.findUnique({
            where: { id },
        });

        if (!playground || playground.userId !== user.id) {
            return { success: false, error: "Unauthorized" };
        }

        const updatedPlayground = await db.playground.update({
            where: { id },
            data: {
                ...data,
                updatedAt: new Date(),
            },
        });

        revalidatePath("/dashboard");
        return { success: true, data: updatedPlayground };
    } catch (error) {
        console.error("Error updating playground:", error);
        return { success: false, error: "Failed to update playground" };
    }
};

export const deletePlayground = async (id: string) => {
    const user = await currentUser();
    if (!user?.id) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        // Verify ownership
        const playground = await db.playground.findUnique({
            where: { id },
        });

        if (!playground || playground.userId !== user.id) {
            return { success: false, error: "Unauthorized" };
        }

        await db.playground.delete({
            where: { id },
        });

        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Error deleting playground:", error);
        return { success: false, error: "Failed to delete playground" };
    }
};

export const duplicatePlayground = async (id: string) => {
    const user = await currentUser();
    if (!user?.id) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        // Get original playground
        const original = await db.playground.findUnique({
            where: { id },
        });

        if (!original || original.userId !== user.id) {
            return { success: false, error: "Unauthorized" };
        }

        // Create duplicate
        const duplicate = await db.playground.create({
            data: {
                title: `${original.title} (Copy)`,
                description: original.description,
                template: original.template,
                userId: user.id,
            },
        });

        // Create starmark for duplicate
        await db.starmark.create({
            data: {
                playgroundId: duplicate.id,
                isMarked: false,
            },
        });

        revalidatePath("/dashboard");
        return { success: true, data: duplicate };
    } catch (error) {
        console.error("Error duplicating playground:", error);
        return { success: false, error: "Failed to duplicate playground" };
    }
};

export const toggleStarmark = async (playgroundId: string) => {
    const user = await currentUser();
    if (!user?.id) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        // Verify ownership
        const playground = await db.playground.findUnique({
            where: { id: playgroundId },
            include: { Starmark: true },
        });

        if (!playground || playground.userId !== user.id) {
            return { success: false, error: "Unauthorized" };
        }

        // Get or create starmark
        let starmark = playground.Starmark[0];

        if (!starmark) {
            starmark = await db.starmark.create({
                data: {
                    playgroundId: playgroundId,
                    isMarked: true,
                },
            });
        } else {
            starmark = await db.starmark.update({
                where: { id: starmark.id },
                data: {
                    isMarked: !starmark.isMarked,
                },
            });
        }

        revalidatePath("/dashboard");
        return { success: true, data: starmark };
    } catch (error) {
        console.error("Error toggling starmark:", error);
        return { success: false, error: "Failed to toggle starmark" };
    }
};
