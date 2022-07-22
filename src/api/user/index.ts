import http from '~/utils/http'

export async function fetchUser() {
  const data = await http({
    url: '/user',
    method: 'GET',
  })
  return data
}
