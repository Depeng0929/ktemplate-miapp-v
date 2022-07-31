import { LRU } from '@depeng9527/k-data'

export function asyncCacheFn<R, A extends unknown[], K = string>(
  fn: (...args: A) => Promise<R>,
  options: AsyncCacheFnOptions<A, K> = {},
) {
  const {
    getKey = (args: A) => JSON.stringify(args),
  } = options

  const lru = new LRU<R, K | string>()
  const pendding = new Set<Promise<R>>()

  const wrapper = (...args: A) => {
    const key = getKey(args)

    if (lru.has(key))
      return lru.get(key)!

    const promise = Promise.resolve(fn(...args))

    promise.then((res) => {
      lru.add(key, res)
      return res
    }).finally(() => {
      pendding.delete(promise)
    })

    pendding.add(promise)

    return promise
  }
  wrapper.clear = () => lru.clear()

  return wrapper
}

interface AsyncCacheFnOptions<A extends any[], K = string> {
  getKey?: (args: A) => K
}
