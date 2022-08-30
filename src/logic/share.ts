import { onShareAppMessage } from '@dcloudio/uni-app'

export function useShare(options: {
  title: string
  path: `/${string}`
  imageUrl: string
  desc?: string
}) {
  onBeforeMount(() => {
    // @ts-expect-error showShareMenu
    uni.showShareMenu()
  })

  onBeforeUnmount(() => {
    // @ts-expect-error showShareMenu
    uni.hideShareMenu()
  })

  onShareAppMessage(() => {
    return options
  })
}
