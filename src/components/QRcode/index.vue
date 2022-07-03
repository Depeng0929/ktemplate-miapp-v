<script setup lang='ts'>
const props = defineProps<{
  code: string
  size?: number
}>()

const config = reactive({
  code: props.code,
  size: props.size ?? 460,
})
</script>

<template>
  <view class="mx-auto" :style="{width: `${config.size}rpx`, height: `${config.size}rpx`}">
    <w-qrcode :options="config" />
  </view>
</template>
