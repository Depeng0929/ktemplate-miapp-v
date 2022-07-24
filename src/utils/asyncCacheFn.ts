import { LRU } from '@depeng9527/k-data'
import type { Ref, ShallowRef } from 'vue'

export function asyncCacheFn<R, A extends unknown[], K = string>(
  fn: (...args: A) => Promise<R>,
  options: AsyncCacheFnOptions<A, K> = {},
) {
  const {
    getKey = (args: A) => JSON.stringify(args),
  } = options

  const lru = new LRU<R, K | string>()
  const pendding = new Set<Promise<R>>()

  const wrapper = ((...args: A) => {
    const data = shallowRef<R | null>(null)
    const loadding = ref(false)
    const error = shallowRef(null)

    const key = getKey(args)

    if (lru.has(key))
      data.value = lru.get(key)!

    const promise = Promise.resolve(fn(...args))

    loadding.value = true
    promise.then((res) => {
      data.value = res
      lru.add(key, res)
    }).catch((err) => {
      error.value = err
    }).finally(() => {
      loadding.value = false
      pendding.delete(promise)
    })

    pendding.add(promise)

    return {
      data,
      loadding,
      error,
    }
  }) as asyncFunction<A>
  // https://blog.csdn.net/weixin_43477825/article/details/119912771
  wrapper.clear = () => lru.clear()

  return wrapper
}

interface AsyncCacheFnOptions<A extends any[], K = string> {
  getKey?: (args: A) => K
}

interface asyncFunction<A extends any[]> {
  <T = unknown>(...args: A): {
    data: ShallowRef<T>
    loadding: Ref<boolean>
    error: ShallowRef<any>
  }
  clear: () => void
}
