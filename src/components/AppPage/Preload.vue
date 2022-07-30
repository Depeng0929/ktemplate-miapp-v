<script setup lang='ts'>
import { error, loading } from '~/logic/permission'

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
