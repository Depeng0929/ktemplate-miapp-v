/**
 * like vue-router
 */
import { pagAllowAccess } from '~/logic/permission'
import { urlParamStr } from '~/utils'

class AppRouter {
  go(n: number) {
    return uni.navigateBack({
      delta: parseInt(`${~n + 1}`),
    })
  }

  push(url: string, params: Record<string, string>) {
    return this.checkPermission(url)
      .then(() => {
        return uni.navigateTo({
          url: this.setupParams(url, params),
        })
      })
  }

  replace(url: string, params: Record<string, string>) {
    return this.checkPermission(url)
      .then(() => {
        return uni.redirectTo({
          url: this.setupParams(url, params),
        })
      })
  }

  switch(url: string) {
    return this.checkPermission(url)
      .then(() => {
        return uni.switchTab({
          url,
        })
      })
  }

  private checkPermission(url: string) {
    return new Promise((resolve, reject) => {
      if (pagAllowAccess(url))
        resolve(true)
      else
        reject(new Error('Not Allow Access'))
    })
  }

  private setupParams(url: string, params: Record<string, string>) {
    return url += `?${urlParamStr(params)}`
  }
}

export function useRouter() {
  return new AppRouter()
}

export function useRoute() {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  return {
    path: page.route,
    query: (page as any).options,
  }
}
