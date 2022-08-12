import { useStorage } from '~/composables/storage'
import { STORAGE_KEY } from '~/constants'

export const storage_token = useStorage<string|null>(STORAGE_KEY, null)
