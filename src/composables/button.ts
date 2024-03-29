import { debounce } from '@depeng9527/tools'

export interface ButtonStatus {
  loading: boolean
  disabled: boolean
}
/**
 * debonce button hooks
 *
 * @param promiseFn - The function that return promise
 * @returns { status: { loading: boolean, disabled: boolean }, onClick: () => void }
 * @example
 * ```
 * function onClick() {
 *  return new Promise((resolve) => {
 *    setTimeout(() => {
 *      resolve(1)
 *    }, 2000)
 *  })
 * }
 * const submit = reactive(useButton(onClick))
 * ```
 */
export function useButton(
  promiseFn: (...args: unknown[]) => Promise<unknown>,
  throttleTime = 0,
) {
  const status = ref<ButtonStatus>({
    loading: false,
    disabled: false,
  })

  const onClick = debounce(throttleTime, async () => {
    status.value = {
      loading: true,
      disabled: true,
    }

    await promiseFn()

    status.value = {
      loading: false,
      disabled: false,
    }
  })

  return {
    status,
    onClick,
  }
}
