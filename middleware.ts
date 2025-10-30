import { auth } from "./auth.edge";
import { NextResponse } from "next/server";

/**
 * Next.js 16 Middleware with Edge Runtime
 * Uses edge-compatible auth without Prisma adapter
 */
export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Define route patterns
    const isAuthRoute = nextUrl.pathname.startsWith("/auth");
    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isPublicRoute = nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/public");

    // Allow API auth routes (NextAuth.js endpoints)
    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    // Redirect logged-in users away from auth pages
    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/", nextUrl.origin));
    }

    // Redirect non-logged-in users to sign-in (except for public routes)
    if (!isLoggedIn && !isAuthRoute && !isPublicRoute) {
        const callbackUrl = nextUrl.pathname + nextUrl.search;
        const signInUrl = new URL("/auth/signin", nextUrl.origin);
        
        if (callbackUrl !== "/") {
            signInUrl.searchParams.set("callbackUrl", callbackUrl);
        }
        
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
});

/**
 * Matcher configuration for middleware
 * Excludes static files, images, and Next.js internal routes
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - Files with extensions (e.g., .png, .jpg, .svg, .css, .js)
         */
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)",
    ],
};
