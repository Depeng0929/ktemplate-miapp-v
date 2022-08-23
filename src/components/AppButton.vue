<script setup lang='ts'>
import { debounce, toArray } from '@depeng9527/tools'
import type { ButtonStatus } from '~/composables/button'
import vars from '~/styles/vars.module.scss'

interface ButtonProps {
  status?: ButtonStatus
  throttleTime?: number
  block?: boolean
  className?: string | string[]
  color?: string
  openType?: 'contact' | 'share' | 'getPhoneNumber' | 'getUserInfo' | 'launchApp' | 'openSetting' | 'feedback' | 'chooseAvatar' | 'share'
}

const {
  status = {
    loading: false,
    disabled: false,
  },
  throttleTime = 0,
  block = true,
  className = '',
  color = vars.theme,
  openType,
} = defineProps<ButtonProps>()
const emit = defineEmits({
  click: null,
})

const buttonStyles = reactive([
  block ? 'block' : 'inline-block',
  ...toArray(className),
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
      :openType="openType"
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
  background-color: v-bind(color);
  border: 0 none;
  font-size: 14px;
  @apply rounded text-white cursor-pointer px-4 py-1 ;
  &::after {
    border: none;
  }
  &[disabled], &:disabled {
    @apply cursor-default opacity-70;
    border-color: v-bind(color)!important;
    background-color: v-bind(color)!important;
    color: #fff!important;
  }
}
</style>
