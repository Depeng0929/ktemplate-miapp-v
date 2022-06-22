<script setup lang='ts'>
import { debounce } from '@depeng9527/tools'
import type { ButtonStatus } from '~/composables/button'

interface ButtonProps {
  status?: ButtonStatus
  throttleTime?: number
}

const {
  status = {
    loading: false,
    disabled: false,
  },
  throttleTime = 0,
} = defineProps<ButtonProps>()

const emit = defineEmits({
  click: null,
})

const debounceEmitClick = debounce(throttleTime, (e) => {
  emit('click', e)
})
function onClick(e: Event) {
  debounceEmitClick(e)
}
</script>

<template>
  <view class="w-9__10 mx-auto">
    <button
      type="primary"
      :loading="status.loading"
      :disabled="status.disabled"
      @click="onClick"
    >
      <slot />
    </button>
  </view>
</template>
