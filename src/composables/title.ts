import { sleep } from '@depeng9527/tools'
import { isString } from 'windicss/utils'
import type { MayBeRef } from '~/types'

/**
 * change document.title
 *
 * @example
 * ```
 * const title = useTitle(kdp)
 * title.value = 'kkk'
 * ```
 */
export function useTitle(
  newTitle: MayBeRef<string | null | undefined> = null,
) {
  const title = ref(newTitle ?? null)

  onReady(() => {
    setTitle()
  })

  watch(title, (t, o) => {
    if (t !== o) {
      sleep(500, () => {
        setTitle()
      })
    }
  })

  function setTitle() {
    if (isString(title.value) && title.value) {
      uni.setNavigationBarTitle({
        title: title.value,
      })
    }
  }

  return title
}
