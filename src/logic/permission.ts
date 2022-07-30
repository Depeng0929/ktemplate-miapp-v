import { ensurePrefix } from '@depeng9527/tools'

export function pageInWhiteList(url: string) {
  const path = ensurePrefix('/', url)
  // TODO: add page white list
  const whiteList: string[] = [
    '/pages/index/index',
  ]
  return whiteList.includes(path)
}

export function pageAllowAccess(url: string) {
  // TODO: maybe token exist
  const hasLogin = true

  return pageInWhiteList(url) || hasLogin
}
