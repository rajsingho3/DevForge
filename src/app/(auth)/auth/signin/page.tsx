"use client";
import SignInFormClient from "@/components/auth/sign-in-form"
import Image from "next/image"
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";
import Link from "next/link";

export default function SignIn(){
    return(
        <div className="flex flex-col items-center justify-center gap-8 w-full px-4 py-12">
            {/* Logo/Brand at top */}
            <Link href="/" className="flex items-center gap-3 group mb-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform text-xl">
                    CF
                </div>
                <span className="font-semibold text-2xl text-slate-100">CodeForge</span>
            </Link>

            <div className="flex flex-col items-center gap-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-20"></div>
                    <Image
                        src="/signin.svg"
                        alt="Sign In"
                        width={280}
                        height={280}
                        className="relative dark:opacity-90"
                        priority
                    />
                </motion.div>
                
                <div className="text-center space-y-3">
                    <motion.div 
                        className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <LayoutTextFlip
                            text="Welcome to "
                            words={["CodeForge", "Your Workspace", "Innovation"]}
                            duration={3000}
                        />
                    </motion.div>
                    <motion.p 
                        className="text-slate-400 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        Sign in to continue to your account
                    </motion.p>
                </div>
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="w-full"
            >
                <SignInFormClient/>
            </motion.div>

            <motion.p 
                className="text-sm text-slate-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                Don&apos;t have an account?{" "}
                <Link href="/" className="text-purple-400 hover:text-pink-400 transition-colors font-medium">
                    Learn more
                </Link>
            </motion.p>
        </div>
    )
}