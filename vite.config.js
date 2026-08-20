import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Vercel (and any custom domain) serves the app from the domain root, so '/'
// is the default. GitHub Pages serves it from a sub-path instead — the Pages
// workflow sets VITE_BASE=/namaz-zikar/ for that build only.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Registered by hand in main.jsx so it can be skipped inside the APK.
      injectRegister: null,
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
