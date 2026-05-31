import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, Search } from "lucide-react";
import { useBlogPosts } from "@/data";
import { Reveal } from "@/components/ui/Reveal";


const categories = ["All", "AI", "Web Development", "SaaS", "UI/UX", "Startup Engineering", "Cloud Systems"];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Klyde" },
      { name: "description", content: "Field notes on AI, product engineering and modern software craft." },
      { property: "og:title", content: "Blog — Klyde" },
      { property: "og:description", content: "Field notes on AI, product engineering and software craft." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const { data: blogPosts = [] } = useBlogPosts();

  const list = useMemo(
    () =>
      blogPosts.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (q === "" || p.title.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, cat, blogPosts],
  );

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-5">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gradient">
          The Klyde engineering blog.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Deep dives, opinions and field notes on AI, product engineering and modern software craft.
        </p>

        <Reveal>
          <div className="mt-12 flex flex-col items-stretch gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles…"
                className="w-full rounded-full glass py-3 pl-11 pr-4 text-sm outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-neon-cyan/60"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button key={c} onClick={() => setCat(c)}
                        className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                          cat === c ? "text-white" : "glass text-muted-foreground hover:text-foreground"
                        }`}
                        style={cat === c ? { background: "linear-gradient(120deg, oklch(0.65 0.22 265), oklch(0.62 0.24 295))" } : undefined}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.05}>
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
          {list.length === 0 && (
            <p className="col-span-full py-20 text-center text-sm text-muted-foreground">No articles match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
