// import type { AjaxRequestConfig } from 'uni-ajax'
import fetch from './ajax'
// import { asyncCacheFn } from '~/utils/asyncCacheFn'

// const cacheFetch = (options: AjaxRequestConfig) => {
//   return asyncCacheFn(async(options: AjaxRequestConfig) => {
//     const data = await fetch(options)
//     return data
//   }, {
//     getKey: (...args) => args[0].url!,
//   })
// }

export default fetch
