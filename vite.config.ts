import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: "/asset-viewer",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
