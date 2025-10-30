import { auth } from "@/auth";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="border-b bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              VibeStudio
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {session.user.name}
                </span>
                <UserButton user={session.user} />
              </>
            ) : (
              <Button asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold tracking-tight">
            Welcome to VibeStudio
          </h2>
          <p className="text-xl text-muted-foreground">
            Your creative studio platform for building amazing projects
          </p>

          {session?.user ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-4">
              <h3 className="text-2xl font-semibold">You&apos;re signed in! 🎉</h3>
              <div className="space-y-2 text-left max-w-md mx-auto">
                <p className="text-sm text-muted-foreground">
                  <strong>Email:</strong> {session.user.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Name:</strong> {session.user.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>User ID:</strong> {session.user.id}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Sign in to get started with your creative journey
              </p>
              <Button size="lg" asChild>
                <Link href="/auth/signin">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
