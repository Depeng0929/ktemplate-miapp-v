export function isExternal(url: string) {
  return /^(https?:|mailto:|tel:)/.test(url)
}

export function isEmail(email: string) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

export function isMobile(mobile: string) {
  return /^1[3-9]\d{9}$/.test(mobile)
}

export function isIdCard(val: string) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(val)
}

export function isTelphone(val: string) {
  return /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(val);
}
