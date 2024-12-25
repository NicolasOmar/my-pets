import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@molecules':  '/src/components/molecules',
      '@organisms':  '/src/components/organisms',
      '@templates':  '/src/components/templates',
      '@pages':  '/src/components/pages',
      '@constants':  '/src/constants',
      '@context':  '/src/context',
      '@functions':  '/src/functions',
      '@graphql':  '/src/graphql',
      '@interfaces':  '/src/interfaces',
      '@hooks':  '/src/hooks',
    }
  }
})
