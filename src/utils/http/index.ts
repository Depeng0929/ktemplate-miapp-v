import type { AjaxResponse } from 'uni-ajax'
import ajax from 'uni-ajax'

const index = ajax.create({
  baseURL: import.meta.env.VITE_APP_API,
  header: {
    'content-type': 'application/json',
  },
})

index.interceptors.request.use(
  (config) => {
    config.header = Object.assign({}, config.header, { auth: 'auth' })
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
index.interceptors.response.use(
  (response: AjaxResponse<API.ResponseData>) => {
    const res = response.data
    if (
      res && res.code === 200
    ) {
      return res.data || res
    }
    else {
      handlerError(res)
      return Promise.reject(res)
    }
  },
  (error) => {
    const res
      = error.response
      && (error.response.data || error.response)
    return Promise.reject(res || 'error')
  },
)
export default index

// 错误处理
function handlerError(response: API.ResponseData) {
  const strategy: Record<number, () => void> = {
    402: () => {
      // 这里可以做一些登录失效的处理
    },
  }

  const code = response.code
  if (code && strategy[code]) {
    return strategy[code]()
  }
  else {
    const msg = response.msg
    msg && uni.showToast({
      icon: 'none',
      title: msg,
    })
  }
}
