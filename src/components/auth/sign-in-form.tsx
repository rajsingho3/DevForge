

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome, Github } from "lucide-react";
import { handleGoogleSignIn, handleGithubSignIn } from "@/app/actions/signin";

const SignInFormClient = () => {
  return (
    <Card className="w-full max-w-md shadow-xl border-zinc-700 bg-zinc-900/50 backdrop-blur">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-white">
          Sign In
        </CardTitle>
        <CardDescription className="text-center text-gray-400">
          Choose your preferred sign-in method
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <form action={handleGoogleSignIn}>
          <Button 
            type="submit" 
            variant="outline" 
            className="w-full border-zinc-700 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Chrome className="mr-2 h-4 w-4" />
            <span>Sign in with Google</span>
          </Button>
        </form>
        <form action={handleGithubSignIn}>
          <Button 
            type="submit" 
            variant="outline" 
            className="w-full border-zinc-700 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Github className="mr-2 h-4 w-4" />
            <span>Sign in with GitHub</span>
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 w-full">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-primary transition-colors">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-primary transition-colors">
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInFormClient;

