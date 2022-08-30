import { setupSystem } from './system'
import { checkVersion } from './updater'

export function setup() {
  setupSystem()
  checkVersion()

  // @ts-expect-error hideShareMenu
  uni.hideShareMenu()
}
