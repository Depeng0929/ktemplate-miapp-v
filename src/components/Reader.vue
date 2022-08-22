<script setup lang='ts'>
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html.vue'
import { isAlipay } from '~/utils'

const props = withDefaults(defineProps<{
  html?: string
}>(), {
  html: '',
})

const ROOT_REM = 14

const processedHtml = $computed(() => {
  return process(props.html)
})

function process(str: string) {
  return transformCssRem(str)

  function transformCssRem(str: string) {
    if (!isAlipay)
      return str

    return str.replace(/(\d+(\.\d{1,2})?)rem/mg, (matchs, m1) => {
      return `${m1 * ROOT_REM}px`
    })
  }
}
</script>

<template>
  <view class="app-reader">
    <mp-html :content="processedHtml" />
  </view>
</template>

<style lang="scss">
.app-reader {
  font-weight: 300;
  word-break: break-all;
  rich-text {
    text-indent: 2em;
  }
}
</style>
