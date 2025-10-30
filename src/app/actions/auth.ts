"use server";

import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

/**
 * Server action result type
 */
type ActionResult = {
    success?: boolean;
    error?: string;
}

/**
 * Sign in with OAuth provider
 * Next.js 16 compatible server action with proper error handling
 * 
 * @param provider - OAuth provider name ("github" or "google")
 * @returns Action result with success status or error message
 */
export async function signInWithProvider(
    provider: "github" | "google"
): Promise<ActionResult | undefined> {
    try {
        await nextAuthSignIn(provider, {
            redirectTo: "/",
        });
        
        return { success: true };
    } catch (error) {
        // Handle Next.js redirect (this is expected behavior, not an error)
        if (isRedirectError(error)) {
            throw error;
        }

        // Handle NextAuth specific errors
        if (error instanceof AuthError) {
            switch (error.type) {
                case "OAuthAccountNotLinked":
                    return { 
                        error: "This email is already associated with a different sign-in method. Please use your original sign-in method." 
                    };
                case "AccessDenied":
                    return { 
                        error: "Access denied. You don't have permission to sign in." 
                    };
                case "OAuthCallbackError":
                    return { 
                        error: "Authentication failed. Please try again." 
                    };
                case "OAuthSignInError":
                    return { 
                        error: "Failed to sign in with provider. Please try again." 
                    };
                default:
                    return { 
                        error: "An unexpected error occurred. Please try again." 
                    };
            }
        }

        // Log unexpected errors in development
        if (process.env.NODE_ENV === "development") {
            console.error("[Auth] Unexpected sign-in error:", error);
        }

        return { 
            error: "Something went wrong during sign in. Please try again." 
        };
    }
}

/**
 * Sign out the current user
 * Next.js 16 compatible server action with proper error handling
 * 
 * @returns Action result with success status or error message
 */
export async function signOutAction(): Promise<ActionResult | undefined> {
    try {
        await nextAuthSignOut({
            redirectTo: "/auth/signin",
        });
        
        return { success: true };
    } catch (error) {
        // Handle Next.js redirect (this is expected behavior, not an error)
        if (isRedirectError(error)) {
            throw error;
        }

        // Log unexpected errors
        if (process.env.NODE_ENV === "development") {
            console.error("[Auth] Error signing out:", error);
        }

        return { 
            error: "Failed to sign out. Please try again." 
        };
    }
}

/**
 * Get the current session (server-side)
 * This is a helper to fetch session in server components
 */
export async function getCurrentSession() {
    const { auth } = await import("@/auth");
    return await auth();
}
