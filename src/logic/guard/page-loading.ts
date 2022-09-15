import { useUserStore } from '~/store/user'

/**
 * Preload
 * 确保用户信息已经加载完毕，然后执行回调函数
 */
export const loading = ref(false)
export const error = shallowRef(null)
export async function useEnsureUserInfo<T = any>(fn: (...args: any[]) => Promise<T> | T | void) {
  const userStore = useUserStore()

  onBeforeMount(() => {
    init()
  })

  async function init() {
    // 用户信息已存在
    if (userStore.hasUserInfo) {
      fn()
      return
    }

    // 无用户信息，获取用户信息
    loading.value = true
    await userStore.fetchUserInfo()
    loading.value = false

    fn()
  }

  return {
    loading,
    error,
  }
}
