<script setup lang="ts">
import type { CustomEvent } from '@uni-helper/uni-app-types'
import vars from '~/styles/vars.module.scss'
import { hexToRgb, isVideo, parseRect } from '~/utils';

const {
  list = [],
  height = '100%',
} = defineProps<{
  list: Array<string>
  height: number | string
}>()
let current = $ref(0)

const dotsStyles = $computed<any>(() => {
  return {
    backgroundColor: hexToRgb(vars.theme, 0.3),
    border: `1px ${hexToRgb(vars.theme, 0.3)}, solid`,
    color: '#fff',
    selectedBackgroundColor: vars.theme,
    selectedBorder: vars.theme,
  }
})
const swiperStyle = $computed(() => {
  return {
    height: parseRect(height),
  }
})

function onClickDotItem(index: number) {
  current = index
}

function onSwipe(e: CustomEvent) {
  current = e.detail?.current
}
</script>

<template>
  <uni-swiper-dot
    :info="list"
    :current="current"
    mode="default"
    :dots-styles="dotsStyles"
    field="content"
    @click-item="onClickDotItem"
  >
    <swiper :current="current" :style="swiperStyle" @change="onSwipe">
      <swiper-item v-for="(item, index) in list" :key="index">
        <AppVideo v-if="isVideo(item)" :style="{ height: '100%' }" :src="item" />
        <AppImage v-else :src="item" height="100%" :is-preview="true" />
      </swiper-item>
    </swiper>
  </uni-swiper-dot>
</template>
