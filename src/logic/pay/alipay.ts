import to from 'await-to-js'
import { isEmpty, isNil, sleep } from '@depeng9527/tools'

export async function useAlipay(orderData: Object) {
  if (isNil(orderData) || isEmpty(orderData))
    return false

  showLoading('正在调用微信支付')

  const formData = {
    ...orderData,
  }
  const [err, res] = await to(sleep(1000, () => {
    return formData
  }))
  if (err) {
    hideLoading()
    toast('正在调用支付', 'error')
    return Promise.reject(err)
  }

  const [err2, res2] = await to(uni.requestPayment({
    provider: 'alipay',
    ...res as any,
  }) as any)

  if (err2) {
    hideLoading()
    toast('调用微信支付失败', 'error')
    return Promise.reject(err2)
  }

  return res2
}
