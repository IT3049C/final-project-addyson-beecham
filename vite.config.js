import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/final-project-addyson-beecham/" : "/",
  plugins: [react()],
  server: { port: 5173, open: false },
  preview: { port: 5173 },
}));