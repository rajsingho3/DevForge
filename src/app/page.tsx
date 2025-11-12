"use client";

import React from "react";
import { motion } from "motion/react";
import { Code, Users, Cloud, Zap, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface TestimonialProps {
  name: string;
  role: string;
  quote: string;
}

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1a0b2e] to-[#0d0221] text-slate-100">
      {/* NAV */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-lg bg-[#1a0b2e]/80 border-b border-purple-800/30">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform text-lg">
            DF
          </div>
          <span className="font-semibold text-lg">DevForge</span>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link className="text-sm hover:text-purple-400 transition-colors" href="#features">Features</Link>
          <Link className="text-sm hover:text-purple-400 transition-colors" href="#demo">Demo</Link>
          <Link className="text-sm hover:text-purple-400 transition-colors" href="#pricing">Pricing</Link>
          {!isLoading && (
            isAuthenticated ? (
              <Link href="/dashboard" className="ml-4 px-5 py-2.5 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:scale-105 transition-all">
                Dashboard
              </Link>
            ) : (
              <Link href="/auth/signin" className="ml-4 px-5 py-2.5 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:scale-105 transition-all">
                Start Free
              </Link>
            )
          )}
        </div>
        {/* Mobile Navigation */}
        <div className="md:hidden">
          {!isLoading && (
            isAuthenticated ? (
              <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-lg hover:scale-105 transition-all">
                Dashboard
              </Link>
            ) : (
              <Link href="/auth/signin" className="px-4 py-2 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-lg hover:scale-105 transition-all">
                Start Free
              </Link>
            )
          )}
        </div>
      </nav>

      {/* HERO */}
      <header className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12 py-16 lg:py-24">
        <div className="w-full lg:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Build. Collaborate. Ship — Faster with{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
                DevForge
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-slate-300 max-w-xl leading-relaxed"
          >
            An all-in-one developer workspace for real-time collaboration, secure projects, and one-click deployments. Designed for teams that move fast.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.35 }}
          >
            {!isLoading && (
              isAuthenticated ? (
                <Link 
                  href="/dashboard" 
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-xl hover:shadow-purple-500/25 hover:scale-105 transition-all"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link 
                  href="/auth/signin" 
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-xl hover:shadow-purple-500/25 hover:scale-105 transition-all"
                >
                  Start Free
                </Link>
              )
            )}
           
          </motion.div>

          
        </div>

        <motion.div 
          className="w-full lg:w-1/2 flex justify-center" 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl blur-3xl opacity-20" />
            <div className="relative rounded-2xl p-1 bg-linear-to-br from-purple-600/30 via-transparent to-pink-400/20 shadow-2xl">
              <div className="bg-[#0d0221] rounded-xl overflow-hidden backdrop-blur-sm">
                {/* Mock IDE */}
                <div className="flex items-center gap-2 px-4 py-3 bg-purple-900/30 border-b border-purple-800/30">
                  <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors cursor-pointer" />
                  <div className="ml-auto text-xs text-slate-400 font-mono">DevForge • project/app.tsx</div>
                </div>
                <pre className="p-8 font-mono text-sm leading-7 text-slate-200 bg-[#0d0221]">
{`<span className="text-purple-400">export</span> <span className="text-blue-400">async function</span> <span className="text-yellow-400">build</span>() {
  <span className="text-slate-400">// Real-time collaboration</span>
  <span className="text-blue-400">console</span>.<span className="text-yellow-400">log</span>(<span className="text-green-400">'✨ DevForge started'</span>)
  
  <span className="text-purple-400">await</span> <span className="text-yellow-400">deploy</span>({
    <span className="text-blue-300">preview</span>: <span className="text-orange-400">true</span>
  })
}`}
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Core Features</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to build, collaborate, and ship amazing products
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Code size={24} />} 
            title="Collaborative Coding" 
            desc="Real-time editing, pair programming, and code review workflows built-in." 
          />
          <FeatureCard 
            icon={<Cloud size={24} />} 
            title="One-click Deploys" 
            desc="Connect to your cloud and ship from the same UI. Preview environments included." 
          />
          <FeatureCard 
            icon={<Users size={24} />} 
            title="Team Workspaces" 
            desc="Organize projects, permissions, and CI pipelines for distributed teams." 
          />
          <FeatureCard 
            icon={<Zap size={24} />} 
            title="Extensible Integrations" 
            desc="Plugins and APIs for GitHub, Slack, SSO, CI tools and more." 
          />
          <FeatureCard 
            icon={<CheckCircle size={24} />} 
            title="Secure by Default" 
            desc="Isolated sandboxes, audit logs, and granular role-based access control." 
          />
          <FeatureCard 
            icon={<Sparkles size={24} />} 
            title="Analytics & Insights" 
            desc="Track builds, deploy times, and team productivity metrics." 
          />
        </div>
      </section>

      

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">What Teams Say</h3>
          <p className="text-slate-400 text-lg">Trusted by developers and teams worldwide</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial 
            name="Priya" 
            role="SDE @ DevCorp" 
            quote="DevForge removed onboarding friction for our new hires. From zero to productive in minutes." 
          />
          <Testimonial 
            name="Arjun" 
            role="Founder @ StackLab" 
            quote="The deploy previews are a game-changer for our QA workflow." 
          />
          <Testimonial 
            name="Maya" 
            role="Engineering Manager" 
            quote="Real-time collaboration cut our review cycle by 40%." 
          />
        </div>
      </section>

      {/* CTA */}
      <section id="signup" className="max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          className="rounded-3xl p-12 bg-linear-to-r from-purple-900/40 to-pink-900/30 border border-purple-800/50 flex flex-col lg:flex-row items-center justify-between gap-8" 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
        >
          <div className="text-center lg:text-left">
            <h4 className="text-3xl lg:text-4xl font-bold mb-4">Ready to forge your next project?</h4>
            <p className="text-lg text-slate-300">Start for free — no credit card required.</p>
          </div>
          <div>
            <Link 
              href="/auth/signin" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-xl hover:shadow-purple-500/25 hover:scale-105 transition-all whitespace-nowrap"
            >
              Create Account
              <Sparkles className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-purple-800/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
              DF
            </div>
            <div>
              <div className="font-semibold">DevForge</div>
              <div className="text-xs text-slate-400">© {new Date().getFullYear()} Built for developers</div>
            </div>
          </div>
          <div className="flex items-center gap-8 text-sm text-slate-400">
            <Link href="#docs" className="hover:text-purple-400 transition-colors">Docs</Link>
            <Link href="#blog" className="hover:text-purple-400 transition-colors">Blog</Link>
            <Link href="#careers" className="hover:text-purple-400 transition-colors">Careers</Link>
            <Link href="#privacy" className="hover:text-purple-400 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <motion.div 
      className="group p-8 rounded-3xl bg-purple-900/20 border border-purple-800/50 hover:border-purple-500/50 transition-all duration-300" 
      whileHover={{ scale: 1.02, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col gap-4">
        <div className="w-14 h-14 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:shadow-purple-500/25 transition-shadow">
          {icon}
        </div>
        <div>
          <div className="font-semibold text-lg mb-2">{title}</div>
          <div className="text-sm text-slate-400 leading-relaxed">{desc}</div>
        </div>
      </div>
    </motion.div>
  );
}

function Testimonial({ name, role, quote }: TestimonialProps) {
  return (
    <motion.blockquote 
      className="p-8 rounded-3xl bg-purple-900/20 border border-purple-800/50 hover:border-purple-700/50 transition-all" 
      whileInView={{ opacity: 1, y: 0 }} 
      initial={{ opacity: 0, y: 20 }} 
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg shadow-lg">
          {name[0]}
        </div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-slate-400">{role}</div>
        </div>
      </div>
      <p className="text-slate-300 leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
    </motion.blockquote>
  );
}
