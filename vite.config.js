/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  optimizeDeps: {
    include: ['@ionic/vue']
  },
  define: {
    'process.env': {}
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('ion-')
    }
  }
})
