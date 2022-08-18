<script setup lang="ts">
import { range, sleep } from '@depeng9527/tools';
import { usePageShow } from '~/logic/guard/page-loading';
import { useList } from '~/components/List/useList'

usePageShow(() => {
  debug('ok')
})

const { list, status, removeItem, addItem } = useList<{ name: number; id: number }>({
  fetch,
})

let seed = 0
async function fetch() {
  await sleep(500)
  return {
    code: 200,
    msg: 'ok',
    rows: range(2).map(i => ({ name: i, id: seed++ })),
    total: 100,
  }
}

let _id = 1000
function onClick() {
  addItem({
    name: 12,
    id: _id++,
  })
}

</script>

<template>
  <AppPage>
    <button @click="onClick">
      点我
    </button>
    <List :list="list" v-bind="status">
      <template #default="{item}">
        <view class="w-full h-10 bg-red-500 mt-2 text-center" :animation="item.animationData" @click="removeItem(item)">
          {{ item.name }}
        </view>
      </template>
    </List>
  </AppPage>
</template>
