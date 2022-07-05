import { ensurePrefix } from '@depeng9527/tools'

export function pageAllowAccess(url: string) {
  const path = ensurePrefix('/', url)
  const tabBarPages = [
    '/pages/index/index',
  ]
  const inWhitePageList = tabBarPages.includes(path)

  const hasLoggedIn = true

  return inWhitePageList || hasLoggedIn
}
