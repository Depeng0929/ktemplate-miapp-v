import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup'
import uni from '@dcloudio/vite-plugin-uni'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import { createUniHelperPlugin } from './uni-helper'
import { createAutoImport } from './auto-import'

export function createVitePlugins() {
  const plugins = [
    Components({
      types: [],
    }),
    uni({
      vueOptions: {
        reactivityTransform: true,
      },
      viteLegacyOptions: {
        targets: ['defaults', 'android >= 6', 'ios >= 10'],
      },
    }),
    WindiCSS(),
    MiniProgramTailwind(),
    createAutoImport(),
    ...createUniHelperPlugin(),
  ]

  return plugins
}
