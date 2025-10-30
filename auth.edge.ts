import NextAuth from "next-auth"
import authConfig from "./auth.config"

/**
 * Edge-compatible auth instance for middleware
 * Uses JWT sessions only (no database adapter)
 */
export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    // Ensure JWT session strategy for edge runtime
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        async jwt({ token, user, account, trigger, session }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;
            }
            
            // Store provider information
            if (account) {
                token.provider = account.provider;
            }

            // Handle session updates
            if (trigger === "update" && session) {
                token.name = session.name;
                token.image = session.image;
            }
            
            return token;
        },
        async session({ session, token }) {
            // Add user info to session
            if (token && session.user) {
                session.user.id = token.id as string;
                
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
    },
})
