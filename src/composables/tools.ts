import type { WatchCallback, WatchOptions, WatchSource } from 'vue'
import { watch } from 'vue'
import { parseOnLoadOptions } from '~/utils'
import { hideLoading, showLoading } from '~/utils/index'

export function useSearchParams<T extends Record<string, string>>() {
  const params = ref<T>({} as T)

  onLoad((options) => {
    params.value = parseOnLoadOptions<T>(options as T)
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

export function useAsyncState<T = any>(
  promise: Promise<T> | ((...args: any[]) => Promise<T>),
  title = '加载中',
) {
  const state = shallowRef<T | null>(null)
  const isLoading = ref(false)
  const error = shallowRef<unknown>(null)

  excute()

  return {
    state,
    isLoading,
  }

  async function excute() {
    isLoading.value = true
    showLoading(title)
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
      hideLoading()
    }
  }
}
