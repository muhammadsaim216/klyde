import { Github, Linkedin, Twitter } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { useTeam } from "@/data";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export function Team() {
  const { data: team = [] } = useTeam();

  return (
    <section id="team" className="relative py-24 md:py-32 w-full overflow-hidden">
      {/* Interactive particle canvas backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <ParticleBackground />
      </div>

      <div className="mx-auto max-w-7xl px-5 relative z-10">
        <SectionHeading
          eyebrow="The Team"
          title="The people you'll actually work with."
          description="No account managers, no junior bait-and-switch. The folks below are the ones writing the code and pushing the pixels."
        />

        {/* Updated Grid container with explicit layout bounds and padding to prevent cropping */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full p-1">
          {team.map((m, i) => (
            <Reveal key={m.id || i} delay={(i % 3) * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative overflow-hidden rounded-2xl glass gradient-border p-6 text-center transition hover:shadow-[0_30px_80px_-30px_oklch(0.70_0.27_300/0.5)] h-full flex flex-col justify-between"
              >
                <div>
                  <div className="relative mx-auto size-28">
                    <div 
                      aria-hidden 
                      className="absolute -inset-2 rounded-full opacity-60 blur-xl transition group-hover:opacity-100"
                      style={{ background: "linear-gradient(120deg, oklch(0.85 0.18 200 / 0.6), oklch(0.70 0.27 300 / 0.6))" }} 
                    />
                    <img 
                      src={m.image || "/placeholder-avatar.png"} 
                      alt={m.name || "Team Member"} 
                      loading="lazy" 
                      className="relative size-28 rounded-full object-cover ring-2 ring-white/20" 
                    />
                  </div>
                  
                  <h3 className="mt-5 text-base font-semibold truncate px-2">
                    {m.name || "Unnamed Member"}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1 truncate px-2">
                    {m.role || "No Role Specified"}
                  </p>
                  
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5 max-h-24 overflow-y-auto no-scrollbar px-1">
                    {Array.isArray(m.skills) ? (
                      m.skills.map((s: string) => (
                        <span key={s} className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-muted-foreground whitespace-nowrap">
                          {s}
                        </span>
                      ))
                    ) : m.skills ? (
                      String(m.skills).split(',').map((s: string) => (
                        <span key={s.trim()} className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-muted-foreground whitespace-nowrap">
                          {s.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-muted-foreground/40 italic">No skills listed</span>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex justify-center gap-2 pt-2 border-t border-white/5">
                  {[Twitter, Github, Linkedin].map((Icon, j) => (
                    <a 
                      key={j} 
                      href="#" 
                      aria-label="social"
                      className="inline-flex size-8 items-center justify-center rounded-full glass hover:bg-white/10 transition-colors"
                    >
                      <Icon className="size-3.5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}