import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import type { Project } from "@/data";
import { useEffect } from "react";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (project) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl glass-strong gradient-border"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 inline-flex size-9 items-center justify-center rounded-full glass hover:bg-white/10"
            >
              <X className="size-4" />
            </button>

            <div className="relative h-64 w-full overflow-hidden md:h-80">
              <img src={project.image} alt={project.title} className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full glass px-3 py-1 text-xs text-muted-foreground">{project.category}</span>
                {project.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">{t}</span>
                ))}
              </div>

              <h3 className="mt-4 text-3xl font-semibold md:text-4xl text-gradient">{project.title}</h3>
              <p className="mt-3 text-muted-foreground">{project.description}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl glass p-4 text-center">
                    <div className="text-2xl font-semibold text-gradient">{m.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Highlights</h4>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neon-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <a href={project.liveUrl} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                   style={{ background: "linear-gradient(120deg, oklch(0.65 0.22 265), oklch(0.62 0.24 295))" }}>
                  Live preview <ExternalLink className="size-4" />
                </a>
                <a href={project.githubUrl} className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium hover:bg-white/10">
                  GitHub <Github className="size-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
