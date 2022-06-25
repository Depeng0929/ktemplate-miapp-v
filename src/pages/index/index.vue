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
  <AppPage>
    <AppButton :status="submit.status" @click="submit.onClick">
      点我
    </AppButton>
    <view class="mt-4 w-full border bg-theme">
      2332
    </view>
    <uni-badge text="1" type="primary" />

    <view v-for="i in 100" :key="i">
      {{ i }}
    </view>
  </AppPage>
</template>
