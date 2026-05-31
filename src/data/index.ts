import {
  Code2, Smartphone, Palette, Bot, Cloud, Plug, ShoppingCart, LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// ------- Icon registry (DB stores icon name as string) -------
export const iconMap: Record<string, LucideIcon> = {
  Code2, Smartphone, Palette, Bot, Cloud, Plug, ShoppingCart, LayoutDashboard,
};

// ------- Types -------
export type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export const projectCategories = [
  "All", "Web Apps", "AI Projects", "Mobile Apps", "Dashboards", "Educational", "E-Commerce",
] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export type Metric = { label: string; value: string };

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  tags: string[];
  short: string;
  description: string;
  features: string[];
  metrics: Metric[];
  image: string;
  liveUrl: string;
  githubUrl: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  skills: string[];
  image: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: string;
  date: string;
};

export type Stat = { id: string; label: string; value: number; suffix: string };

// ------- Hooks -------
export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async (): Promise<Service[]> => {
      const { data, error } = await supabase
        .from("services")
        .select("id, icon, title, description")
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, slug, title, category, tags, short, description, features, metrics, image, live_url, github_url")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []).map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category as ProjectCategory,
        tags: p.tags ?? [],
        short: p.short,
        description: p.description,
        features: p.features ?? [],
        metrics: (p.metrics as Metric[]) ?? [],
        image: p.image,
        liveUrl: p.live_url ?? "#",
        githubUrl: p.github_url ?? "#",
      }));
    },
  });
}

export function useTeam() {
  return useQuery({
    queryKey: ["team"],
    queryFn: async (): Promise<TeamMember[]> => {
      const { data, error } = await supabase
        .from("team_members")
        .select("id, name, role, skills, image")
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async (): Promise<Testimonial[]> => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, role, quote, image, rating")
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blog_posts"],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, slug, title, category, read_time, excerpt, image, published_date")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []).map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        readTime: p.read_time,
        excerpt: p.excerpt,
        image: p.image,
        date: new Date(p.published_date).toLocaleDateString("en-US", {
          month: "short", day: "2-digit", year: "numeric",
        }),
      }));
    },
  });
}

export function useTechStack() {
  return useQuery({
    queryKey: ["tech_stack"],
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from("tech_stack")
        .select("name")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []).map((t) => t.name);
    },
  });
}

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async (): Promise<Stat[]> => {
      const { data, error } = await supabase
        .from("stats")
        .select("id, label, value, suffix")
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });
}
