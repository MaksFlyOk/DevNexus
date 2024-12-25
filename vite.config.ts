import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@styles': '/src/assets/styles',
      '@images': '/src/assets/images',
      '@mocks': '/src/assets/mocks',
      '@layout': '/src/components/layout',
      '@screens': '/src/components/screens',
      '@ui': '/src/components/ui',
      '@hooks': '/src/hooks',
      '@redux': '/src/redux',
      '@services': '/src/services',
      '@types': '/src/types',
      '@utils': '/src/utils',
      '@axios': '/src/api.ts',
      '@bootstrap': '/node_modules/bootstrap/scss/bootstrap.scss'
    }
  }
})
