<script setup lang='ts'>
import { pickerStrategies } from '~/components/AppPicker/Picker'
import type { PickerMode, PickerProps } from '~/components/AppPicker/props'

interface AppPickerProps extends PickerProps {
  mode?: PickerMode
  modelValue?: string | number
  list?: Array<{ key: string | number; name: unknown }>
  end?: string | number
  className?: string | Array<string>
  autoChecked?: true
}

const props = defineProps<AppPickerProps>()
const emit = defineEmits(['change', 'update:modelValue'])

const picker = createPicker(props.mode!)

function createPicker(mode: PickerMode) {
  if (!pickerStrategies[mode]) {
    console.error('mode暂不支持此属性')
    return null
  }
  return reactive(pickerStrategies[mode](props, emit))
}
</script>

<template>
  <view class="w-full" :class="props.className">
    <picker
      v-if="picker"
      :value="picker.index"
      :mode="picker.mode"
      :range="list"
      range-key="name"
      start="1950-01-01"
      :end="end"
      @change="picker?.onChange"
    >
      <slot :value="picker.text" />
    </picker>
  </view>
</template>
