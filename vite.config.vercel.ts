// Vercel-only Vite config for TanStack Start.
// Used when deploying outside Lovable (no Cloudflare plugin, no Lovable wrapper).
//
// To activate on Vercel:
//   1. Rename this file to `vite.config.ts` (overwrite the Lovable one), OR
//   2. Set Vercel's "Build Command" to: vite build --config vite.config.vercel.ts
//
// See VERCEL_DEPLOY.md for the full step-by-step.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      target: "vercel",
      customViteReactPlugin: true,
      server: { entry: "server" },
    }),
    viteReact(),
  ],
});
