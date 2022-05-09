import { debounce } from '@depeng9527/tools'

export function useButton(promiseFn: (...args: unknown[]) => Promise<unknown>) {
  const status = ref({
    loading: false,
    disabled: false,
  })

  const onClick = debounce(500, async() => {
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
