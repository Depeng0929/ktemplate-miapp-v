<script setup lang="ts">
import { isNumberLike } from '@depeng9527/tools';

const {
  showLoading = false,
  src = '',
  width = 300,
  height = 225,
  extra = false,
} = defineProps<{
  showLoading?: boolean
  /**
   * 你无需写/src/static/xxx.img，只需要写xxx.img即可
   */
  src?: string
  width?: string | number
  height?: string | number
  /**
   * 是否http资源
   */
  extra?: boolean
}>()

const imageURL = computed(() => {
  return extra ? src : `/static/${src}`
})

const imageStyle = computed(() => {
  return {
    width: `${parseRect(width)}`,
    height: `${parseRect(height)}`,
  }
})

function parseRect(aStr: number | string): string {
  return isNumberLike(aStr) ? `${uni.upx2px(+aStr)}px` : `'${aStr}'`
}
</script>

<template>
  <image
    :style="imageStyle"
    :src="imageURL"
    :loading="showLoading"
  />
</template>