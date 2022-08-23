import { useStystemStore } from '~/store/system'

export function setupSystem() {
  const { initSystemInfo } = useStystemStore()

  onLaunch(() => {
    initSystemInfo()
  })
}
