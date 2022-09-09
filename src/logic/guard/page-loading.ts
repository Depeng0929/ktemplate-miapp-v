import { onShow } from '@dcloudio/uni-app'
import { handleNoPermissions } from './intercept'
import { useUserStore } from '~/store/user'
import { pageAllowAccess } from '~/logic/guard/permission-guard'
import { setupParams } from '~/utils/common/url'
import { useSearchParams } from '~/composables/tools'

/**
 * Preload
 * 确保用户信息已经加载完毕，然后执行回调函数
 */
export const loading = ref(false)
export const error = shallowRef(null)
export async function usePageShow<T = any>(fn: (...args: any[]) => Promise<T> | T | void) {
  const userStore = useUserStore()
  const query = useSearchParams()
  const route = useRoute()

  const data = ref<T | null>(null)

  watch(() => query.value, () => {
    checkPermission().then(() => {
      init()
    })
  })

  onShow(() => {
    checkPermission()
  })

  async function init() {
    // 用户信息已存在
    if (userStore.hasUserInfo) {
      data.value = await fn() as any
      return
    }

    // 无用户信息，获取用户信息
    loading.value = true
    await userStore.fetchUserInfo()
    loading.value = false

    data.value = ((await fn()) as any)
  }

  function checkPermission() {
    return new Promise((resolve) => {
      // 没有token
      if (!pageAllowAccess(route.path)) {
        const url = setupParams(route.path, query.value)
        return handleNoPermissions(url)
      }

      return resolve('ok')
    })
  }

  return {
    loading,
    error,
    data,
  }
}
