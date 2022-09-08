import { confirm } from '~/utils'

export function handleNoPermissions(url?: string) {
  return new Promise((resolve, reject) => {
    confirm('当前页面不可访问，请先登录!')
      .then(() => {
        const router = useRouter()
        router.push(
          '/pages/login/index',
          url
            ? {
                redirect: url,
              }
            : undefined,
        )
        reject(new Error('Not Allow'))
      })
      .catch(() => {
        reject(new Error('Not Allow'))
      })
  })
}
