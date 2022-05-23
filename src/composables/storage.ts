import { ref, shallowRef, unref, watch } from 'vue'
import type { MayBeRef, RemovableRef } from '~/types'

interface Serializer<T> {
  read(raw: string): T
  write(value: T): string
}
interface StorageOptions {
  /**
 * Is initialValue shallow?
 * @default false
 */
  shallow?: boolean
}

export function guessSerializerType<T extends(string | number | boolean | object | null)>(rawInit: T) {
  return rawInit == null
    ? 'any'
    : typeof rawInit === 'boolean'
      ? 'boolean'
      : typeof rawInit === 'string'
        ? 'string'
        : typeof rawInit === 'object'
          ? 'object'
          : Array.isArray(rawInit)
            ? 'object'
            : !Number.isNaN(rawInit)
              ? 'number'
              : 'any'
}

const StorageSerializers: Record<'boolean' | 'object' | 'number' | 'string' | 'any', Serializer<any>> = {
  boolean: {
    read: (v: any) => v === 'true',
    write: (v: any) => String(v),
  },
  object: {
    read: (v: any) => JSON.parse(v),
    write: (v: any) => JSON.stringify(v),
  },
  number: {
    read: (v: any) => Number.parseFloat(v),
    write: (v: any) => String(v),
  },
  string: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  any: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
}

/**
 * reactive storeage
 *
 * @param key{string} - uni strage key
 * @param initialValue{unknown}
 * @returns value{unknown}
 * @example
 * ```
 * const state = useStorage('my-store', { hello: 'hi', greeting: 'Hello' })
 * ```
 */
export function useStorage(key: string, initialValue: MayBeRef<string>, options?: StorageOptions): RemovableRef<string>
export function useStorage(key: string, initialValue: MayBeRef<boolean>, options?: StorageOptions): RemovableRef<boolean>
export function useStorage(key: string, initialValue: MayBeRef<number>, options?: StorageOptions): RemovableRef<number>
export function useStorage<T>(key: string, initialValue: MayBeRef<T>, options?: StorageOptions): RemovableRef<T>
export function useStorage<T = unknown>(key: string, initialValue: MayBeRef<null>, options?: StorageOptions): RemovableRef<T>
export function useStorage<T extends(string | number | object | boolean | null)>(
  key: string,
  initialValue: MayBeRef<T>,
  options: StorageOptions = {},
) {
  const {
    shallow = false,
  } = options

  const data = (shallow ? shallowRef : ref)(initialValue)
  const rawInit = unref(data)
  const type = guessSerializerType(rawInit)

  const serializer = StorageSerializers[type]

  update()

  watch(data,
    (v) => {
      write(v)
    }, { immediate: true, deep: true },
  )

  return data

  function update() {
    data.value = read()
  }

  function write(v: unknown) {
    if (v == null || v === '')
      uni.removeStorageSync(key)
    else
      uni.setStorageSync(key, serializer.write(v))
  }

  function read() {
    const v = uni.getStorageSync(key)
    if (v == null || v === '') {
      write(rawInit)
      return rawInit
    }
    else if (typeof v !== 'string') {
      return v
    }
    return serializer.read(v)
  }
}
