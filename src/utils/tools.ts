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
