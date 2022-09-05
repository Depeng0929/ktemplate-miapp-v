import type { User } from './type'
import http from '~/utils/http'
import { transformUser } from '~/api/user/transform'

export async function fetchUser() {
  const user = await http.get<any, User>('/api/user')
  return transformUser(user)
}
