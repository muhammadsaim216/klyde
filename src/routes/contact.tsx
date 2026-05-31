import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Klyde" },
      { name: "description", content: "Tell us about your project. We reply within one business day." },
      { property: "og:title", content: "Contact — Klyde" },
      { property: "og:description", content: "Start a project with Klyde." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: () => (
    <div className="pt-16">
      <Contact />
    </div>
  ),
});
