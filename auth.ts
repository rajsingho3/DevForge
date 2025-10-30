import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "./auth.config"
import type { JWT } from "next-auth/jwt"

/**
 * NextAuth.js v5 Configuration for Next.js 16
 * Optimized for edge runtime and server components
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    callbacks: {
        /**
         * Controls whether a user is allowed to sign in
         * @returns true to allow sign in, false or URL string to deny
         */
        async signIn({ account }) {
            // Only allow OAuth sign-ins
            if (!account?.provider) {
                return false;
            }

            // Allow GitHub and Google sign-ins
            if (account.provider === "google" || account.provider === "github") {
                // You can add additional checks here, e.g.:
                // - Email verification
                // - Domain restrictions
                // - Whitelist/blacklist
                
                return true;
            }
            
            // Deny other providers
            return false;
        },

        /**
         * This callback is called whenever a JWT is created or updated
         * Used to persist user data in the token
         */
        async jwt({ token, user, account, trigger, session }): Promise<JWT> {
            // Initial sign in - add user data to token
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;
            }
            
            // Store provider information on initial sign in
            if (account) {
                token.provider = account.provider;
                token.accessToken = account.access_token;
            }

            // Handle session updates from client
            if (trigger === "update" && session) {
                token.name = session.name;
                token.image = session.image;
            }
            
            return token;
        },

        /**
         * This callback is called whenever a session is checked
         * Used to add JWT data to the session object
         */
        async session({ session, token }) {
            // Add user info to session from JWT token
            if (token && session.user) {
                session.user.id = token.id as string;
                
                // Handle optional fields
                if (token.email) {
                    session.user.email = token.email as string;
                }
                if (token.name) {
                    session.user.name = token.name as string;
                }
                if (token.image) {
                    session.user.image = token.image as string;
                }
            }
            
            return session;
        },

        /**
         * Controls where the user is redirected after sign in
         */
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }
            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) {
                return url;
            }
            // Default redirect
            return baseUrl;
        },
    },
    events: {
        /**
         * Triggered when a user signs in
         */
        async signIn({ user, account, isNewUser }) {
            const provider = account?.provider || "unknown";
            
            if (isNewUser) {
                console.log(`[Auth] New user created: ${user.email} via ${provider}`);
            } else {
                console.log(`[Auth] User signed in: ${user.email} via ${provider}`);
            }
        },

        /**
         * Triggered when a user signs out
         */
        async signOut() {
            console.log(`[Auth] User signed out`);
        },

        /**
         * Triggered when a session is created (e.g., on sign in)
         */
        async createUser({ user }) {
            console.log(`[Auth] User account created: ${user.email}`);
        },

        /**
         * Triggered when accounts are linked
         */
        async linkAccount({ user, account }) {
            console.log(`[Auth] Account linked: ${account.provider} for user ${user.email}`);
        },
    },
    // Enable debug logs in development
    debug: process.env.NODE_ENV === "development",
    secret: process.env.AUTH_SECRET,
    ...authConfig,
})