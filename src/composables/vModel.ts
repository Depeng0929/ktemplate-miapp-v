import { isUndefined } from '@depeng9527/tools'
import type { ToRefs, UnwrapRef } from 'vue'

import { computed, getCurrentInstance, ref, watch } from 'vue'

export interface VModelOptions<T> {
  /**
   * When passive is set to `true`, it will use `watch` to sync with props and ref.
   * Instead of relying on the `v-model` or `.sync` to work.
   *
   * @default false
   */
  passive?: boolean
  /**
   * When eventName is set, it's value will be used to overwrite the emit event name.
   *
   * @default undefined
   */
  eventName?: string
  /**
   * Attempting to check for changes of properties in a deeply nested object or array.
   * Apply only when `passive` option is set to `true`
   *
   * @default false
   */
  deep?: boolean
  /**
   * Defining default value for return ref when no value is passed.
   *
   * @default undefined
   */
  defaultValue?: T
}

/**
 * Shorthand for v-model binding, props + emit -> ref
 *
 * @example
 * ```
 * const data = useVModel(props, 'data', emit)
 * data.value = 'foo' // emit('update:data', 'foo')
 * ```
 */
export function useVModel<P extends object, K extends keyof P, Name extends string>(
  props: P,
  key?: K,
  emit?: (name: Name, ...args: any[]) => void,
  options: VModelOptions<P[K]> = {},
) {
  const {
    passive = false,
    eventName,
    deep = false,
    defaultValue,
  } = options

  const vm = getCurrentInstance()
  // @ts-expect-error mis-alignment with @vue/composition-api
  const _emit = emit || vm?.emit || vm?.$emit?.bind(vm)
  let event: string | undefined = eventName

  if (!key)
    key = 'modelValue' as K

  event = eventName || event || `update:${key!.toString()}`

  const getValue = () => !isUndefined(props[key!]) ? props[key!] : defaultValue

  if (passive) {
    const proxy = ref<P[K]>(getValue()!)

    watch(() => props[key!], v => proxy.value = v as UnwrapRef<P[K]>)

    watch(proxy, (v) => {
      if (v !== props[key!] || deep)
        _emit(event, v)
    }, {
      deep,
    })

    return proxy
  }
  else {
    return computed<P[K]>({
      get() {
        return getValue()!
      },
      set(value) {
        _emit(event, value)
      },
    })
  }
}

/**
 * @example
 * ```
 * const { foo, bar } = useVModels(props, emit)
 *
 * foo.value = 'foo' // emit('update:foo', 'foo')
 * ```
 */
export function useVModels<P extends object, Name extends string>(
  props: P,
  emit?: (name: Name, ...args: any[]) => void,
  options: VModelOptions<any> = {},
): ToRefs<P> {
  const ret: any = {}
  // eslint-disable-next-line no-restricted-syntax
  for (const key in props)
    ret[key] = useVModel(props, key, emit, options)
  return ret
}
