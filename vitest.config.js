import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watch: false,
    reporters: 'verbose',
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{jsx,js}'],
    // setupFiles: ['./tests/setup.js'],
    coverage: {
      branches: 80,
      lines: 80,
      functions: 80,
      statements: 80,
      include: ['src/**/*.{jsx,js}'],
      exclude: ['src/**/*.stories.jsx']
    }
  }
})