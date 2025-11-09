import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss(), sentryVitePlugin({
    org: "online-book-club",
    project: "javascript-react"
  })],

  build: {
    sourcemap: true
  }
})