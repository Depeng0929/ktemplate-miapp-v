import { whenever } from '~/composables/tools'
import { pageAllowAccess } from '~/logic/permission'

export function useFetch<T = unknown>(
  promiseFn: () => Promise<T>,
) {
  const route = useRoute()

  let isFetching = $ref(false)
  let error = $shallowRef(null)
  const data = shallowRef<T | null>(null)

  whenever(
    () => pageAllowAccess(route.path!),
    () => {
      isFetching = true
      return promiseFn()
        .then((res) => {
          data.value = res
        })
        .catch((err) => {
          error = err
        })
        .finally(() => {
          isFetching = false
        })
    },
  )

  return $$(
    {
      isFetching,
      error,
      data,
    },
  )
}
