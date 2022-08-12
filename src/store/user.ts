import { sleep } from '@depeng9527/tools'
import { defineStore } from 'pinia'
import { storage_token } from '~/logic/token'

// TODO: fetch in fetcher
export const useUserStore = defineStore('user', () => {
  const token = computed(() => {
    return storage_token.value
  })
  const userInfo = ref<any>(null)

  const hasUserInfo = computed(() => {
    return !!userInfo.value
  })

  async function fetchToken() {
    return sleep(2000, () => {
      storage_token.value = 'token'
    })
  }

  async function fetchUserInfo() {
    return sleep(2000, () => {
      userInfo.value = {
        name: 'depeng',
        age: 18,
      }
    })
  }

  return {
    token,
    hasUserInfo,
    fetchToken,
    fetchUserInfo,
  }
})
