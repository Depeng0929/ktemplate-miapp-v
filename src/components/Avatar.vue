<script setup lang="ts">
const {
  size = 80,
  src = '',
} = defineProps<{
  size?: number
  src?: `/${string}` | string
}>()

const themeColor = '#777777'

const isDefault = $computed(() => {
  return !src
})
const upxSize = $computed(() => {
  return uni.upx2px(size)
})
const warpStyles = $computed(() => {
  const n = `${upxSize}px`
  return {
    with: n,
    height: n,
  }
})
</script>

<template>
  <view
    :style="warpStyles"
    class="rounded-[50%] inline-block overflow-hidden border border-2 "
    :class="[isDefault ? '!border-[#777777]' : '!border-transparent']"
  >
    <uni-icons v-if="isDefault" type="person-filled" :size="upxSize" :color="themeColor" />
    <AppImage v-else :src="src" :width="size" :height="size" />
  </view>
</template>
