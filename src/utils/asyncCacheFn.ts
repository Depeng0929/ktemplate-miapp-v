import { LRU } from '@depeng9527/k-data'
import type { ShallowRef } from 'vue'

export function asyncCacheFn<R, A extends unknown[], K = string>(
  fn: (...args: A) => Promise<R>,
  options: AsyncCacheFnOptions<A, R, K> = {},
) {
  const {
    getKey = (args: A) => JSON.stringify(args),
  } = options

  const lru = new LRU<R, K | string>()
  const pendding = new Set<Promise<R>>()

  const wrapper = ((...args: A) => {
    const result = shallowRef<R | null>(null)
    const key = getKey(args)
    if (lru.has(key))
      result.value = lru.get(key)!

    const promise = Promise.resolve(fn(...args))

    promise.finally(() => {
      pendding.delete(promise)
    }).then((res) => {
      result.value = res
      lru.add(key, res)
      return result
    })
    pendding.add(promise)

    return result
  }) as AsyncCacheFn<R, A>

  wrapper.clear = () => lru.clear()

  return wrapper
}

interface AsyncCacheFnOptions<A extends any[], R, K = string> {
  getKey?: (...args: A) => K
}

interface AsyncCacheFn<R, A extends any[]> {
  (...args: A): ShallowRef<R | null>
  clear(): void
}
