import type { MayBeRef } from '~/types'

/**
 * clipboard
 *
 * @example
 * ```
 * const { text, read, copy } = useClipboard()
 * console.log(text.value) // read in created
 * read() // read clipboard
 * copy('test') // copy value into clipboard
 * ```
 */
export function useClipboard() {
  const text = ref('')

  read()

  async function copy(t: MayBeRef<string>) {
    if (unref(t))
      uni.setClipboardData({ data: unref(t) })
  }

  async function read() {
    uni.getClipboardData({
      success(res) {
        text.value = res.data
      },
    })
  }

  return {
    text,
    copy,
    read,
  }
}
