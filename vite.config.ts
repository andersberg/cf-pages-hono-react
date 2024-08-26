import { console } from "@cloudflare/workers-types/experimental";
import build from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { resolve } from "path";
import { defineConfig } from "vite";

console.log(import.meta.dir);

const configBase = defineConfig({
  resolve: {
    alias: {
      "@": resolve(import.meta.dir, "./src"),
      "@api": resolve(import.meta.dir, "./src/api"),
      "@client": resolve(import.meta.dir, "./src/client"),
      "@components": resolve(import.meta.dir, "./src/client/components"),
      "@db": resolve(import.meta.dir, "./src/db"),
    },
  },
});

const configClient = defineConfig({
  build: {
    rollupOptions: {
      input: "./src/client.entry.tsx",
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
      onwarn(warning, warn) {
        // Suppress "Module level directives cause errors when bundled" warnings
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  },
});

const configServer = defineConfig({
  optimizeDeps: {
    entries: [],
  },
  ssr: {
    external: ["react", "react-dom"],
  },
  plugins: [
    build(),
    devServer({
      adapter,
      entry: "src/index.tsx",
    }),
  ],
});

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      ...configBase,
      ...configClient,
    };
  }

  return {
    ...configBase,
    ...configServer,
  };
});
