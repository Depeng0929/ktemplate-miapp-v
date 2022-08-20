import type { InjectionKey } from 'vue'

interface ICheckGroup {
  value: Array<number | string>
  size: 'mini' | 'default'
}

export const injectionCheckGroup: InjectionKey<ICheckGroup> = 'check-group' as any
