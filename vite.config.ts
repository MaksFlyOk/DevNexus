import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    base: env.VITE_APP_BASE_URL,

    resolve: {
      alias: {
        '@styles': '/src/assets/styles',
        '@images': '/src/assets/images',
        '@mocks': '/src/assets/mocks',
        '@layout': '/src/components/layout',
        '@screens': '/src/components/screens',
        '@ui': '/src/components/ui',
        '@dev': '/src/components/dev',
        '@hooks': '/src/hooks',
        '@redux': '/src/redux',
        '@services': '/src/services',
        '@types': '/src/types',
        '@utils': '/src/utils',
        '@axios': '/src/api.ts',
        '@bootstrap': '/node_modules/bootstrap/scss/bootstrap.scss'
      }
    }
  }
})
