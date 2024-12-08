import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watch: false,
    reporters: 'verbose',
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{tsx.ts}'],
    // setupFiles: ['./tests/setup.js'],
    coverage: {
      include: ['src/**/*.{tsx.ts}'],
      exclude: ['src/**/*.stories.jsx'],
      reporter: ['html', 'lcov']
    }
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@constants': '/src/constants',
      '@context': '/src/context',
      '@functions': '/src/functions',
      '@graphql': '/src/graphql',
      '@types': '/src/types'
    }
  }
})