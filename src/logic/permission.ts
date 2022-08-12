import { ensurePrefix } from '@depeng9527/tools'
import { storage_token } from '~/logic/token'
import { useUserStore } from '~/store/user'
import type { RoutePath } from '~/types'

export function pageInWhiteList(url: RoutePath) {
  const path = ensurePrefix('/', url)
  // TODO: add page white list
  const whiteList: string[] = [
    '/pages/index/index',
    '/pages/login/index',
  ]
  return whiteList.includes(path)
}

export function pageAllowAccess(url: RoutePath) {
  const hasLogin = storage_token.value
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
  const userStore = useUserStore()

  init()

  async function init() {
    if (userStore.hasUserInfo) {
      data.value = await fn() as any
      return
    }

    loading.value = true
    await userStore.fetchUserInfo()
    loading.value = false

    data.value = await fn() as any
  }

  return {
    loading,
    error,
    data,
  }
}
