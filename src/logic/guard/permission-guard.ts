import { ensurePrefix } from '@depeng9527/tools'
import { storage_token } from '~/logic/storage'
import type { RoutePath } from '~/types'
import { tabbarPaths } from '~/config/tabbar'

export function pageInWhiteList(url: RoutePath) {
  const path = ensurePrefix('/', url)
  // TODO: add page white list
  const whiteList: string[] = [
    ...tabbarPaths,
    '/pages/login/index',
  ]
  return whiteList.includes(path)
}

export function pageAllowAccess(url: RoutePath) {
  const hasLogin = storage_token.value
  return pageInWhiteList(url) || hasLogin
}
