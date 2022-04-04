export const plathEnum = {
  weixin: 'mp',
  alipay: 'alipay',
  h5: 'h5',
}

function platform() {
  let result

  // #ifdef  MP-WEIXIN
  result = plathEnum.weixin
  // #endif

  // #ifdef  MP-ALIPAY
  result = plathEnum.alipay
  // #endif

  // #ifdef  H5
  result = plathEnum.h5
  // #endif

  return result
}

export const isWeixin = platform() === plathEnum.weixin
export const isAlipay = platform() === plathEnum.alipay
export const isH5 = platform() === plathEnum.h5

export const isDev = process.env.NODE_ENV === 'development'

// global env config
export const getConfig = () => {
  const { VUE_APP_API, VUE_APP_IMG, VUE_APP_STATIC_IMG, VUE_APP_API_CENTER } = process.env
  return {
    api: VUE_APP_API,
    api_center: VUE_APP_API_CENTER,
    staticURL: VUE_APP_STATIC_IMG,
    imageURL: VUE_APP_IMG,
  }
}
