import { isString } from '@depeng9527/tools'
import type { IOnloadOptions } from '~/types'

/**
 * 组合url参数为字符串
 * @param json {object} 参数对象
 * @returns {string} 返回字符串
 */
export function urlParamStr(json: Record<string, string|number|boolean>) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return ''
      return `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`
    }),
  ).join('&')

  function cleanArray(actual: string[]) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
      if (actual[i])
        newArray.push(actual[i])
    }
    return newArray
  }
}

export function getQueryObject<T extends Object>(url: string): T {
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {} as any
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj as T
}

export function parseOnLoadOptions<T = {}>(options: IOnloadOptions<T>): T {
  const { scene } = options
  const isFromScanCode = scene && isString(scene) && /\w+=\w+/g.test(scene)
  if (!isFromScanCode) return decodeParams(options)

  return getQueryObject(scene)

  function decodeParams<T extends Partial<Record<string, string>>>(options: T): T {
    const result = {} as any
    Object.keys(options).forEach((key) => {
      result[key] = decodeURIComponent(options[key]!)
    })
    return result as T
  }
}
