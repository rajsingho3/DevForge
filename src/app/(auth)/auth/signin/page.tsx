"use client";
import SignInFormClient from "@/components/auth/sign-in-form"
import Image from "next/image"
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";

export default function SignIn(){
    return(
        <div className="flex flex-col items-center justify-center gap-8 w-full px-4">
            <div className="flex flex-col items-center gap-4">
                <Image
                    src="/signin.svg"
                    alt="Sign In"
                    width={300}
                    height={300}
                    className="dark:opacity-90"
                    priority
                />
                <div className="text-center space-y-2">
                    <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
                        <LayoutTextFlip
                            text="Welcome to "
                            words={[ "CodeForge", "Your Workspace", "Innovation"]}
                            duration={3000}
                        />
                    </motion.div>
                    <p className="text-gray-400">Sign in to continue to your account</p>
                </div>
            </div>
            <SignInFormClient/>
        </div>
    )
}