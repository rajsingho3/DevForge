"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Spinner } from "@/components/ui/spinner";

interface ProtectedRouteProps {
    children: ReactNode;
    redirectTo?: string;
    fallback?: ReactNode;
}

/**
 * ProtectedRoute Component for Next.js 16 + React 19
 * Protects routes by checking authentication status
 * Automatically redirects unauthenticated users to sign-in page
 * 
 * @param children - Content to render when authenticated
 * @param redirectTo - URL to redirect to when not authenticated (default: "/auth/signin")
 * @param fallback - Optional custom loading component
 */
export function ProtectedRoute({ 
    children, 
    redirectTo = "/auth/signin",
    fallback
}: ProtectedRouteProps) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // Skip redirect during loading state
        if (status === "loading") return;
        
        // Redirect to sign-in if not authenticated
        if (!session) {
            // Preserve current URL for post-login redirect
            const currentUrl = window.location.pathname + window.location.search;
            const signInUrl = currentUrl !== "/" 
                ? `${redirectTo}?callbackUrl=${encodeURIComponent(currentUrl)}`
                : redirectTo;
                
            router.push(signInUrl);
        }
    }, [session, status, router, redirectTo]);

    // Show loading state
    if (status === "loading") {
        return fallback || (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner className="h-8 w-8" />
            </div>
        );
    }

    // Don't render content if not authenticated
    if (!session) {
        return null;
    }

    // Render protected content
    return <>{children}</>;
}
