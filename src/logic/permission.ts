import { ensurePrefix } from '@depeng9527/tools'

export function pagAllowAccess(url: string) {
  const path = ensurePrefix('/', url)
  const tabBarPages = [
    '/pages/index/index',
  ]
  const inWhitePageList = tabBarPages.includes(path)

  const hasLoggedIn = true

  return inWhitePageList || hasLoggedIn
}
