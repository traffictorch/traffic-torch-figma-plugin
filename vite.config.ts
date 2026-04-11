import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        ui: './index.html',      // Builds to dist/ui.html (with all React + Tailwind inlined)
        code: './src/code.ts'    // Builds to dist/code.js
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        chunkFileNames: '[name]-[hash].js'
      }
    }
  }
})
