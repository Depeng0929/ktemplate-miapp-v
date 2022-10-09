import { hexToRgba, isValidHex } from 'hex-and-rgba/esm/index.mjs';
import { isNumberLike, sleep } from '@depeng9527/tools';

export function alert(msg: string): Promise<void> {
  return new Promise((resolve) => {
    uni.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      success(res) {
        if (res.confirm)
          resolve()
      },
    })
  })
}

export function confirm(msg: string): Promise<void> {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content: msg,
      success(res) {
        if (res.confirm)
          resolve()
        else
          reject(new Error('cancel'))
      },
    })
  })
}

export const toast = (
  msg: string,
  icon?: 'success' | 'loading' | 'error' | 'none',
  position?: 'top' | 'center' | 'bottom',
  duration?: number,
): Promise<void> => {
  return new Promise((resolve) => {
    const s = duration || 1500
    uni.showToast({
      title: msg,
      icon: icon || 'none',
      duration: s,
      mask: true,
      position: position || 'center',
    })
    sleep(s, () => {
      resolve()
    })
  })
}

export const showLoading = (msg = '') => {
  uni.showLoading({
    title: msg,
    mask: true,
  })
}

export const hideLoading = () => {
  uni.hideLoading()
}

export function hexToRgb(hex: string, opacity = 1) {
  if (!isValidHex(hex))
    return false

  const arr = hexToRgba(hex) as [number, number, number, number];
  return `rgba(${arr[0]},${arr[1]},${arr[2]},${opacity})`
}

export function parseRect(aStr: number | string): string {
  return isNumberLike(aStr) ? `${uni.upx2px(+aStr)}px` : `${aStr}`
}
