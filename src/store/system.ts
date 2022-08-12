import { defineStore } from 'pinia'

export const useStystemStore = defineStore('system', () => {
  const rect = shallowRef({
    width: 0,
    height: 0,
  })

  async function initSystemInfo() {
    const {
      safeArea,
    } = await uni.getSystemInfo({}) as any

    if (safeArea) {
      rect.value = {
        width: safeArea.width,
        height: safeArea.height,
      }
    }
  }

  return {
    rect,
    initSystemInfo,
  }
})
