import { describe, expect, it } from 'vitest'
import { getExtName, isVideo } from '~/utils'

describe('utils/url', () => {
  it('urlParamStr', () => {
    expect(isVideo('intro-video.mp4')).toBeTruthy()
    expect(isVideo('intro-video.png')).toBeFalsy()
  })
  it('getExtName', () => {
    expect(getExtName('intro-video.mp4')).toBe('mp4')
    expect(getExtName('intro-video.png')).toBe('png')
    expect(getExtName('1.intro-video.png')).toBe('png')
  })
})
