<script setup lang="ts">
const {
  src = '',
  size = 40,
} = defineProps<{
  size?: number
  src?: string
}>()

const warpStyle = $computed(() => {
  return {
    width: `${size}px`,
    height: `${size}px`,
  }
})
</script>

<template>
  <view :style="warpStyle">
    <AppImage :src="src" :width="size" :height="size" />
  </view>
</template>
