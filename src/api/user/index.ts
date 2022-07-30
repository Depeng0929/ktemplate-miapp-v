import type { User } from './type'
import http from '~/utils/http'

export function fetchUser() {
  return http.get<User>('http://127.0.0.1:4523/m1/1339598-0-default/user')
}
