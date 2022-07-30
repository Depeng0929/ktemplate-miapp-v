import type { AjaxRequestConfig } from 'uni-ajax'
import fetch from './ajax'
import { asyncCacheFn } from '~/utils/asyncCacheFn'
import { pageAllowAccess } from '~/logic/permission'

const useFetch = asyncCacheFn(async(config: AjaxRequestConfig) => {
  // auth
  const route = useRoute()
  if (!pageAllowAccess(route.path))
    return Promise.reject(new Error('not allow access'))

  // fetch
  return fetch(config)
}, {
  getKey: config => config[0].url,
})

export default useFetch
