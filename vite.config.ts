import path from 'path'
import { defineConfig } from 'vitest/config'
import visualizer from 'rollup-plugin-visualizer'

import { createProxyServer } from './build/proxy'
import { createVitePlugins } from './build/plugins'

export default defineConfig({
  test: {},

  optimizeDeps: {
    exclude: ['@depeng9527/tools'],
  },

  build: process.env.NODE_ENV === 'production'
    ? {
      target: 'es2015',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      rollupOptions: {
        plugins: [
          process.env.NODE_ENV === 'production' && visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
          }),
        ],
      },
    }
    : undefined,

  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  server: createProxyServer(),

  plugins: [
    ...createVitePlugins(),
  ],
})
