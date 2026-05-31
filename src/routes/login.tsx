import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GradientButton } from "@/components/ui/GradientButton";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Klyde" },
      { name: "description", content: "Sign in to your Klyde account to manage projects, review messages, and update the studio's content from the admin dashboard." },
      { property: "og:title", content: "Sign in — Klyde" },
      { property: "og:description", content: "Sign in to your Klyde account to manage projects, review messages, and update the studio's content from the admin dashboard." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
    navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-3xl glass-strong p-8 space-y-5">
        <div>
          <h1 className="text-3xl font-display font-bold text-gradient">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">Access the Klyde admin console.</p>
        </div>
        <div className="space-y-3">
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl glass px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl glass px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <GradientButton type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </GradientButton>
        <p className="text-center text-sm text-muted-foreground">
          No account?{" "}
          <Link to="/signup" className="text-foreground hover:text-gradient">Create one</Link>
        </p>
      </form>
    </div>
  );
}
