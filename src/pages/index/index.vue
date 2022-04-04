<template>
  <view>
    <button type="primary" @click="onClick">
      页面主操作 Loading
    </button>
  </view>
</template>

<script setup lang="ts">
const title = ref('Hello')

function onClick() {
  title.value = 'kkk'
}
</script>
