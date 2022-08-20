<script setup lang="ts">
import { injectionCheckGroup } from '~/components/AppCheckbox/inject';

const {
  modelValue = [],
  size = 'default',
} = defineProps<{
  modelValue?: Array<number | string>
  size?: 'mini' | 'default'
}>()
const emit = defineEmits(['update:modelValue', 'change'])

let current = $ref(modelValue)

provide(injectionCheckGroup, reactive({
  value: $$(current),
  size,
}))

watch(() => modelValue, (val) => {
  current = val
  emit('update:modelValue', val)
  emit('change', val)
})

function onChange(e: MinappEvent) {
  const arr = e.detail.value
  current = arr

  emit('update:modelValue', arr)
  emit('change', arr)
}

</script>

<template>
  <checkbox-group @change="onChange">
    <slot />
  </checkbox-group>
</template>
