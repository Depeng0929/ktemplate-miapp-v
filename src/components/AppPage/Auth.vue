<script setup lang='ts'>
const props = defineProps<{
  modelValue?: boolean
}>()

</script>

<template>
  <template v-if="true">
    <slot />
  </template>
</template>
