import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter, Instagram, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    if (error && !error.message.includes("duplicate")) { setStatus("err"); return; }
    setStatus("ok"); setEmail("");
  }

  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* glow backdrop */}
      <div aria-hidden className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-neon-violet to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 size-[800px] -translate-x-1/2 rounded-full opacity-30 blur-[140px]"
             style={{ background: "radial-gradient(circle, oklch(0.65 0.22 265 / 0.6), transparent 60%)" }} />
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-20 pb-10">
        {/* CTA band */}
        <div className="relative overflow-hidden rounded-3xl glass-strong gradient-border p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs">
                <Sparkles className="size-3.5 text-neon-cyan" />
                <span className="text-muted-foreground">The Klyde dispatch</span>
              </div>
              <h3 className="mt-4 text-2xl md:text-3xl font-semibold leading-tight">
                Get the field notes <br /> we don't post anywhere else.
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                One short email a month. Engineering deep-dives, product teardowns, no fluff.
              </p>
            </div>
            <form onSubmit={subscribe} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full flex-1 rounded-full bg-background/60 px-5 py-3.5 text-sm outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-neon-cyan/60"
              />
              <button type="submit" disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-60"
                style={{ background: "linear-gradient(120deg, oklch(0.65 0.22 265), oklch(0.62 0.24 295))" }}>
                {status === "ok" ? "Subscribed ✓" : status === "sending" ? "…" : <>Subscribe <ArrowRight className="size-4" /></>}
              </button>
            </form>
          </div>
        </div>

        {/* link grid */}
        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-display text-2xl font-bold tracking-[0.3em] text-gradient">KLYDE</div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              A modern software house building category-defining digital products for ambitious teams worldwide.
            </p>
            <div className="mt-6 flex gap-2">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" aria-label="social"
                   className="inline-flex size-10 items-center justify-center rounded-full glass transition hover:bg-white/10 hover:text-neon-cyan">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Studio" links={[
            { label: "Home", to: "/" },
            { label: "Projects", to: "/projects" },
            { label: "Blog", to: "/blog" },
            { label: "Contact", to: "/contact" },
          ]} />

          <FooterCol title="Services" links={[
            { label: "Web Development", to: "/contact" },
            { label: "Mobile Apps", to: "/contact" },
            { label: "AI Automation", to: "/contact" },
            { label: "SaaS Platforms", to: "/contact" },
          ]} />

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground/80">Contact</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><a href="mailto:hello@klyde.studio" className="hover:text-foreground transition">hello@klyde.studio</a></li>
              <li>San Francisco</li>
              <li>Remote-first</li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Klyde Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition">Privacy</a>
            <a href="#" className="hover:text-foreground transition">Terms</a>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-neon-cyan animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div className="md:col-span-2">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground/80">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="hover:text-foreground transition">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
