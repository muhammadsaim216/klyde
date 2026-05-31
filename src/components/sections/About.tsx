import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import { useStats } from "@/data";

export function About() {
  const { data: stats = [] } = useStats();

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="About Klyde"
          title="Small team. Strong opinions. Real shipping."
          description="We're engineers who like design and designers who can read a stack trace. The result is software that ships on time and doesn't feel like a committee built it."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <div className="relative overflow-hidden rounded-2xl glass gradient-border p-6 text-center">
                <div className="text-4xl md:text-5xl font-semibold text-gradient">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs md:text-sm uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
