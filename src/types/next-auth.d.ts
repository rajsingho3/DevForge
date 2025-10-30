import { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * Extended session interface for Next.js 16
     */
    interface Session {
        user: {
            id: string;
            email?: string | null;
            name?: string | null;
            image?: string | null;
        } & DefaultSession["user"];
    }

    /**
     * Extended user interface
     */
    interface User {
        id: string;
        email?: string | null;
        emailVerified?: Date | null;
    }
}

declare module "next-auth/jwt" {
    /**
     * Extended JWT token interface
     */
    interface JWT {
        id: string;
        provider?: string;
        accessToken?: string;
    }
}
