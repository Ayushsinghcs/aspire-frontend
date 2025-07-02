import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import vitePluginSvgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), vitePluginSvgr()],
  server: {
    // Enable service worker caching
    headers: {
      'Cache-Control': 'public, max-age=300',
    },
  },
  optimizeDeps: {
    // Pre-bundle MSW for faster loading
    include: ['msw/browser'],
  },
})
