

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
import { Chrome, Github, Sparkles } from "lucide-react";
import { handleGoogleSignIn, handleGithubSignIn } from "@/app/actions/signin";

const SignInFormClient = () => {
  return (
    <Card className="w-full max-w-md shadow-2xl border-purple-800/50 bg-purple-900/20 backdrop-blur-xl relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
      
      <CardHeader className="space-y-2 relative z-10">
        <div className="flex items-center justify-center mb-2">
          <div className="p-3 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold text-center text-slate-100">
          Sign In
        </CardTitle>
        <CardDescription className="text-center text-slate-400 text-base">
          Choose your preferred sign-in method
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4 relative z-10">
        <form action={handleGoogleSignIn}>
          <Button 
            type="submit" 
            variant="outline" 
            className="w-full border-purple-700/50 bg-purple-800/30 hover:bg-purple-700/50 hover:border-purple-500/50 text-slate-100 transition-all duration-300 h-12 text-base font-medium shadow-lg hover:shadow-purple-500/25"
          >
            <Chrome className="mr-3 h-5 w-5" />
            <span>Continue with Google</span>
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-purple-700/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-purple-900/40 px-2 text-slate-500">Or</span>
          </div>
        </div>

        <form action={handleGithubSignIn}>
          <Button 
            type="submit" 
            variant="outline" 
            className="w-full border-purple-700/50 bg-purple-800/30 hover:bg-purple-700/50 hover:border-purple-500/50 text-slate-100 transition-all duration-300 h-12 text-base font-medium shadow-lg hover:shadow-purple-500/25"
          >
            <Github className="mr-3 h-5 w-5" />
            <span>Continue with GitHub</span>
          </Button>
        </form>
      </CardContent>

      <CardFooter className="relative z-10">
        <p className="text-xs text-center text-slate-500 w-full leading-relaxed">
          By signing in, you agree to our{" "}
          <a href="#" className="text-purple-400 hover:text-pink-400 underline transition-colors">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-purple-400 hover:text-pink-400 underline transition-colors">
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInFormClient;

