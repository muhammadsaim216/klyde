import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, LayoutDashboard, LogOut, LogIn } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { GradientButton } from "../ui/GradientButton";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const links = [
  { label: "Home", to: "/", hash: "" },
  { label: "Services", to: "/", hash: "services" },
  { label: "Projects", to: "/projects", hash: "" },
  { label: "Team", to: "/", hash: "team" },
  { label: "Blogs", to: "/blog", hash: "" },
  { label: "Testimonials", to: "/", hash: "testimonials" },
  { label: "Contact", to: "/contact", hash: "" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <Link
          to="/"
          className={`relative inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-display text-lg font-bold tracking-[0.25em] transition ${
            scrolled ? "glass-strong" : ""
          }`}
        >
          <span className="size-2 rounded-full bg-neon-cyan shadow-[0_0_12px_oklch(0.85_0.18_200)]" />
          <span className="text-gradient">KLYDE</span>
        </Link>

        <nav
          className={`hidden lg:flex items-center gap-1 rounded-full px-2 py-2 transition ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash || undefined}
              className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          {isAdmin && (
            <Link to="/admin" className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-sm">
              <LayoutDashboard className="size-4" /> Admin
            </Link>
          )}
          {user ? (
            <button onClick={signOut} className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-sm">
              <LogOut className="size-4" /> Sign out
            </button>
          ) : (
            <Link to="/login" className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-sm">
              <LogIn className="size-4" /> Sign in
            </Link>
          )}
          <Link to="/contact">
            <GradientButton>Start a project</GradientButton>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="inline-flex size-10 items-center justify-center rounded-full glass"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mx-5 mt-3 rounded-2xl glass-strong p-3"
          >
            <nav className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  hash={l.hash || undefined}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-foreground/90 hover:bg-white/10"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="mt-2">
                <GradientButton className="w-full">Start a project</GradientButton>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
