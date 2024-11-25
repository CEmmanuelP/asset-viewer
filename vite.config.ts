import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV ? "/" : "/asset-viewer/index.html",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
