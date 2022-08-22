enum PLATHFORM {
  WX = 'weixin',
  ALIPAY = 'alipay',
  H5 = 'h5',
}

function platform(): PLATHFORM {
  let result

  // #ifdef  MP-WEIXIN
  result = PLATHFORM.WX
  // #endif

  // #ifdef  MP-ALIPAY
  result = PLATHFORM.ALIPAY
  // #endif

  // #ifdef  H5
  result = PLATHFORM.H5
  // #endif

  return result
}

// host environment
export const isWeixin = platform() === PLATHFORM.WX
export const isAlipay = platform() === PLATHFORM.ALIPAY
export const isH5 = platform() === PLATHFORM.H5

// build environment
export const isDev = import.meta.env.DEV
export const isProd = import.meta.env.PROD

// 是否是刘海屏幕
export function isNotchScreen() {
  return uni.getSystemInfoSync().safeAreaInsets?.bottom
}
