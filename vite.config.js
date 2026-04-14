import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change base to '/your-repo-name/' if deploying to GitHub Pages project page
// e.g., base: '/portfolio/' for github.com/Sameer060405/portfolio
export default defineConfig({
  plugins: [react()],
  base: './',
})
