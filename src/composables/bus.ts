import { getCurrentScope } from 'vue'
export type EventBusListener<T = unknown, P = any> = (payload?: P, event?: T) => void

/**
 * A basic event bus.
 *
 * @param key - unique key
 * @example
 * ```
 * // config.js
 * const bus = useEventBus('refresh')
 *
 * // 1.vue
 * bus.on((val) => {
 *  console.log(val)
 * })
 *
 * // 2.vue
 * bus.emit('test')
 * ```
 */
export function useEventBus<T extends string, P = any>(key: T) {
  const scope = getCurrentScope()

  function on(listener: EventBusListener<T, P>) {
    uni.$on(key, (data: P) => {
      listener(data, key)
    })
    const _off = () => off()

    // auto unsubscribe when scope get disposed
    scope?.cleanups?.push(_off)
  }

  function once(listener: EventBusListener<T, P>) {
    uni.$once(key, (data: P) => {
      listener(data, key)
      off()
    })
  }

  function off() {
    uni.$off(key)
  }

  function emit(payload: P) {
    uni.$emit(key, payload)
  }

  function clear() {
    uni.$off()
  }

  return {
    on,
    once,
    off,
    emit,
    clear,
  }
}
