<script setup lang='ts'>
const loading = $ref(false)
const error = $ref(null)

</script>

<template>
  <view v-if="loading">
    Preload loading...
  </view>
  <view v-if="error">
    {{ JSON.stringify(error) }}
  </view>
  <slot v-if="!loading && !error" />
</template>
