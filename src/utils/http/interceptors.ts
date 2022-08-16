import type { AjaxRequestConfig, AjaxResponse } from 'uni-ajax';

export function requestInterceptors(config: AjaxRequestConfig) {
  config.header = Object.assign(
    {},
    config.header,
    // setToken
    { auth: 'auth' },
  )
  return config
}

export function responseInterceptors(response: AjaxResponse<API.ResponseData>) {
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
}

export function reqResolver(error: any) {
  return Promise.reject(error)
}

export function responeResolver(error: any) {
  const res
  = error.response
  && (error.response.data || error.response)
  return Promise.reject(res || 'error')
}

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
