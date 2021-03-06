import { ensurePrefix, sleep } from '@depeng9527/tools'

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

/**
 * Preload
 * 确保用户信息已经加载完毕，然后执行回调函数
 */
export const loading = ref(false)
export const error = shallowRef(null)
export async function usePageShow<T = any>(fn: (...args: any[]) => Promise<T>|T | void) {
  const data = ref<T | null>(null)
  const route = useRoute()

  init()

  async function init() {
    // TODO: userInfo
    if (pageInWhiteList(route.path!)) {
      data.value = await fn() as any
      return
    }

    loading.value = true
    await sleep(1000)
      .catch((err) => {
        error.value = err
      })
    loading.value = false

    data.value = await fn() as any
  }

  return {
    loading,
    error,
    data,
  }
}
