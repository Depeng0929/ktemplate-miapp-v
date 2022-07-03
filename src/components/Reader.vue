<script setup lang='ts'>
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html.vue'
const props = withDefaults(defineProps<{
  html?: string
}>(), {
  html: '',
})

</script>

<template>
  <view class="app-reader">
    <mp-html :content="props.html" />
  </view>
</template>

<style lang="scss">
.app-reader {
  font-weight: 300;
  rich-text {
    text-indent: 2em;
  }
}
</style>
