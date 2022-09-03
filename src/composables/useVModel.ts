export function useVModel<P extends Object, K extends keyof P, N extends string>(
  props: P,
  key?: K,
  emit?: (name: N, ...args: any[]) => void,
) {
  if (!key)
    key = 'modelValue' as K

  const vm = getCurrentInstance()
  // @ts-expect-error mis-alignment with @vue/composition-api
  const _emit = emit || vm?.emit || vm?.$emit?.bind(vm) || vm?.proxy?.$emit?.bind(vm?.proxy)
  const event = `update:${key!.toString()}`

  const getValue = () => props[key!]

  return computed<P[K]>({
    get() {
      return getValue()
    },
    set(value) {
      _emit(event, value)
    },
  })
}
