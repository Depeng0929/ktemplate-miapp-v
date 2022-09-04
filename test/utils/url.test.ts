import { describe, expect, it } from 'vitest'
import { paramStringify, parseOnLoadOptions, urlParams } from '~/utils'

describe('utils/url', () => {
  it('urlParamStr', () => {
    expect(paramStringify({ name: 2, age: '12' })).toBe('name=2&age=12')
    expect(paramStringify({ url: 'http://www.baidu.com' })).toEqual('url=http%3A%2F%2Fwww.baidu.com')
  })

  it('getQueryObject', () => {
    expect(urlParams('https://www.baidu.com/?tn=34131172_13_oem_dg')).toEqual({
      tn: '34131172_13_oem_dg',
    })
    expect(urlParams('https://www.4399.com?url=http%3A%2F%2Fwww.baidu.com')).toEqual({
      url: 'http://www.baidu.com',
    })
  })

  it('parseOnLoadOptions', () => {
    expect(parseOnLoadOptions({ name: 'age', age: '12' })).toEqual({ name: 'age', age: '12' })
    expect(parseOnLoadOptions({ name: 'https%3A%2F%2Fwww.baidu.com%2F%3Ftn%3D34131172_13_oem_dg', age: '12' })).toEqual({ name: 'https://www.baidu.com/?tn=34131172_13_oem_dg', age: '12' })
    expect(parseOnLoadOptions({ scene: 'id=https%3A%2F%2Fwww.baidu.com%2F%3Ftn%3D34131172_13_oem_dg', age: '12' })).toEqual({ id: 'https://www.baidu.com/?tn=34131172_13_oem_dg' })
    expect(parseOnLoadOptions({ scene: 1, age: '12' })).toEqual({ scene: '1', age: '12' })
  })
})
