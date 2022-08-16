import type { User } from './type'
import http from '~/utils/http'

export function fetchUser() {
  return http.get<User>('/api/user')
}
