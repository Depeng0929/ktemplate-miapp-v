/**
 * 组合url参数为字符串
 * @param json {object} 参数对象
 * @returns {string} 返回字符串
 */
export function urlParamStr(json: Record<string, string>) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return ''
      return `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`
    }),
  ).join('&')
}

export function cleanArray(actual: string[]) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i])
      newArray.push(actual[i])
  }
  return newArray
}

export const alert = function(msg: string, callback: any = null) {
  uni.showModal({
    title: '提示',
    content: msg,
    showCancel: false,
    success(res) {
      if (res.confirm)
        if (callback) callback()
    },
  })
}

export const confirm = function(msg: string, calConfirm: any = null, calCancel: any = null) {
  uni.showModal({
    title: '提示',
    content: msg,
    success(res) {
      if (res.confirm) {
        if (calConfirm) calConfirm()
      }
      else if (res.cancel) {
        if (calCancel) calCancel()
      }
    },
  })
}

export const toast = (
  msg: string,
  icon: 'success' | 'loading' | 'error' | 'none',
  position: 'top' | 'center' | 'bottom',
) => {
  uni.showToast({
    title: msg,
    icon: icon || 'none',
    duration: 500,
    mask: true,
    position: position || 'center',
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
