import { motion } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { useServices, iconMap, type Service } from "@/data";
import { Sparkles } from "lucide-react";

export function Services() {
  const { data: services = [], isLoading } = useServices();

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Services"
          title="What we actually do."
          description="Product, design, engineering, AI — under one roof so nothing gets lost in a handoff."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl glass" />
              ))
            : services.map((s: Service, i: number) => {
                const Icon = iconMap[s.icon] ?? Sparkles;
                return (
                  <Reveal key={s.id} delay={i * 0.05}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className="group relative h-full overflow-hidden rounded-2xl glass gradient-border p-6 transition hover:shadow-[0_30px_80px_-30px_oklch(0.70_0.27_300/0.5)]"
                    >
                      <div className="relative">
                        <div className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue/30 to-neon-violet/30 text-foreground transition group-hover:from-neon-cyan/40 group-hover:to-neon-violet/40">
                          <Icon className="size-5 transition-transform group-hover:scale-110 group-hover:rotate-3" />
                        </div>
                        <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                      </div>
                      <div className="pointer-events-none absolute -bottom-12 -right-12 size-40 rounded-full bg-neon-violet/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                    </motion.div>
                  </Reveal>
                );
              })}
        </div>
      </div>
    </section>
  );
}
