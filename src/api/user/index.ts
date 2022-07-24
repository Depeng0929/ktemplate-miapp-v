import useFetch from '~/utils/http/index'

export async function fetchUser() {
  return useFetch<User>({
    url: 'http://127.0.0.1:4523/m1/1339598-0-default/user',
    method: 'GET',
  })
}
