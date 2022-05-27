import type { WatchCallback, WatchOptions, WatchSource } from 'vue'
import { watch } from 'vue'

export function useuseSearchParams() {
  const params = ref({})

  onLoad((options) => {
    params.value = options
  })

  return params
}

export function whenever<T>(source: WatchSource<T | false | null | undefined>, cb: WatchCallback<T>, options?: WatchOptions) {
  return watch(
    source,
    (v, ov, onInvalidate) => {
      if (v)
        cb(v, ov, onInvalidate)
    },
    options,
  )
}

export function useLoading<T = any>(
  promise:Promise<T> | ((...args: any[]) => Promise<T>), 
  title: string = '加载中'
) {
  const state = shallowRef<T | null>(null)
  const isLoading = ref(false)
  const error = shallowRef<unknown>(null)

  excute()

  return {
    state,
    isLoading
  }

  async function excute() {
    isLoading.value = true
    uni.showLoading({
      title
    })
    isLoading.value = true
    const _promise = typeof promise === 'function'
      ? promise()
      : promise
    try {
      const data = await _promise
      state.value = data
    }
    catch (e) {
      error.value = e
    }
    finally {
      isLoading.value = false
      uni.hideLoading()
    }
  }
}
