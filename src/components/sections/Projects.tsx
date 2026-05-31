import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { useProjects, projectCategories, type Project, type ProjectCategory } from "@/data";
import { ProjectModal } from "./ProjectModal";

export function Projects({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<ProjectCategory>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const { data: projects = [], isLoading } = useProjects();

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  const list = compact ? filtered.slice(0, 6) : filtered;

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Selected Work"
          title="A few things we're proud of."
          description="Recent builds across web, mobile, AI and commerce — picked because the story behind them is worth telling."
        />

        <Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {projectCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  active === c
                    ? "text-white shadow-[0_8px_30px_-8px_oklch(0.65_0.22_265/0.6)]"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
                style={active === c ? { background: "linear-gradient(120deg, oklch(0.65 0.22 265), oklch(0.62 0.24 295))" } : undefined}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 animate-pulse rounded-2xl glass" />
              ))
            : list.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 0.08}>
                  <motion.button
                    onClick={() => setOpen(p)}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="group block w-full overflow-hidden rounded-2xl glass gradient-border text-left transition hover:shadow-[0_30px_80px_-30px_oklch(0.70_0.27_300/0.5)]"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img src={p.image} alt={p.title} loading="lazy"
                           className="size-full object-cover transition duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-xs">{p.category}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold">{p.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{p.short}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tags.slice(0, 3).map((t: string) => (
                          <span key={t} className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-muted-foreground">{t}</span>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><ExternalLink className="size-3.5" /> Live</span>
                        <span className="inline-flex items-center gap-1"><Github className="size-3.5" /> Code</span>
                      </div>
                    </div>
                  </motion.button>
                </Reveal>
              ))}
        </div>
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
