<script setup lang="ts">
import { useButton } from '~/composables/button';

function onClick() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 2000)
  })
}
const submit = reactive(useButton(onClick))

const list = [
  { key: 10, name: 'woshi1' },
  { key: 11, name: 'woshi2' },
  { key: 12, name: 'woshi3' },
]
const current = ref('')

</script>

<template>
  <AppPage>
    <AppPicker
      v-model="current"
      mode="date"
      :list="list"
    >
      <template #default="slotProps">
        <AppButton :status="submit.status" @click="submit.onClick">
          {{ slotProps.value }}
        </AppButton>
      </template>
    </AppPicker>

    <view class="mt-4 w-full border bg-theme">
      {{ current }}
    </view>
    <uni-badge text="1" type="primary" />

    <AppImage src="logo1.png" width="200" height="200" />

    <List :list="list">
      <template #default="{item}: {item: {name: string}}">
        <view>
          {{ item.name }}
        </view>
      </template>
    </List>
  </AppPage>
</template>
