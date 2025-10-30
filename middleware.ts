import NextAuth from "next-auth";
import { Default_login_redirect, apiAuthPrefix,publicRoutes,authRoutes } from "./route";
import authConfig from "./auth.config";

const {auth} = NextAuth(authConfig);

export default auth ((req)=>{
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return null
    }

    
    if(isAuthRoute && isLoggedIn){
        return Response.redirect(new URL(Default_login_redirect, nextUrl));
    }
    return null;

    if(!isLoggedIn && !isPublicRoute ){
        return Response.redirect(new URL("/auth/signin", nextUrl));
    }

})

export const config = {
// copied from clerk
matcher: ["/(( ?!. +\.[\w]+$|_next) .* )", "/", "/(api|trpc)( .* )"],
};
