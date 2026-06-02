# Deploying to Vercel

This project runs on TanStack Start. Inside Lovable the preview uses the Lovable Vite wrapper (which includes Cloudflare). For Vercel, use the dedicated `vite.config.vercel.ts` shipped in this repo — it targets Vercel directly with no Cloudflare involved.

## Steps

1. **Export to GitHub** from Lovable (top right → GitHub → Connect / Push).
2. In the GitHub repo, **swap the Vite config** for the Vercel one. Pick one:
   - **Option A (simplest):** rename `vite.config.vercel.ts` → `vite.config.ts` (overwrite the existing file).
   - **Option B:** keep both files and set Vercel's **Build Command** to:
     ```
     vite build --config vite.config.vercel.ts
     ```
3. **Remove Cloudflare deps** (optional cleanup):
   ```
   npm remove @cloudflare/vite-plugin @lovable.dev/vite-tanstack-config
   ```
   Also delete `wrangler.jsonc`.
4. **Import the repo in Vercel** → New Project → select repo.
   - Framework Preset: **Other** (or Vite). Don't pick Next.js.
   - Build Command: `vite build` (or the Option B command above).
   - Output Directory: leave blank — the TanStack Vercel target writes to `.vercel/output` automatically.
5. **Add environment variables** in Vercel → Project Settings → Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`
   - `SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `LOVABLE_API_KEY` (if you use the AI gateway)
6. **Deploy**. Vercel will build using the TanStack Start Vercel adapter, which produces serverless functions for SSR + server functions.

## Notes

- The `target: "vercel"` option in `vite.config.vercel.ts` is what tells TanStack Start to emit Vercel-compatible serverless output instead of a Worker.
- Server functions (`createServerFn`) and server routes (`src/routes/api/*`) work identically on Vercel — no code changes needed.
- If you keep editing in Lovable after exporting, only `vite.config.ts` (the Lovable one) is used inside Lovable's preview; `vite.config.vercel.ts` is ignored here and only activates on Vercel.
