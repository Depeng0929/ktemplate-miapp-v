import type { Ref } from 'vue'

export type MayBeRef<T> = Ref<T> | T

export type RemovableRef<T> = Omit<Ref<T>, 'value'> & {
  get value(): T
  set value(value: T | null | undefined)
}
