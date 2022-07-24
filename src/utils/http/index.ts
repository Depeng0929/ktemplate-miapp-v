import type { AjaxRequestConfig } from 'uni-ajax'
import fetch from './ajax'
import { asyncCacheFn } from '~/utils/asyncCacheFn'

const useFetch = asyncCacheFn(async(config: AjaxRequestConfig) => {
  return fetch(config)
}, {
  getKey: config => config[0].url,
})

export default useFetch
