import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    target: "esnext",
    modulePreload: false,
  },
  optimizeDeps: {
    force: true,
  },
});

