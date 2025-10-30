"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { ReactNode } from "react";

interface AuthProviderProps {
    children: ReactNode;
    session?: Session | null;
}

/**
 * AuthProvider Component for Next.js 16 + React 19
 * Wraps the app with NextAuth SessionProvider for client-side session management
 * 
 * @param children - React children to wrap
 * @param session - Optional initial session (for SSR optimization)
 */
export function AuthProvider({ children, session }: AuthProviderProps) {
    return (
        <SessionProvider 
            session={session}
            // Refetch session every 5 minutes
            refetchInterval={5 * 60}
            // Refetch session when window regains focus
            refetchOnWindowFocus={true}
        >
            {children}
        </SessionProvider>
    );
}
