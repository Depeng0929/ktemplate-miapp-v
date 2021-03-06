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
