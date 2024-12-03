import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import { execSync } from "child_process";

// Get git commit hash
const getGitHash = () => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch (e) {
    console.log(e);
    return "unknown";
  }
};

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  define: {
    "import.meta.env.VITE_GIT_HASH": JSON.stringify(getGitHash()),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "哪吒面板",
        short_name: "哪吒",
        description: "哪吒监控面板",
        theme_color: "#242424",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallbackDenylist: [/^\/dashboard/],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/v1/ws/server": {
        target: "ws://localhost:8080",
        changeOrigin: true,
        ws: true,
      },
      "/api/v1/": {
        target: "http://localhost:8008",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
