import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-portfolio/',
  build: {
    // Warn when a chunk exceeds 500 KB
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Manual code splitting: vendor libs in a separate chunk
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['aos'],
          'email-vendor': ['@emailjs/browser'],
          'icons-vendor': ['react-icons'],
        },
      },
    },
  },
})
