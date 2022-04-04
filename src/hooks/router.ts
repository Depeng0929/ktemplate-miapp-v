/**
 * like vue-router
 */
import { urlParam } from '~/utils'

class AppRouter {
  go(n: number) {
    return uni.navigateBack({
      delta: parseInt(`${~n + 1}`),
    })
  }

  push(url: string, params: Record<string, string>) {
    return uni.navigateTo({
      url: this.setupParams(url, params),
    })
  }

  replace(url: string, params: Record<string, string>) {
    return uni.redirectTo({
      url: this.setupParams(url, params),
    })
  }

  switch(url: string) {
    return uni.switchTab({
      url,
    })
  }

  private setupParams(url: string, params: Record<string, string>) {
    return url += `?${urlParam(params)}`
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
