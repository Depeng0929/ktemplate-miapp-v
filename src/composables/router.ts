/**
 * like vue-router
 */
import type { IOnloadOptions, RoutePath } from '~/types'
import { pageAllowAccess } from '~/logic/guard/permission-guard'
import { parseOnLoadOptions, urlParamStr } from '~/utils'

class AppRouter {
  go(n: number) {
    return uni.navigateBack({
      delta: parseInt(`${~n + 1}`),
    })
  }

  push(url: RoutePath, params?: Record<string, string>) {
    return this.checkPermission(url)
      .then(() => {
        return uni.navigateTo({
          url: this.setupParams(url, params),
        })
      })
  }

  replace(url: RoutePath, params?: Record<string, string>) {
    return this.checkPermission(url)
      .then(() => {
        return uni.redirectTo({
          url: this.setupParams(url, params),
        })
      })
  }

  switch(url: RoutePath) {
    return this.checkPermission(url)
      .then(() => {
        return uni.switchTab({
          url,
        })
      })
  }

  private checkPermission(url: RoutePath) {
    return new Promise((resolve, reject) => {
      if (pageAllowAccess(url))
        resolve(true)
      else
        reject(new Error('Not Allow Access'))
    })
  }

  private setupParams(url: RoutePath, params?: Record<string, string>) {
    if (!params)
      return url
    return url += `?${urlParamStr(params)}`
  }
}

export function useRouter() {
  return new AppRouter()
}

export function useRoute<T extends Object>() {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  const options = (page as any).options as IOnloadOptions<T>

  return {
    path: `/${page.route}` as RoutePath,
    query: parseOnLoadOptions<T>(options || {}),
  }
}
