import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { GradientButton } from "../ui/GradientButton";

const chips = [
  { label: "React", x: "8%", y: "20%", d: 0 },
  { label: "Next.js", x: "78%", y: "18%", d: 0.4 },
  { label: "OpenAI", x: "12%", y: "70%", d: 0.8 },
  { label: "Supabase", x: "82%", y: "68%", d: 1.2 },
  { label: "TypeScript", x: "50%", y: "10%", d: 0.2 },
  { label: "AWS", x: "50%", y: "82%", d: 1 },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
      {/* animated background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg radial-fade" />
        <div className="absolute left-1/2 top-1/3 -z-10 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
             style={{ background: "radial-gradient(circle, oklch(0.65 0.22 265 / 0.6), transparent 60%)" }} />
        <div className="absolute right-1/4 top-2/3 -z-10 size-[500px] rounded-full opacity-50 blur-[120px]"
             style={{ background: "radial-gradient(circle, oklch(0.70 0.27 300 / 0.5), transparent 60%)" }} />
      </div>

      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-2xl items-center justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs">
            <Sparkles className="size-3.5 text-neon-cyan" />
            <span className="text-muted-foreground">Now booking Q3 · 4 slots left</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mx-auto mt-6 max-w-5xl text-center text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl"
        >
          Software that earns its <br className="hidden md:block" />
          place on your{" "}
          <span className="text-gradient animate-gradient">roadmap.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-7 max-w-2xl text-center text-base text-muted-foreground md:text-lg"
        >
          We're Klyde — a small team that builds web apps, SaaS tools, AI features
          and the occasional mobile app for founders who care how the thing actually feels.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/projects">
            <GradientButton>
              View Projects <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </GradientButton>
          </Link>
          <Link to="/contact">
            <GradientButton variant="ghost">Contact Us</GradientButton>
          </Link>
        </motion.div>

        {/* Floating tech chips */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
          {chips.map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + c.d * 0.1, duration: 0.6 }}
              style={{ left: c.x, top: c.y, animationDelay: `${c.d}s` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 animate-float rounded-full glass-strong px-3 py-1.5 text-xs text-muted-foreground"
            >
              {c.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
