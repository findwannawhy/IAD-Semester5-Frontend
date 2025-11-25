import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";
import path from "path";

// Определяем, работаем ли мы в Docker (проверяем переменную окружения из docker-compose.yml)
const isDocker = process.env.DOCKER === "true";
const apiHost = isDocker
  ? "http://host.docker.internal:8080"
  : "http://192.168.1.4:8080";
const minioHost = isDocker
  ? "http://host.docker.internal:9000"
  : "http://192.168.1.4:9000";

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "cert.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "cert.crt")),
    },
    proxy: {
      "/api": {
        target: apiHost,
        changeOrigin: true,
      },
      "/img": {
        target: minioHost,
        changeOrigin: true,
      },
    },
    port: 3000,
    watch: {
      usePolling: true, // для hot-reload в Docker
    },
    host: true, // для правильного маппинга портов в Docker
    strictPort: true, // не даст использовать другой порт если 3000 занят
  },
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Helix",
        short_name: "Helix",
        start_url: "/IAD-Semester5-Frontend/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#171A20",
        orientation: "portrait-primary",
        icons: [
          {
            src: "flask-icon-180.png",
            type: "image/png",
            sizes: "180x180",
            purpose: "any maskable",
          },
          {
            src: "flask-icon-512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "flask-icon-192.png",
            type: "image/png",
            sizes: "192x192",
          },
        ],
      },
    }),
  ],
  base: "/IAD-Semester5-Frontend",
});
