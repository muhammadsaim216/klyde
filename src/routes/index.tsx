import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { TechStack } from "@/components/sections/TechStack";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Klyde — We Build Digital Experiences That Matter" },
      { name: "description", content: "A modern software house crafting websites, SaaS platforms, AI systems, mobile apps and automation tools for ambitious teams." },
      { property: "og:title", content: "Klyde — We Build Digital Experiences That Matter" },
      { property: "og:description", content: "Modern software house for websites, SaaS, AI, mobile and automation." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects compact />
      <FeaturedProject />
      <Team />
      <Testimonials />
      <BlogPreview />
      <TechStack />
      <Contact />
    </>
  );
}
