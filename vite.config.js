import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    watch: false,
    reporters: 'verbose',
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{jsx,js}'],
    setupFiles: ['./tests/setup.js'],
    coverage: {
      provider: 'istanbul',
      include: ['src/components/**/*', 'src/functions/**/*'],
      exclude: ['src/**/*.stories.jsx'],
      thresholds: {
        branches: 80,
        lines: 80,
        functions: 80,
        statements: 80
      }
    }
  }
})
