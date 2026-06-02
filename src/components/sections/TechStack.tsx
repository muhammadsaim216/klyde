import { SectionHeading } from "../ui/SectionHeading";
import { useTechStack } from "@/data";

export function TechStack() {
  const { data: techStack = [] } = useTechStack();
  const items = [...techStack, ...techStack];
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Our Stack"
          title="The tools we reach for."
          description="Boring where it should be, sharp where it matters. We pick tools we've shipped with — not whatever's trending this week."
        />
        <div className="relative mt-14 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max animate-marquee gap-4">
            {items.map((t, i) => (
              <div key={`${t}-${i}`}
                   className="inline-flex items-center gap-2 rounded-full glass gradient-border px-6 py-3 text-sm font-medium text-foreground/80">
                <span className="size-2 rounded-full bg-neon-cyan" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
