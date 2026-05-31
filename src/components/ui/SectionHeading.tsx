import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "center" }: Props) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium tracking-widest uppercase text-muted-foreground">
            <span className="size-1.5 rounded-full bg-neon-cyan animate-pulse" />
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-5 text-4xl md:text-5xl font-semibold leading-[1.05]">
          <span className="text-gradient">{title}</span>
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
