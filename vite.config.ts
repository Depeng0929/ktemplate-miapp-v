import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    uni(),
    WindiCSS(),
    Components(),
    AutoImport({
      imports: [
        'vue',
        {
          '~/composables/router': [
            'useRouter',
            'useRoute',
          ],
        },
        {
          '@depeng9527/tools': [
            'debug',
          ],
        },
        {
          '@dcloudio/uni-app': [
            'onReady',
            'onHide',
            'onLaunch',
            'onLoad',
            'onReachBottom',
            'onPullDownRefresh',
            'onShareAppMessage',
          ],
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "~/styles/ui.scss";',
      },
    },
  },
})
