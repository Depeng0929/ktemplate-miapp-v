<script setup lang='ts'>
import { debounce } from '@depeng9527/tools'
import type { ButtonStatus } from '~/composables/button'

interface ButtonProps {
  status?: ButtonStatus
  throttleTime?: number
  block?: boolean
}

const {
  status = {
    loading: false,
    disabled: false,
  },
  throttleTime = 0,
  block = true,
} = defineProps<ButtonProps>()
const emit = defineEmits({
  click: null,
})

const buttonStyles = reactive([
  block ? 'block' : 'inline-block',
])

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
      :class="buttonStyles"
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
  border: 0 none;
  font-size: 14px;
  @apply rounded text-white cursor-pointer px-4 py-1 ;
  &::after {
    border: none;
  }
  &[disabled], &:disabled {
    @apply cursor-default opacity-70;
    border-color: var(--theme)!important;
    background-color: var(--theme)!important;
    color: #fff!important;
  }
}

</style>
