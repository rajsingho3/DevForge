"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";

function AuthErrorContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    const getErrorMessage = (error: string | null) => {
        switch (error) {
            case "Configuration":
                return "There is a problem with the server configuration.";
            case "AccessDenied":
                return "Access denied. You do not have permission to sign in.";
            case "Verification":
                return "The verification token has expired or has already been used.";
            case "OAuthSignin":
                return "Error in constructing an authorization URL.";
            case "OAuthCallback":
                return "Error in handling the response from an OAuth provider.";
            case "OAuthCreateAccount":
                return "Could not create OAuth provider user in the database.";
            case "EmailCreateAccount":
                return "Could not create email provider user in the database.";
            case "Callback":
                return "Error in the OAuth callback handler route.";
            case "OAuthAccountNotLinked":
                return "Email already associated with another account. Please sign in with the original provider.";
            case "SessionRequired":
                return "Please sign in to access this page.";
            default:
                return "An unexpected error occurred. Please try again.";
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-3">
                            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
                    <CardDescription>
                        {getErrorMessage(error)}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button asChild className="w-full">
                        <Link href="/auth/signin">
                            Try Again
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/">
                            Go Home
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default function AuthErrorPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="rounded-full bg-gray-100 dark:bg-gray-900/20 p-3">
                                <div className="h-6 w-6 bg-gray-400 rounded animate-pulse" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold">Loading...</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        }>
            <AuthErrorContent />
        </Suspense>
    );
}
