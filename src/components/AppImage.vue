<script setup lang="ts">
import { whenever } from '~/composables/tools';
import { isExternal, parseRect } from '~/utils';

const {
  showLoading = false,
  src = '',
  width = '100%',
  height = 225,
  className = '',
  isPreview = false,
} = defineProps<{
  showLoading?: boolean
  /**
   * 你无需写/src/static/xxx.img，只需要写xxx.img即可
   */
  src?: `/${string}` | string
  width?: string | number
  height?: string | number
  /**
   * 是否http资源
   */
  className?: string
  isPreview?: boolean
}>()
let loading = $ref(false)
let error = $shallowRef(false)

whenever(() => src, () => {
  loading = true
})

const imageURL = computed(() => {
  return src
    ? isExternal(src)
      ? src
      : `/static${src}`
    : ''
})
const showPlaceholder = computed(() => {
  return !imageURL || loading || error
})

const imageStyle = computed(() => {
  return {
    width: `${parseRect(width)}`,
    height: `${parseRect(height)}`,
  }
})

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
