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
  <view class="w-9/10 mx-auto">
    <button
      class="app-button"
      hover-class="hover"
      :loading="status.loading"
      :disabled="status.disabled"
      @click="onClick"
    >
      <slot />
    </button>
  </view>
</template>

<style lang="scss">
.app-button {
  background-color: var(--theme);
  border-color: var(--theme);
  @apply rounded block  text-white cursor-pointer;

  &.hover {
    @apply opacity-70;
  }
  &[disabled] {
    @apply cursor-default opacity-50;
    border-color: var(--theme)!important;
    background-color: var(--theme)!important;
  }
}

</style>
