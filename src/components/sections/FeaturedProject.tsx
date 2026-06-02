import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";

export function FeaturedProject() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="size-1.5 rounded-full bg-neon-violet animate-pulse" />
                Featured Spotlight
              </div>
              <h2 className="mt-5 text-4xl md:text-5xl font-semibold leading-[1.05]">
                Nebula Analytics —{" "}
                <span className="text-gradient">12B events per day, zero compromise.</span>
              </h2>
              <p className="mt-5 text-muted-foreground md:text-lg">
                We rebuilt Nebula from the metal up — a realtime ingestion pipeline, a cohort-aware query engine,
                and an AI layer that turns raw events into weekly executive briefs. The result: a product the team
                wakes up excited to open.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Next.js 15", "PostgreSQL", "ClickHouse", "OpenAI", "Edge runtime"].map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
              <a href="#projects" className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
                 style={{ background: "linear-gradient(120deg, oklch(0.65 0.22 265), oklch(0.62 0.24 295))" }}>
                Explore the case study <ArrowUpRight className="size-4" />
              </a>
            </div>
          </Reveal>

          <motion.div style={{ y }} className="relative">
            <div aria-hidden className="absolute -inset-12 -z-10 rounded-full opacity-70 blur-3xl"
                 style={{ background: "radial-gradient(circle, oklch(0.70 0.27 300 / 0.5), transparent 60%)" }} />
            <div className="relative overflow-hidden rounded-3xl glass-strong gradient-border p-2 shadow-[0_40px_100px_-30px_oklch(0.65_0.22_265/0.6)]">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80"
                alt="Featured project"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
