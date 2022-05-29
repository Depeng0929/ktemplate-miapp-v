import type { UnwrapNestedRefs } from 'vue'

export interface ListOptions<T> {
  fetch: (page: API.PageDTO) => Promise<API.List<T>>
  size?: number
  immediately?: boolean
}

export type ListStatus = UnwrapNestedRefs<{
  show: boolean
  loading: boolean
  isFinish: boolean
  isEmpty: boolean
}>
