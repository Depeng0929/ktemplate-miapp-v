<script setup lang='ts'>
import UQRCode from 'uqrcodejs'

const props = defineProps({
  id: {
    type: String,
    default: 'qrcode',
  },
  code: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 0,
  },
})
const sizePx = $computed(() => {
  return uni.upx2px(props.size)
})

watch(() => props.code, (val) => {
  if (val)
    nextTick(() => change(val))
}, { immediate: true })

function change(val: string) {
  const ctx = uni.createCanvasContext(props.id)
  const qr = new UQRCode()
  qr.data = val
  qr.size = sizePx
  qr.make()
  qr.canvasContext = ctx
  qr.drawCanvas()
}
</script>

<template>
  <view class="mx-auto" :style="{ width: `${sizePx}px`, height: `${sizePx}px` }">
    <canvas id="qrcode" canvas-id="qrcode" :style="{ width: `${sizePx}px`, height: `${sizePx}px` }" />
  </view>
</template>
