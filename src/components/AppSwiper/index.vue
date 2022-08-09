<script setup lang="ts">
import vars from '~/styles/vars.module.scss'
import { hexToRgb, parseRect } from '~/utils';

const {
  list = [],
  height = '100%',
} = defineProps<{
  list: Array<string>
  height: number | string
}>()
let current = $ref(0)

const dotsStyles = {
  backgroundColor: hexToRgb(vars.theme, 0.3),
  border: `1px ${hexToRgb(vars.theme, 0.3)}, solid`,
  color: '#fff',
  selectedBackgroundColor: vars.theme,
  selectedBorder: vars.theme,
}
const swiperStyle = {
  height: parseRect(height),
}

function clickItem(index: number) {
  current = index
}

function change(e: MinappEvent) {
  current = e.detail.current
}

</script>

<template>
  <uni-swiper-dot
    :info="list"
    :current="current"
    mode="default"
    :dots-styles="dotsStyles"
    field="content"
    @clickItem="clickItem"
  >
    <swiper :current="current" :style="swiperStyle" @change="change">
      <swiper-item v-for="(item, index) in list" :key="index">
        <AppImage :src="item" height="100%" :is-preview="true" />
      </swiper-item>
    </swiper>
  </uni-swiper-dot>
</template>
