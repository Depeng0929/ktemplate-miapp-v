<script setup lang="ts">
import { isNumberLike } from '@depeng9527/tools';
import { whenever } from '~/composables/tools';

const {
  showLoading = false,
  src = '',
  width = 300,
  height = 225,
  extra = false,
  className = '',
  isPreview = false,
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
  className?: string
  isPreview?: false
}>()
let loading = $ref(false)
let error = $shallowRef(false)

whenever(() => src, () => {
  loading = true
})

const imageURL = computed(() => {
  return extra ? src : `/static/${src}`
})
const showPlaceholder = computed(() => {
  return loading || error
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

function onLoading() {
  loading = false
}

function onError() {
  loading = false
  error = true
}

function onPreview() {
  if (!isPreview)
    return false

  uni.previewImage({
    urls: [src],
  })
}
</script>

<template>
  <view
    v-if="showPlaceholder"
    :style="imageStyle"
    class="bg-[#F3F4F6] flex-center justify-center"
    :class="className"
  >
    <uni-load-more status="loading" :show-text="false" />
  </view>
  <image
    v-else
    :style="imageStyle"
    :src="imageURL"
    :loading="showLoading"
    @load="onLoading"
    @error="onError"
    @click="onPreview"
  />
</template>
