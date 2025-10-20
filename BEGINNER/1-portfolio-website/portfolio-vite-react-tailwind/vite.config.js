import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Uncomment when deploying to GitHub Pages on a repo (set to '/<repo>/' )
  // base: '/portfolio-level4-vite-react-tailwind/',
})
