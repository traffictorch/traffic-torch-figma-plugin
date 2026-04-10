import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),   // 2026 official Vite plugin
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'code.js',
        assetFileNames: 'ui.html',   // Figma expects ui.html
      },
    },
  },
})
