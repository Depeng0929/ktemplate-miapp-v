<script setup lang='ts'>
interface Props<T = any> {
  list: T[]
  show?: boolean
  loading?: boolean
  isFinish?: boolean
  isEmpty?: boolean
}

// eslint-disable-next-line vue/no-setup-props-destructure
const {
  list,
  loading = false,
  isFinish = false,
  isEmpty = false,
} = defineProps<Props>()

</script>

<template>
  <div>
    <template v-for="item in list" :key="item.id">
      <slot :item="item" />
    </template>
    <slot v-if="loading" name="pending">
      <Loading />
    </slot>
    <slot v-if="isEmpty" name="empty" />
    <slot v-if="isFinish" name="finish" />
  </div>
</template>
