<script setup lang='ts'>
import { pagAllowAccess } from '~/logic/permission'
const route = useRoute()

const AllowAccess = $computed(() => {
  return pagAllowAccess(route.path!)
})

</script>

<template>
  <template v-if="AllowAccess">
    <slot />
  </template>
</template>
