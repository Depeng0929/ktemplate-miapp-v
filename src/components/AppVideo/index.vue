<script setup lang="ts">
const {
  src,
  autoplay = false,
  style = {},
} = defineProps<{
  src: string
  autoplay?: boolean
  style?: Record<string, number | string>
}>()

const videoStyle = $computed(() => {
  return {
    ...style,
  }
})

function handleVideoError() {
  toast('视频播放失败', 'error')
}
</script>

<template>
  <video
    class="w-full"
    :style="videoStyle"
    :src="src"
    controls
    :autoplay="autoplay"
    @error="handleVideoError"
  />
</template>
