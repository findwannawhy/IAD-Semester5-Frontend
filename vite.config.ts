import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Определяем, работаем ли мы в Docker (проверяем переменную окружения из docker-compose.yml)
const isDocker = process.env.DOCKER === 'true';
const apiHost = isDocker ? 'http://host.docker.internal:8080' : 'http://localhost:8080';
const minioHost = isDocker ? 'http://host.docker.internal:9000' : 'http://localhost:9000';

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: apiHost,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, "/"),
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
  plugins: [react()],
  base: "/IAD-Semester5-UI/",
})