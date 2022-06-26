import { findValueByKey } from '@depeng9527/tools'
import type { PickerProps } from '~/components/AppPicker/props'

const find = findValueByKey('key', 'name')

export function datePicker(
  props: PickerProps,
  emit: (...args: any) => void,
) {
  let current = $ref(props.modelValue)
  const text = $computed(() => current)

  watch(() => props.modelValue, (val) => {
    current = val!
  })

  function onChange(e: MinappEvent) {
    const value = e.detail.value
    if (current === value)
      return

    current = value
    emit('update:modelValue', value)
    emit('change', value)
  }

  return $$({
    mode: 'date',
    current,
    text,
    onChange,
  })
}

export function selectorPicker(
  props: PickerProps,
  emit: (...args: any) => void,
) {
  let current = $ref(props.modelValue || '')
  const text = $computed(() => {
    if (!props.list?.length || props.modelValue === '') return ''
    return find(current, props.list)
  })

  watch(() => props.modelValue, (val) => {
    current = val!
  })

  function onChange(e: MinappEvent) {
    const index = e.detail.value
    const item = props.list![index]
    if (!item) return

    const key = item.key
    if (key === current)
      return

    current = key
    emit('update:modelValue', key)
    emit('change', item)
  }

  return $$({
    mode: 'selector',
    current,
    text,
    onChange,
  })
}

export const pickerStrategies = {
  selector: selectorPicker,
  date: datePicker,
}
