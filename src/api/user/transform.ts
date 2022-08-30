import { pick } from '@depeng9527/tools'
import type { User } from '~/api/user/type';

export function transformUser(rawUser: User) {
  const user = pick(['id', 'name'], rawUser)
  return user
}
