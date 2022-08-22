export function useIntersectionObserver(
  selector: string,
  callback: (isShow?: boolean, rect?: DOMRect) => void,
) {
  const _this = getCurrentInstance();
  const observer = uni.createIntersectionObserver(_this)

  const isShow = ref(false)

  onReady(() => {
    observer.relativeTo('.app-page').observe(selector, (res) => {
      if (res.intersectionRatio > 0 && !isShow.value)
        isShow.value = true;
      else if (!(res.intersectionRatio > 0) && isShow.value)
        isShow.value = false;

      callback && callback(isShow.value, res.boundingClientRect as DOMRect)
    })
  })

  onBeforeUnmount(() => {
    observer.disconnect();
  })
}
