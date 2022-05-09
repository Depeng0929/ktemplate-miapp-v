<script setup lang="ts">
import { useButton } from '~/composables/button'

function onClick() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 2000)
  })
}
const submit = reactive(useButton(onClick))

</script>

<template>
  <view class="h-full">
    <button type="primary" :loading="submit.status.loading" :disabled="submit.status.disabled" @click="submit.onClick">
      页面主操作 Loading
    </button>
    <view class="mt-4 w-full border bg-theme">
      2332
    </view>
    <uni-badge text="1" type="primary" />
  </view>
</template>
