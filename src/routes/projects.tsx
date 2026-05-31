import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/sections/Projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Klyde" },
      { name: "description", content: "Selected work from Klyde across web, mobile, AI, dashboards and commerce." },
      { property: "og:title", content: "Projects — Klyde" },
      { property: "og:description", content: "Selected work across web, mobile, AI and commerce." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: () => (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-5 pt-8">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gradient">
          Our portfolio of recent work.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Selected projects across web, mobile, AI and commerce — each shipped with a small team and strong opinions.
        </p>
      </div>
      <Projects />
    </div>
  ),
});
