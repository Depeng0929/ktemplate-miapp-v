<script setup lang='ts'>
import { pageAllowAccess } from '~/logic/permission'
const route = useRoute()

const AllowAccess = $computed(() => {
  return pageAllowAccess(route.path!)
})

</script>

<template>
  <template v-if="AllowAccess">
    <slot />
  </template>
</template>
