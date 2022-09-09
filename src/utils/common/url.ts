import { isEmpty, isNil, isString } from '@depeng9527/tools'
import qs from 'qs'
import type { IOnloadOptions, RoutePath } from '~/types'

/**
 * 组合url参数为字符串
 * @param json {object} 参数对象
 * @returns {string} 返回字符串
 */
export function paramStringify(json: Record<string, string | number | boolean>) {
  if (!json)
    return ''
  return qs.stringify(json, {
    encoder(str) {
      return encodeURIComponent(str)
    },
  })
}

// 获取url参数对象
export function urlParams<T extends Object>(url: string): T {
  const search = url.substring(url.lastIndexOf('?') + 1)
  return qs.parse(search) as any as T
}

// 分享点开后，参数解析
export function parseOnLoadOptions<T extends Object>(options: IOnloadOptions<T>): T {
  const { scene } = options
  const isFromScanCode = scene && isString(scene) && /\w+=\w+/g.test(scene)
  if (!isFromScanCode)
    return decodeParams(options)

  return urlParams(scene)

  function decodeParams<T extends Partial<Object>>(options: T): T {
    const result = {} as any
    Object.keys(options).forEach((key) => {
      // @ts-expect-error none
      result[decodeURIComponent(key)] = decodeURIComponent(options[key]!)
    })
    return result as T
  }
}

// 组合path和参数为跳转地址
export function setupParams(url: RoutePath, params?: Record<string, string>) {
  if (isNil(params) || isEmpty(params))
    return url

  return url += `?${paramStringify(params!)}`
}
