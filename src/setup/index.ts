import { setupSystem } from './system'
import { checkVersion } from './updater'

export function setup() {
  setupSystem()
  checkVersion()

  // #ifndef H5
  // @ts-expect-error hideShareMenu
  uni.hideShareMenu()
  // #endif
}
