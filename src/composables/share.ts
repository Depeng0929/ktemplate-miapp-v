import { MayBeRef } from "~/types"

type ShareOptions = {
  title: string
  path: `/${string}`
  imageUrl?: string
}

export function useShare(options: MayBeRef<ShareOptions>) {
  const shareOptions = ref(options)

  onReady(() => {
    uni.showShareMenu({})
  })

  //TODO: up for application
  onBeforeUnmount(() => {
    // @ts-expect-error
    uni.hideShareMenu()
  })

  onShareAppMessage(() => {
    return shareOptions.value
  })
}
