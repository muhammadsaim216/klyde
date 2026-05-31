import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useTestimonials } from "@/data";
import { SectionHeading } from "../ui/SectionHeading";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export function Testimonials() {
  const { data: testimonials = [] } = useTestimonials();
  const [i, setI] = useState(0);
  const t = testimonials[i];

  useEffect(() => {
    if (testimonials.length === 0) return;
    const id = setInterval(() => setI((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (!t) return null;

  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      {/* Interactive particle canvas backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <ParticleBackground />
      </div>

      <div className="mx-auto max-w-5xl px-5 relative z-10">
        <SectionHeading
          eyebrow="Testimonials"
          title="In their words, not ours."
          description="A few notes from the founders and teams we've shipped alongside."
        />

        <div className="relative mt-16">
          {/* Replaced hardcoded constraints with responsive min-height bounds to guarantee text is never truncated */}
          <div className="relative min-h-[380px] sm:min-h-[300px] md:min-h-[260px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full"
              >
                <div className="relative h-full overflow-hidden rounded-3xl glass-strong gradient-border p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-neon-cyan">
                      {Array.from({ length: t.rating }).map((_, k) => (
                        <Star key={k} className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-6 text-xl md:text-2xl leading-relaxed text-foreground/90">
                      "{t.quote}"
                    </p>
                  </div>
                  
                  <div className="mt-8 flex items-center gap-4">
                    <img src={t.image} alt={t.name} className="size-12 rounded-full object-cover ring-2 ring-white/20" />
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={() => setI((p) => (p - 1 + testimonials.length) % testimonials.length)}
                    aria-label="Previous"
                    className="inline-flex size-10 items-center justify-center rounded-full glass hover:bg-white/10 transition-colors cursor-pointer">
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, k) => (
                <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${k === i ? "w-8 bg-neon-cyan" : "w-1.5 bg-white/20"}`} />
              ))}
            </div>
            <button onClick={() => setI((p) => (p + 1) % testimonials.length)}
                    aria-label="Next"
                    className="inline-flex size-10 items-center justify-center rounded-full glass hover:bg-white/10 transition-colors cursor-pointer">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}