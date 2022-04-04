<template>
  <view>
    <button type="primary">
      页面主操作 Loading
    </button>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

onLoad((options) => {
  console.log(options)
})
</script>
