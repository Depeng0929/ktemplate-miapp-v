<script setup lang='ts'>
import { pageAllowAccess } from '~/logic/guard/permission-guard'
const route = useRoute()

const allowAccess = $computed(() => {
  return pageAllowAccess(route.path!)
})
</script>

<template>
  <template v-if="allowAccess">
    <slot />
  </template>
</template>
