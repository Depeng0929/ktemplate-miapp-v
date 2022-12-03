<script setup lang='ts'>
interface Props {
  list: any[]
  show?: boolean
  loading?: boolean
  isFinish?: boolean
  isEmpty?: boolean
}

const {
  list,
  loading = false,
  isFinish = false,
  isEmpty = false,
  show = false,
} = defineProps<Props>()
</script>

<template>
  <view>
    <template v-for="item in list" :key="item._id || item.id">
      <slot :item="item" />
    </template>

    <template v-if="show">
      <slot v-if="loading" name="pending">
        <uni-load-more status="loading" />
      </slot>
      <slot v-if="isFinish" name="finish">
        <uni-load-more status="noMore" />
      </slot>
      <slot v-if="isEmpty" name="empty">
        <view>
          当前列表没有数据
        </view>
      </slot>
    </template>
  </view>
</template>
