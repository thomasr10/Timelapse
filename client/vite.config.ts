/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 500
    },
    host: '0.0.0.0',
    port: 3000
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node'
  }
})