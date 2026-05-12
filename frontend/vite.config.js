import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/static/',
  plugins: [react()],
  build: {
    outDir: '../backend/frontend_dist',
    emptyOutDir: true,
  },
})
