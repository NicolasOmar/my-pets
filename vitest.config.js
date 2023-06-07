import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watch: false,
    reporters: 'verbose',
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
  },
})