import type { AjaxRequestConfig } from 'uni-ajax'
import ajax from 'uni-ajax'

import { reqResolver, requestInterceptors, responeResolver, responseInterceptors } from './interceptors'

function createAxios(options: AjaxRequestConfig = {}) {
  const defaultOptions = {
    baseURL: import.meta.env.VITE_APP_API,
    header: {
      'content-type': 'application/json',
    },
  }

  const service = ajax.create({
    ...defaultOptions,
    ...options,
  })
  service.interceptors.request.use(requestInterceptors, reqResolver)
  service.interceptors.response.use(responseInterceptors, responeResolver)

  return service
}

export default createAxios()

export const testRequest = createAxios({
  baseURL: 'http://localhost:3000',
})
