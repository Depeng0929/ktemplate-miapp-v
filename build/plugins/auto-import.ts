import AutoImport from 'unplugin-auto-import/vite'

export function createAutoImport() {
  return AutoImport({
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
        '~/logic/page-loading': [
          'usePageShow',
        ],
      },
      {
        '~/utils/index': [
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
  })
}
