import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Plain Vite config — no SSR, no prerender, pure static SPA for GitHub Pages
export default defineConfig({
  base: "/",
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  build: {
    outDir: "dist/client",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
