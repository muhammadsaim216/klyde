import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { useBlogPosts } from "@/data";

export function BlogPreview() {
  const { data: blogPosts = [] } = useBlogPosts();
  const featured = blogPosts.slice(0, 3);
  return (
    <section id="blog" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="From the Blog"
          title="What we've been writing."
          description="Half lessons learned, half things we wish someone had told us. Mostly about AI, product, and shipping software that holds up."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <article className="group h-full overflow-hidden rounded-2xl glass gradient-border transition hover:shadow-[0_30px_80px_-30px_oklch(0.70_0.27_300/0.5)]">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy"
                       className="size-full object-cover transition duration-700 group-hover:scale-110" />
                  <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-xs">{p.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{p.date}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {p.readTime}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-gradient">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium hover:bg-white/10">
            All articles <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
