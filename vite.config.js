import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serves this repo from /namaz-zikar/.
// Use `npm run build -- --base=/` if you ever host it at a domain root.
export default defineConfig({
  base: '/namaz-zikar/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.svg'],
      manifest: {
        name: 'نماز و اذکار',
        short_name: 'نماز',
        description: 'نماز، وتر اور صبح و شام کے اذکار — قدم بہ قدم آسان رہنمائی',
        lang: 'ur',
        dir: 'rtl',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        background_color: '#f7f4ec',
        theme_color: '#1f6b4a',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Fonts are self-hosted, so precaching the build output covers everything.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
    }),
  ],
})
