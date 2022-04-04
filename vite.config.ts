import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    uni(),
    AutoImport({
      imports: [
        'vue',
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "~/styles/variable.scss";',
      },
    },
  },
})
