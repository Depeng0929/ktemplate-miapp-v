import { onShareAppMessage } from '@dcloudio/uni-app'

export function useShare(options: {
  title: string
  path: `/${string}`
  imageUrl: string
  desc?: string
}) {
  // #ifndef H5

  onBeforeMount(() => {
    // @ts-expect-error showShareMenu
    uni.showShareMenu()
  })

  onBeforeUnmount(() => {
    // @ts-expect-error showShareMenu
    uni.hideShareMenu()
  })

  // #endif

  onShareAppMessage(() => {
    return options
  })
}
