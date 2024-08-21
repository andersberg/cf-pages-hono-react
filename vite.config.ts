import build from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        rollupOptions: {
          input: "./src/client.tsx",
          output: {
            entryFileNames: "client.js",
          },
        },
      },
    };
  }

  return {
    ssr: {
      external: ["react", "react-dom"],
    },
    plugins: [
      build(),
      devServer({
        adapter,
        entry: "src/server/app.tsx",
      }),
    ],
  };
});
