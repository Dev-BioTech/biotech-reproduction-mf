import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'reproductionMF',
      filename: 'remoteEntry.js',
      exposes: {
        './ReproductionCycles': './src/features/reproduction-cycles/components/ReproductionCycles.jsx',
        './PregnancyTracking': './src/features/pregnancy-tracking/components/PregnancyTracking.jsx',
        './BirthRegistry': './src/features/birth-registry/components/BirthRegistry.jsx',
        './ReproductionStore': './src/shared/store/reproductionStore.js'
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'zustand', 'axios']
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5005,
    cors: true
  }
})