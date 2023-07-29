import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src', 'components'),
      hooks: path.resolve(__dirname, 'src', 'hooks'),
      routes: path.resolve(__dirname, 'src', 'routes'),
      services: path.resolve(__dirname, 'src', 'services'),
      assets: path.resolve(__dirname, 'src', 'assets'),
      context: path.resolve(__dirname, 'src', 'context'),
      translations: path.resolve(__dirname, 'src', 'translations'),
      utils: path.resolve(__dirname, 'src', 'utils'),
      api: path.resolve(__dirname, 'src', 'api'),
    },
  },
  plugins: [react(), svgr()],
})
