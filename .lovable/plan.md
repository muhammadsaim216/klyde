
# Klyde — Premium Software House Portfolio

A dark, futuristic, multi-section marketing site with glassmorphism UI, neon cyan/violet accents, animated gradients, and smooth Framer Motion interactions. Built on the existing TanStack Start + Tailwind stack.

## Design system (src/styles.css)

- Dark theme as default (root = dark). Light mode toggle layered on top.
- Palette (oklch tokens):
  - background: near-black with subtle navy tint
  - foreground: soft white
  - primary: electric blue
  - accent: violet
  - neon-cyan + neon-violet glow tokens
  - card: translucent white @ 4–8% for glassmorphism
- Custom tokens: `--gradient-primary` (blue→violet), `--gradient-glow`, `--shadow-glow-cyan`, `--shadow-glow-violet`, `--border-gradient`.
- Typography: Sora (display) + Inter (body) via Google Fonts in `__root.tsx` head links.
- Utility classes: `.glass`, `.glass-strong`, `.glow-cyan`, `.glow-violet`, `.gradient-border`, `.text-gradient`, scroll-smooth on html.
- Keyframes: float, grid-pan, gradient-shift, pulse-glow, marquee.

## Route architecture (TanStack Start)

Single-page marketing site with anchored sections is appropriate here (one continuous scroll experience). Add a few SEO-worthy standalone routes for the discoverable areas.

```
src/routes/
  __root.tsx          // fonts, theme provider, global Navbar + Footer, meta
  index.tsx           // Hero, About, Services, Projects, Featured, Team, Testimonials, Blog preview, Tech Stack, Contact
  projects.tsx        // Full filterable project grid
  blog.tsx            // Blog index with search/filter
  contact.tsx         // Dedicated contact route (mirrors form)
```

Each route gets its own `head()` with unique title/description/og tags.

## Component library (src/components/)

Reusable, themed components:

- `layout/Navbar.tsx` — sticky transparent glass nav, scroll-aware blur, mobile hamburger drawer (Framer Motion).
- `layout/Footer.tsx` — links, socials, newsletter input, animated gradient line.
- `layout/ThemeToggle.tsx` — dark/light toggle (localStorage + class on html).
- `layout/MouseGlow.tsx` — cursor-follow radial glow (pointer-events-none).
- `sections/Hero.tsx` — animated grid + particle canvas background, gradient headline, dual CTA, floating glass tech chips.
- `sections/About.tsx` — mission copy + animated counter stats.
- `sections/Services.tsx` — 8 service cards with animated Lucide icons, hover glow, gradient border.
- `sections/Projects.tsx` — category filter chips, responsive masonry/grid of `ProjectCard`, opens `ProjectModal`.
- `sections/FeaturedProject.tsx` — cinematic mockup with animated glow halo, parallax.
- `sections/Team.tsx` — glass profile cards, hover tilt, socials.
- `sections/Testimonials.tsx` — embla-style carousel with autoplay, ratings, avatars.
- `sections/Blog.tsx` — featured + grid of articles, category filter, search input.
- `sections/TechStack.tsx` — animated marquee of tech icons with hover scale.
- `sections/Contact.tsx` — futuristic form (name, email, project type, budget, message), socials, Calendly CTA.
- `ui/GlassCard.tsx`, `ui/GradientButton.tsx`, `ui/SectionHeading.tsx`, `ui/AnimatedCounter.tsx`, `ui/Reveal.tsx` (scroll-triggered fade/slide wrapper using `useInView`), `ui/ProjectModal.tsx`.

## Data

Static data files under `src/data/`:
- `projects.ts` (8–10 sample projects with categories, tags, mock thumbnails, features, metrics)
- `services.ts`, `team.ts`, `testimonials.ts`, `blog.ts`, `tech.ts`

Thumbnails/mockups: generate 4–6 hero/project/team images with imagegen (dark futuristic UI mockups, abstract gradients, team avatars), stored in `src/assets/`.

## Animations (Framer Motion)

- Page-load: stagger fade-up on hero.
- Scroll reveals via `Reveal` wrapper (`whileInView`, once: true).
- Hero: animated SVG grid + small canvas particle field + floating chips (`animate` loop).
- Cards: `whileHover` scale + glow shadow transition.
- Featured project: parallax y-transform from `useScroll`.
- Testimonials: AnimatePresence slide transitions.
- Mouse-follow glow: spring-tracked div following pointer.
- Counters: animate on inView using `motion` value + interval.

## Dependencies to add

- `framer-motion`
- `embla-carousel-react` (testimonials)

Lucide-react already available for icons.

## Technical notes

- Theme: default `<html class="dark">` in `__root.tsx` shellComponent; toggle flips class + persists.
- Smooth scroll: `html { scroll-behavior: smooth }` + anchored `#services`, `#projects`, etc. on the index page; navbar links use TanStack `<Link>` with `hash` for in-page sections and `to` for separate routes.
- SEO: per-route `head()` with title, description, og:* (no og:image until generated); JSON-LD Organization in `__root.tsx`.
- Performance: lazy `ProjectModal`, image lazy loading, prefers-reduced-motion guards on heavy animations.
- Accessibility: focus-visible rings on interactive elements, aria-labels on icon buttons, semantic landmarks.

## Build order

1. Install deps, set up design tokens + fonts + global glass utilities.
2. Build shared primitives (GlassCard, GradientButton, Reveal, SectionHeading, MouseGlow, ThemeToggle).
3. Navbar + Footer + root layout wiring.
4. Hero + About + Services on index.
5. Projects section + ProjectModal + filters; mirror on `/projects`.
6. Featured Project + Team + Testimonials.
7. Blog section + `/blog` route.
8. Tech Stack + Contact + `/contact` route.
9. Generate hero/project/team images, wire in.
10. Polish pass: scroll reveals everywhere, hover micro-interactions, responsive QA at mobile/tablet/desktop.

## Out of scope (can add later if you want)

- Real backend for contact form submissions (Lovable Cloud).
- Real blog CMS / MDX articles.
- Real Calendly account wiring (placeholder link for now).
- Auth / dashboard.

Let me know if you'd like any section trimmed, expanded, or restyled before I start building.
