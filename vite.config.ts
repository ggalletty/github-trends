/// <reference types="vitest" />
/// <reference types="vite/client" />
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  // gh-pages are not served from the root, so we should change the base
  base: process.env["VITE_BASE_URL"],
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    include: ["./tests/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: "./tests/utils/setup.ts",
    css: false,
  },
});
