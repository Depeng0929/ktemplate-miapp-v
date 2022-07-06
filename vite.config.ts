import path from 'path'
import { defineConfig } from 'vitest/config'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup'

export default defineConfig({
  test: {},
  build: process.env.NODE_ENV === 'production'
    ? {
      // TODO: change false in production
      sourcemap: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    }
    : undefined,
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
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
    Components({
      types: [],
    }),
    uni({
      vueOptions: {
        reactivityTransform: true,
      },
    }),
    WindiCSS(),
    MiniProgramTailwind(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        {
          '~/composables/router': [
            'useRouter',
            'useRoute',
          ],
        },
        {
          '~/utils/tools': [
            'toast',
            'alert',
            'confirm',
            'showLoading',
            'hideLoading',
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
      vueTemplate: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "~/styles/vars.scss";',
      },
    },
  },

})
