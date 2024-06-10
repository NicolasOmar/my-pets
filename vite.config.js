import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@context', replacement: '/src/context' },
      { find: '@functions', replacement: '/src/functions' },
      { find: '@graphql', replacement: '/src/graphql' },
      { find: '@types', replacement: '/src/types' }
    ]
  }
})
