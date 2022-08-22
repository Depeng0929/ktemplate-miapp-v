<script setup lang="ts">
import { toArray } from '@depeng9527/tools';
import { injectionCheckGroup } from '~/components/AppCheckbox/inject';
import vars from '~/styles/vars.module.scss'

const {
  name,
  modelValue = '',
  size = 'default',
} = defineProps<{
  /**
   * v-model bind value
   */
  modelValue?: boolean | Array<any>
  /**
   *  checked name
   */
  name: string | number
  size?: 'mini' | 'default'
}>()
const emit = defineEmits(['update:modelValue', 'change'])
let currentVal = $ref(modelValue)

const checkGroup = inject(injectionCheckGroup, null)
const isGroup = $computed(() => {
  return checkGroup
})
const checkboxSize = $computed(() => {
  return isGroup ? checkGroup?.size : size
})
const checked = $computed(() => {
  return isGroup ? checkGroup?.value.includes(name) : currentVal
})

const checkBoxStyles = $computed(() => {
  if (checkboxSize === 'mini') {
    return {
      transform: 'scale(0.7)',
    }
  }

  return {}
})

watch(() => modelValue, (val) => {
  currentVal = val
  emit('update:modelValue', currentVal)
  emit('change', currentVal)
})

function onCheckBoxChange(e: MinappEvent) {
  const arr = e.detail.value
  const isChecked = toArray(arr).length > 0

  currentVal = isChecked
  emit('update:modelValue', currentVal)
  emit('change', currentVal)
}
</script>

<template>
  <checkbox
    v-if="isGroup"
    :value="name"
    :style="checkBoxStyles"
    :checked="checked"
    :color="vars.theme"
  />

  <checkbox-group v-else @change="onCheckBoxChange">
    <checkbox
      :value="name"
      :checked="checked"
      :style="checkBoxStyles"
      :color="vars.theme"
    />{{ name }}
  </checkbox-group>
</template>
