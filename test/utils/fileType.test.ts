import { describe, expect, it } from 'vitest'
import { isVideo } from '~/utils'

describe('utils/url', () => {
  it('urlParamStr', () => {
    expect(isVideo('intro-video.mp4')).toBeTruthy()
    expect(isVideo('intro-video.png')).toBeFalsy()
  })
})
