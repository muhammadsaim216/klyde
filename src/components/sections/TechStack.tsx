import { SectionHeading } from "../ui/SectionHeading";
import { useTechStack } from "@/data";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export function TechStack() {
  const { data: techStack = [] } = useTechStack();
  
  // Duplicating elements to enable a seamless infinite marquee effect
  const items = [...techStack, ...techStack];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Interactive particle canvas backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <ParticleBackground />
      </div>

      <div className="mx-auto max-w-7xl px-5 relative z-10">
        <SectionHeading
          eyebrow="Our Stack"
          title="The tools we reach for."
          description="Boring where it should be, sharp where it matters. We pick tools we've shipped with — not whatever's trending this week."
        />

        <div className="relative mt-14 overflow-hidden">
          {/* Soft masking side gradients for a premium infinite vanishing look */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
          
          <div className="flex w-max animate-marquee gap-4">
            {items.map((t, i) => {
              // Cast to any safely during evaluation to completely resolve 'never' collection compilation errors
              const item = t as any;

              // Creating a robust unique ID string fallback pattern for reliable rendering
              const itemKey = typeof item === "object" && item !== null && "id" in item 
                ? `${item.id}-${i}` 
                : `${String(item)}-${i}`;
                
              const label = typeof item === "object" && item !== null && "name" in item 
                ? String(item.name) 
                : String(item);

              return (
                <div 
                  key={itemKey}
                  className="inline-flex items-center gap-2 rounded-full glass gradient-border px-6 py-3 text-sm font-medium text-foreground/80 whitespace-nowrap"
                >
                  <span className="size-2 rounded-full bg-neon-cyan shrink-0" />
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}